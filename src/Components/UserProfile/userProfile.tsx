import {
    IconButton,
    Label,
    TextField
} from '@fluentui/react';
import {
    containerClassName,
    contentClassName,
    goBackIconStyles,
    homePageTextClassName,
    labelClassName,
    textFieldStyles
} from './userProfile.styles';
import { useContext, useEffect, useState } from 'react';
import { IUserProfileProps } from './userProfile.types';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';
import {
    NavigateFunction,
    useNavigate
} from 'react-router-dom';
import { HOME_PATH } from '../../Library/constants';
import { DefaultButton } from 'office-ui-fabric-react';
import { CustomDialog } from '../CustomDialog/customDialog';
import { ServiceContext, ServiceContextInstance } from '../../Core/serviceContext';
import { IUserProfileUpdate } from '../../Models/UserProfile/IUserProfileUpdate';

export const UserProfile = (props: IUserProfileProps): JSX.Element => {
    const defaultUserProfile: IUserProfileRead = {
        uid: '',
        userUid: '',
        fullName: '',
        dateOfBirth: new Date(),
        country: '',
        city: ''
    };
    const [fullName, setFullName] = useState<string>(defaultUserProfile.fullName);
    const [city, setCity] = useState<string>(defaultUserProfile.city);
    const [country, setCountry] = useState<string>(defaultUserProfile.country);
    const [isFormDisabled, setIsFormDisabled] = useState<boolean>(true);
    const [isEditButtonClicked, setIsEditButtonClicked] = useState<boolean>(false);
    const [isPushSettingsClicked, setIsPushSettingsClicked] = useState<boolean>(false);
    const services = useContext<ServiceContext>(ServiceContextInstance);

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (props.userProfile !== undefined) {
            setFullName(props.userProfile!.fullName);
            setCity(props.userProfile.city);
            setCountry(props.userProfile.country);
        }
    }, []);

    const onFullNameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newFullName?: string | undefined): void => {
        setFullName(newFullName!);
    };

    const onCityChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newCity?: string | undefined): void => {
        setCity(newCity!);
    };

    const onCountryChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newCountry?: string | undefined): void => {
        setCountry(newCountry!);
    };

    const handleButtonClick = (): void => {
        setIsFormDisabled(false);
        setIsEditButtonClicked(true);
    };

    const handlePushSettingsClick = (): void => {
        setTimeout(() => {
            setIsFormDisabled(true);
            setIsEditButtonClicked(false);
            setIsPushSettingsClicked(true);
        }, 500);
    };
    const handleCloseDialog = (accepted?: boolean): void => {
        if (accepted === true) {
            setTimeout(() => {
                setIsPushSettingsClicked(false);
                const newUserProfile: IUserProfileUpdate = {
                    uid: props.userProfile?.uid,
                    fullName,
                    city,
                    country,
                };
                services.UserProfilesService.Update(newUserProfile);
            }, 500);
        }
    };

    return <div className={containerClassName}>
        <div>
            <div style={{ cursor: 'pointer' }} onClick={() => navigate(HOME_PATH)}>
                <IconButton iconProps={{ iconName: "Back" }}
                    styles={goBackIconStyles} />
                <p className={homePageTextClassName}>Home Page</p>
            </div>
        </div>
        <div className={contentClassName}>
            <Label className={labelClassName}>Full Name</Label>
            <TextField value={fullName}
                disabled={isFormDisabled}
                styles={textFieldStyles}
                underlined={true}
                onChange={onFullNameChange}
            />
            <Label className={labelClassName}>City</Label>
            <TextField value={city}
                disabled={isFormDisabled}
                styles={textFieldStyles}
                underlined={true}
                onChange={onCityChange} />
            <Label className={labelClassName}>Country</Label>
            <TextField value={country}
                disabled={isFormDisabled}
                styles={textFieldStyles}
                underlined={true}
                onChange={onCountryChange} />
            <DefaultButton text={props.userProfile === undefined ? 'Create' : 'Edit'}
                onClick={handleButtonClick} />
            {isEditButtonClicked && <DefaultButton text="Push Settings"
                onClick={handlePushSettingsClick} />}
            <div style={{ position: 'absolute' }}>
                <CustomDialog mainText="Are you sure of updates?"
                    isHidden={!isPushSettingsClicked}
                    handleCloseDialog={handleCloseDialog}
                    acceptedText="Yes"
                    cancelText='Cancel' />
            </div>
        </div>
    </div>
};