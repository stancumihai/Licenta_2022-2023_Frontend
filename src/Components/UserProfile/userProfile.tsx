import {
    IconButton,
    Label,
    TextField
} from '@fluentui/react';
import {
    acceptedButtonStyles,
    containerClassName,
    contentClassName,
    dialogStyles,
    editButtonStyles,
    goBackIconStyles,
    homePageTextClassName,
    labelClassName,
    profileSettingsTitleClassName,
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
import { IUserProfileCreate } from '../../Models/UserProfile/IUserProfileCreate';
import { IAuthentificationContext } from '../../Authentication/authenticationContext.types';
import AuthentificationContext from '../../Authentication/authenticationContext';

export const UserProfile = (props: IUserProfileProps): JSX.Element => {
    const defaultUserProfile: IUserProfileRead = {
        uid: '',
        userUid: '',
        fullName: '',
        dateOfBirth: new Date(),
        country: '',
        city: ''
    };
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
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
            return;
        }
        setIsFormDisabled(false);
    }, [isPushSettingsClicked]);

    const onFullNameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newFullName?: string | undefined): void => {
        setFullName(newFullName!);
    };

    const onCityChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newCity?: string | undefined): void => {
        setCity(newCity!);
    };

    const onCountryChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newCountry?: string | undefined): void => {
        setCountry(newCountry!);
    };

    const handleEditButtonClick = (): void => {
        if (props.userProfile === undefined) {
            const userProfile: IUserProfileCreate = {
                userUid: authenticationContext.User.uid!,
                fullName,
                city,
                country,
                dateOfBirth: new Date()
            };
            services.UserProfilesService.Add(userProfile);
            setTimeout(() => {
                setIsPushSettingsClicked(true);
            }, 500)
            return;
        }
        setIsFormDisabled((prev) => !prev);
        if (isFormDisabled === true) {
            setIsEditButtonClicked(true);
            return;
        }
        setIsEditButtonClicked(false);
    };

    const handlePushSettingsClick = (): void => {
        setTimeout(() => {
            setIsFormDisabled(true);
            setIsEditButtonClicked(false);
            setIsPushSettingsClicked(true);
        }, 500);
    };
    const handleCloseDialog = (accepted?: boolean): void => {
        if (accepted === false) {
            setTimeout(() => {
                setIsPushSettingsClicked(false);
            }, 500);
            return;
        }
        setTimeout(() => {
            setIsPushSettingsClicked(false);
            if (fullName === props.userProfile?.fullName && city === props.userProfile.city && country === props.userProfile.country) {
                return;
            }
            const newUserProfile: IUserProfileUpdate = {
                uid: props.userProfile?.uid,
                fullName,
                city,
                country
            };
            services.UserProfilesService.Update(newUserProfile);
        }, 500);
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
            <h1 className={profileSettingsTitleClassName}>Profile Settings</h1>
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
                styles={editButtonStyles}
                onClick={handleEditButtonClick} />
            {isEditButtonClicked && props.userProfile !== undefined && <DefaultButton text="Push Settings"
                onClick={handlePushSettingsClick} />}
            <div style={{ position: 'absolute' }}>
                <CustomDialog acceptedButtonStyles={acceptedButtonStyles}
                    dialogStyles={dialogStyles}
                    mainText={props.userProfile === undefined ?
                        "Are you sure?" :
                        "Are you sure of updates?"}
                    isHidden={!isPushSettingsClicked}
                    handleCloseDialog={handleCloseDialog}
                    acceptedText="Yes"
                    cancelText='Cancel' />
            </div>
        </div>
    </div>
};