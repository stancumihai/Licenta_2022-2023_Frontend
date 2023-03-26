import {
    Checkbox,
    DefaultButton,
    TextField
} from '@fluentui/react';
import {
    ENVELOPE_LOGO_LOCATION,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_PATH,
    JWT_TOKEN,
    LOCK_LOGO_LOCATION,
    LOGIN,
    LOGIN_SERVER_ERROR,
    REMEMBER_ME,
    SIGN_UP,
    SIGN_UP_PATH,
    SURVEY_PATH
} from '../../Library/constants';
import {
    contentStyles,
    containerLoginClassName,
    textFieldStyles,
    loginButtonStyles,
    additionalInfoHeaderClassName,
    forgotPasswordStyles,
    headerButtonsClassName,
    loginHeaderButtonStyles,
    signUpHeaderButtonStyles,
    rememberMeCheckboxStyles,
    containerClassName,
    emailAddressIconClassName,
    passwordIconClassName,
    customIconButtonContainerClasssName,
    errorClassName,
    textErrorFieldStyles,
} from './login.styles';
import { useContext, useState } from 'react';
import { IsModified } from '../../Library/types';
import { ILoginFormData } from './login.types';
import { Background } from '../Background/background';
import { SocialMedia } from '../SocialMedia/socialMedia';
import { Logo } from '../Logo/logo';
import { CustomIconButton } from '../CustomIconButton/customIconButton';
import {
    NavigateFunction,
    useNavigate
} from 'react-router';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { ILoginUser } from '../../Models/User/ILoginUser';
import Cookies from 'universal-cookie';
import { IAuthentificationContext } from '../../Authentication/authenticationContext.types';
import AuthentificationContext from '../../Authentication/authenticationContext';
import { IResponse } from '../../Models/IResponse';
import { IUser } from '../../Models/User/IUser';

export const Login = (): JSX.Element => {
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [emailAddressErrorMessage, setEmailAddressErrorMessage] = useState<string>('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(true);
    const [serverError, setServerError] = useState<string>('');
    const [isModified, setIsModified] = useState<IsModified<'Email' | 'Password'>>(
        {
            Email: false,
            Password: false
        }
    );

    const navigate: NavigateFunction = useNavigate();
    const cookie = new Cookies();

    const isReadyToSumbit = (data: ILoginFormData): boolean => {
        return data.Email !== "" && data.Password !== '';
    };
    const onEmailAddressChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newEmailAddress?: string | undefined): void => {
        if (!isModified.Email) {
            setIsModified(prevIsModified => ({ ...prevIsModified, Email: true }));
        }
        setEmailAddressErrorMessage(isModified.Email && newEmailAddress! === '' ? 'Email should not be empty' : '');
        setIsSaveButtonDisabled(!isReadyToSumbit({ Email: newEmailAddress!, Password: password }));
        setEmailAddress(newEmailAddress!)
    };
    const onPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newPassword?: string | undefined): void => {
        if (!isModified.Password) {
            setIsModified(prevIsModified => ({ ...prevIsModified, Password: true }));
        }
        setPasswordErrorMessage(isModified.Password && newPassword! === '' ? 'Password should not be empty' : '');
        setIsSaveButtonDisabled(!isReadyToSumbit({ Email: emailAddress, Password: newPassword! }));
        setPassword(newPassword!);
    };
    const onRememberMeChange = (ev?: React.FormEvent<HTMLInputElement | HTMLElement> | undefined, checked?: boolean | undefined): void => {
        setRememberMe(checked!);
    };
    const clearFields = () => {
        setEmailAddress('');
        setPassword('');
    };
    const handleLogin = (): void => {
        const loginUser: ILoginUser = {
            email: emailAddress,
            password,
            rememberMe: rememberMe
        };
        services.AuthenticationService.Login(loginUser).then((data: IResponse<any>) => {
            if (data.Error !== undefined) {
                setServerError(LOGIN_SERVER_ERROR);
                setTimeout(() => {
                    setServerError('');
                }, 2000)
                clearFields();
                return;
            }
            if (data.Data! !== undefined && data.Status === 200) {
                cookie.set(JWT_TOKEN, data.Data.accessToken);
                services.AuthenticationService.GetLoggedInUser().then((data: IResponse<IUser>) => {
                    authenticationContext.SetUpdatedUser(data.Data!);
                    navigate(SURVEY_PATH);
                });
                return;
            }
        });
    };
    const handleSignUpClick = (): void => {
        navigate(SIGN_UP_PATH);
    };
    const isAnyFieldEmpty = (): boolean => {
        return emailAddress === '' || password === '';
    };
    const handleForgotPassword = () => {
        navigate(FORGOT_PASSWORD_PATH);
    };
    return <div className={containerClassName}>
        <Background />
        <div className={containerLoginClassName}>
            <div className={contentStyles.container}>
                <div className={headerButtonsClassName}>
                    <DefaultButton styles={loginHeaderButtonStyles} text={LOGIN} />
                    <DefaultButton onClick={handleSignUpClick} styles={signUpHeaderButtonStyles} text={SIGN_UP} />
                </div>
                <p className={additionalInfoHeaderClassName}>Login to access your account</p>
                <div className={contentStyles.body}>
                    <TextField value={emailAddress}
                        onGetErrorMessage={() => emailAddressErrorMessage.toString()}
                        onChange={onEmailAddressChange}
                        styles={emailAddressErrorMessage ? textErrorFieldStyles : textFieldStyles}
                        placeholder='Email Address' />
                    <TextField value={password}
                        onGetErrorMessage={() => passwordErrorMessage.toString()}
                        onChange={onPasswordChange}
                        styles={passwordErrorMessage ? textErrorFieldStyles : textFieldStyles}
                        placeholder='Password'
                        type="password" />
                    <div className={customIconButtonContainerClasssName}>
                        <CustomIconButton className={emailAddressIconClassName}
                            logoLocation={ENVELOPE_LOGO_LOCATION} />
                        <CustomIconButton className={passwordIconClassName}
                            logoLocation={LOCK_LOGO_LOCATION} />
                    </div>
                    <Checkbox onChange={onRememberMeChange}
                        styles={rememberMeCheckboxStyles}
                        label={REMEMBER_ME} />
                    <p className={errorClassName}>{serverError}</p>
                    <DefaultButton disabled={isSaveButtonDisabled || isAnyFieldEmpty()}
                        onClick={handleLogin}
                        styles={loginButtonStyles}
                        text={LOGIN} />
                    <DefaultButton onClick={handleForgotPassword}
                        styles={forgotPasswordStyles}
                        text={FORGOT_PASSWORD} />
                </div>
            </div>
        </div>
        <Logo />
        <SocialMedia />
    </div>
};