import {
    IconButton,
    Label,
    TextField
} from '@fluentui/react';
import {
    acceptedButtonStyles,
    containerClassName,
    contentClassName,
    datePickerStyles,
    datePickerTextFieldStyles,
    dialogStyles,
    editButtonStyles,
    goBackIconStyles,
    homePageTextClassName,
    iconButtonStyles,
    labelClassName,
    profileSettingsTitleClassName,
    saveSettingsButtonStyles,
    roundedImageClassName,
    textFieldStyles
} from './userProfile.styles';
import {
    useContext,
    useEffect,
    useState
} from 'react';
import { IUserProfileProps } from './userProfile.types';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';
import {
    NavigateFunction,
    useNavigate
} from 'react-router-dom';
import {
    HOME_PATH,
    IMAGE_NOT_FOUND_ALTERNATE_TEXT,
    LOGO_IMAGE_LOCATION
} from '../../Library/constants';
import {
    DatePicker,
    DayOfWeek,
    DefaultButton
} from 'office-ui-fabric-react';
import { CustomDialog } from '../CustomDialog/customDialog';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { IUserProfileUpdate } from '../../Models/UserProfile/IUserProfileUpdate';
import { IUserProfileCreate } from '../../Models/UserProfile/IUserProfileCreate';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';

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
    const [dateOfBirth, setDateOfBirth] = useState<Date>(defaultUserProfile.dateOfBirth);
    const [isFormDisabled, setIsFormDisabled] = useState<boolean>(true);
    const [isEditButtonClicked, setIsEditButtonClicked] = useState<boolean>(false);
    const [isSaveSettingsClicked, setIsSaveSettingsClicked] = useState<boolean>(false);
    const services = useContext<ServiceContext>(ServiceContextInstance);

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        if (props.userProfile !== undefined) {
            setFullName(props.userProfile!.fullName);
            setCity(props.userProfile.city);
            setCountry(props.userProfile.country);
            setDateOfBirth(new Date(props.userProfile.dateOfBirth))
            return;
        }
        setIsFormDisabled(false);
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
                setIsSaveSettingsClicked(true);
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
            setIsSaveSettingsClicked(true);
        }, 500);
    };
    const handleCloseDialog = (accepted?: boolean): void => {
        debugger;
        if (accepted === false) {
            setTimeout(() => {
                setIsSaveSettingsClicked(false);
            }, 500);
            return;
        }
        setTimeout(() => {
            setIsSaveSettingsClicked(false);
            if (fullName === props.userProfile?.fullName &&
                city === props.userProfile.city &&
                country === props.userProfile.country) {
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

    const handlePeriodChange = (date: Date | undefined | null): void => {
        setDateOfBirth(date!);
    };

    return <div className={containerClassName}>
        <div style={{ cursor: 'pointer' }} onClick={() => navigate(HOME_PATH)}>
            <IconButton iconProps={{ iconName: "Back" }}
                styles={goBackIconStyles} />
            <p className={homePageTextClassName}>Home Page</p>
        </div>
        <div>
            <img className={roundedImageClassName}
                src={LOGO_IMAGE_LOCATION}
                alt={IMAGE_NOT_FOUND_ALTERNATE_TEXT} />
        </div>
        <div style={{
            background: 'white',
            width: '200px',
            height: '200px',
            position: 'absolute',
            borderRadius: '100%',
            right: '31%',
            top: '9.5%'
        }}>
            <IconButton styles={iconButtonStyles}
                iconProps={{ iconName: 'Contact' }} />
        </div>
        <div className={contentClassName}>
            <h1 className={profileSettingsTitleClassName}>Profile Settings</h1>
            <Label className={labelClassName}>Full Name</Label>
            <TextField value={fullName}
                readOnly={isFormDisabled}
                styles={textFieldStyles}
                underlined={true}
                onChange={onFullNameChange}
            />
            <Label className={labelClassName}>City</Label>
            <TextField value={city}
                readOnly={isFormDisabled}
                styles={textFieldStyles}
                underlined={true}
                onChange={onCityChange} />
            <Label className={labelClassName}>Country</Label>
            <TextField value={country}
                readOnly={isFormDisabled}
                styles={textFieldStyles}
                underlined={true}
                borderless
                onChange={onCountryChange} />
            <Label className={labelClassName}>Date Of Birth</Label>
            <div style={isFormDisabled ? { pointerEvents: 'none' } : {}}>
                <DatePicker
                    onSelectDate={handlePeriodChange}
                    styles={datePickerStyles}
                    textField={{ styles: datePickerTextFieldStyles }}
                    underlined
                    value={dateOfBirth}
                    firstDayOfWeek={DayOfWeek.Monday}
                    borderless={true}
                    minDate={new Date()}
                />
            </div>
            <div style={{ display: 'flex' }}>
                <DefaultButton text={props.userProfile === undefined ? 'Create' : 'Edit'}
                    styles={editButtonStyles}
                    onClick={handleEditButtonClick} />
                {isEditButtonClicked && props.userProfile !== undefined &&
                    <DefaultButton styles={saveSettingsButtonStyles}
                        text="Save"
                        onClick={handlePushSettingsClick} />}
            </div>
            <div style={{ position: 'absolute' }}>
                <CustomDialog acceptedButtonStyles={acceptedButtonStyles}
                    dialogStyles={dialogStyles}
                    mainText={props.userProfile === undefined ?
                        "Are you sure?" :
                        "Are you sure of updates?"}
                    isHidden={!isSaveSettingsClicked}
                    handleCloseDialog={handleCloseDialog}
                    acceptedText="Yes"
                    cancelText='No' />
            </div>
        </div>
    </div>
};