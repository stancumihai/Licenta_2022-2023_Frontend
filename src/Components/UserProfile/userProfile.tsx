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
    textFieldStyles,
    progressIndicatorStyles
} from './userProfile.styles';
import {
    useContext,
    useEffect,
    useState
} from 'react';
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
    DefaultButton,
    ProgressIndicator
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
import UserContext from '../../Contexts/User/userContext';
import { IUserContext } from '../../Contexts/User/userContext.types';

export const UserProfile = (): JSX.Element => {
    const defaultUserProfile: IUserProfileRead = {
        uid: '',
        userUid: '',
        fullName: '',
        dateOfBirth: new Date(),
        country: '',
        city: ''
    };
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const userContext: IUserContext = useContext(UserContext);
    const [fullName, setFullName] = useState<string>(defaultUserProfile.fullName);
    const [city, setCity] = useState<string>(defaultUserProfile.city);
    const [country, setCountry] = useState<string>(defaultUserProfile.country);
    const [dateOfBirth, setDateOfBirth] = useState<Date>(defaultUserProfile.dateOfBirth);
    const [isFormDisabled, setIsFormDisabled] = useState<boolean>(true);
    const [isEditButtonClicked, setIsEditButtonClicked] = useState<boolean>(false);
    const [isSaveSettingsClicked, setIsSaveSettingsClicked] = useState<boolean>(false);
    const [percentComplete, setPercentComplete] = useState(0);
    const [displayProgessIndicator, setDisplayProgessIndicator] = useState<boolean>(false);
    const [progressBarMessage, setProgressBarMessage] = useState<string>('')
    const navigate: NavigateFunction = useNavigate();

    const getLoggedUserProfile = (): IUserProfileRead | undefined => {
        return userContext.users.filter((u: IUserProfileRead) => u.userUid === authenticationContext.User.uid!)[0];
    };

    useEffect(() => {
        const userProfile: IUserProfileRead | undefined = getLoggedUserProfile();
        if (userProfile !== undefined) {
            setFullName(userProfile.fullName);
            setCity(userProfile.city);
            setCountry(userProfile.country);
            setDateOfBirth(new Date(userProfile.dateOfBirth))
            return;
        }
        setIsFormDisabled(false);
    }, []);

    useEffect(() => {
        if (displayProgessIndicator === true) {
            const intervalDelay = 50;
            const intervalIncrement = 0.01;
            setTimeout(() => {
                setPercentComplete((intervalIncrement + percentComplete) % 1);
                if ((intervalIncrement + percentComplete) > 0.51) {
                    setProgressBarMessage('You will be redirected to Home Page!');
                }
                if ((intervalIncrement + percentComplete) > 1) {
                    setProgressBarMessage('Profile Updated Succesfully!')
                    setDisplayProgessIndicator(false);
                    setTimeout(() => {
                        window.location.href = 'http://localhost:3000/home';
                    }, 1000)
                    return;
                }
            }, intervalDelay);
        }
    });

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
        if (getLoggedUserProfile() === undefined) {
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

    const handleSaveSettingsClick = (): void => {
        setTimeout(() => {
            setIsFormDisabled(true);
            setIsEditButtonClicked(false);
            setIsSaveSettingsClicked(true);
        }, 500);
    };

    const hasSameProfileData = () => {
        return fullName === getLoggedUserProfile()!.fullName &&
            city === getLoggedUserProfile()!.city &&
            country === getLoggedUserProfile()!.country
    };

    const handleCloseDialog = (accepted?: boolean): void => {
        if (!accepted) {
            setTimeout(() => {
                setIsSaveSettingsClicked(false);
            }, 500);
            return;
        }
        setTimeout(() => {
            setIsSaveSettingsClicked(false);
            if (getLoggedUserProfile() === undefined) {
                const userProfile: IUserProfileCreate = {
                    userUid: authenticationContext.User.uid!,
                    fullName,
                    city,
                    country,
                    dateOfBirth
                };
                services.UserProfilesService.Add(userProfile);
                setDisplayProgessIndicator(true);
                return;
            }
            if (hasSameProfileData()) {
                return;
            }
            const newUserProfile: IUserProfileUpdate = {
                uid: getLoggedUserProfile()!.uid,
                fullName,
                city,
                country
            };
            services.UserProfilesService.Update(newUserProfile);
            setDisplayProgessIndicator(true);
            setFullName(newUserProfile.fullName);
            setCity(newUserProfile.city);
            setCountry(newUserProfile.country);
        }, 500);
    };

    const handlePeriodChange = (date: Date | undefined | null): void => {
        setDateOfBirth(date!);
    };


    return <div className={containerClassName}>
        <div style={displayProgessIndicator === false ? { display: 'none' } : {}}>
            <ProgressIndicator styles={progressIndicatorStyles}
                label={progressBarMessage === '' ?
                    (getLoggedUserProfile() !== undefined ? 'Updating Profile' : 'Creating Profile') : progressBarMessage}
                percentComplete={percentComplete} />
        </div>

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
                    borderless={true} />
            </div>
            <div style={{ display: 'flex' }}>
                <DefaultButton text={getLoggedUserProfile() === undefined ? 'Create' : 'Edit'}
                    styles={editButtonStyles}
                    onClick={handleEditButtonClick} />
                {isEditButtonClicked && getLoggedUserProfile() !== undefined &&
                    <DefaultButton styles={saveSettingsButtonStyles}
                        text="Save"
                        onClick={handleSaveSettingsClick} />}
            </div>
            <div style={{ position: 'absolute' }}>
                <CustomDialog acceptedButtonStyles={acceptedButtonStyles}
                    dialogStyles={dialogStyles}
                    mainText={getLoggedUserProfile() === undefined ?
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