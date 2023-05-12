import { DefaultButton, TextField } from '@fluentui/react'
import { useContext, useEffect, useState } from 'react'
import {
    EMAIL_SHOULD_NOT_BE_EMPTY,
    ENVELOPE_LOGO_LOCATION,
    LOCK_LOGO_LOCATION,
    LOGIN,
    LOGIN_PATH,
    PASSWORD_SHOULD_NOT_BE_EMPTY,
    SIGN_UP,
    USER_ALREADY_EXISTS,
    USER_SUCCESFULLY_REGISTER,
    VALID_EMAIL_ADDRESS_ERROR_MESSAGE
} from '../../Library/constants'
import { IsModified } from '../../Library/types'
import { Background } from '../Background/background'
import { CustomIconButton } from '../CustomIconButton/customIconButton'
import { Logo } from '../Logo/logo'
import { SocialMedia } from '../SocialMedia/socialMedia'
import {
    containerClassName,
    containerSignUpClassName,
    contentStyles,
    headerButtonsClassName,
    signUpButtonStyles,
    emailAddressIconClassName,
    textFieldStyles,
    passwordIconClassName,
    additionalInfoHeaderClassName,
    signUpHeaderButtonStyles,
    loginHeaderButtonStyles,
    successfullyRegisteredClassName,
    errorClassName,
    textErrorFieldStyles
} from './register.styles'
import { ISignUpFormData } from './register.types'
import { NavigateFunction, useNavigate } from 'react-router';
import { ServiceContext, ServiceContextInstance } from '../../Core/serviceContext'
import { IResponse } from '../../Models/IResponse'
import validator from 'validator';
import { IRegisterUser } from '../../Models/User/IRegisterUser'
import { CustomAlert } from '../CustomAlert/customAlert'

export const Register = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailAddressErrorMessage, setEmailAddressErrorMessage] = useState<string>('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(true);
    const [successfullyRegisteredMessage, setSuccessfullyRegisteredMessage] = useState<string>('');
    const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
    const [successfullyRegistered, setSuccessfullyRegistered] = useState<boolean>(false);
    const [hasInvalidPassword, setHasInvalidPassword] = useState<boolean>();
    const [isModified, setIsModified] = useState<IsModified<'Email' | 'Password'>>(
        {
            Email: false,
            Password: false
        }
    );
    const invalidPasswordMessages: string[] = [
        "Password must contain 1 or more uppercase characters.\n",
        "Password must be 5 or more characters in length.\n",
        "Password must contain 1 or more lowercase characters."]
    const navigate: NavigateFunction = useNavigate();
    useEffect(() => {
        if (successfullyRegistered === true) {
            setTimeout(() => {
                setSuccessfullyRegisteredMessage('');
            }, 2000)
        }
    }, [successfullyRegistered]);

    useEffect(() => {
        if (successfullyRegisteredMessage === '' && successfullyRegistered) {
            setTimeout(() => {
                setSuccessfullyRegistered(false);
                navigate(LOGIN_PATH);
            }, 100);
        }
    }, [successfullyRegisteredMessage]);

    const isReadyToSumbit = (data: ISignUpFormData): boolean => {
        return data.Email !== "" && data.Password !== '';
    };
    const isPasswordValid = (password: string): boolean => {
        const regex = {
            'capital': /[A-Z]/,
            'digit': /[0-9]/,
            'lowercase': '/[a-z]'
        };
        return regex.capital.test(password) &&
            regex.digit.test(password) &&
            password.length >= 5;
    };
    const onEmailAddressChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newEmailAddress?: string | undefined): void => {
        if (!isModified.Email) {
            setIsModified(prevIsModified => ({ ...prevIsModified, Email: true }));
        }
        setEmailAddressErrorMessage(isModified.Email &&
            newEmailAddress! === '' ?
            EMAIL_SHOULD_NOT_BE_EMPTY : '');
        setIsSaveButtonDisabled(!isReadyToSumbit({ Email: newEmailAddress!, Password: password }));
        setEmailAddress(newEmailAddress!)
    };
    const onPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newPassword?: string | undefined): void => {
        if (!isModified.Password) {
            setIsModified(prevIsModified => ({ ...prevIsModified, Password: true }));
        }
        setPasswordErrorMessage(isModified.Password &&
            newPassword! === '' ?
            PASSWORD_SHOULD_NOT_BE_EMPTY : '');
        setIsSaveButtonDisabled(!isReadyToSumbit({ Email: emailAddress, Password: newPassword! }));
        setPassword(newPassword!);
    };
    const clearFields = () => {
        setEmailAddress('');
        setPassword('');
    };
    const handleIncorrectRegister = (message: string) => {
        setServerErrorMessage(message);
        // setTimeout(() => {
        //     setServerErrorMessage('');
        //     clearFields();
        // }, 3000)
    }
    const handleRegister = (): void => {
        if (!validator.isEmail(emailAddress)) {
            handleIncorrectRegister(VALID_EMAIL_ADDRESS_ERROR_MESSAGE);
            return;
        }
        if (!isPasswordValid(password)) {
            setHasInvalidPassword(true);
        }
        const signUpUser: IRegisterUser = {
            email: emailAddress,
            password
        };
        services.AuthenticationService.Register(signUpUser).then((data: IResponse<any>) => {
            if (data.Error !== undefined) {
                if (data.Status === 400) {
                    handleIncorrectRegister(USER_ALREADY_EXISTS);
                    return;
                }
            }
            if (data.Data! !== undefined && data.Status === 200) {
                setSuccessfullyRegisteredMessage(USER_SUCCESFULLY_REGISTER);
                setSuccessfullyRegistered(true);
                return;
            }
        })
    };
    const handleLoginClick = (): void => {
        navigate(LOGIN_PATH);
    };
    const isAnyFieldEmpty = (): boolean => {
        return emailAddress === '' || password === '';
    };
    const handleModalClose = (): void => {
        setTimeout(() => {
            setHasInvalidPassword(false);
        }, 500)
    };
    return <div className={containerClassName}>
        <Background />
        <div className={containerSignUpClassName}>
            <div className={contentStyles.container}>
                <div className={headerButtonsClassName}>
                    <DefaultButton onClick={handleLoginClick} styles={loginHeaderButtonStyles} text={LOGIN} />
                    <DefaultButton styles={signUpHeaderButtonStyles} text={SIGN_UP} />
                </div>
                <p className={additionalInfoHeaderClassName}>Register to access your account</p>
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
                    <CustomIconButton className={emailAddressIconClassName}
                        logoLocation={ENVELOPE_LOGO_LOCATION} />
                    <CustomIconButton className={passwordIconClassName}
                        logoLocation={LOCK_LOGO_LOCATION} />
                    <p className={successfullyRegisteredClassName}>{successfullyRegisteredMessage}</p>
                    <p className={errorClassName}>{serverErrorMessage}</p>
                    <DefaultButton disabled={isSaveButtonDisabled || isAnyFieldEmpty()}
                        onClick={handleRegister}
                        styles={signUpButtonStyles}
                        text={SIGN_UP} />
                    <CustomAlert isOpen={hasInvalidPassword!}
                        messages={invalidPasswordMessages}
                        handleCloseDialog={handleModalClose} />
                </div>
            </div>
        </div>
        <Logo />
        <SocialMedia />
    </div>
}