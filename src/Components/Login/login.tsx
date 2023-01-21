import { Checkbox, DefaultButton, TextField } from '@fluentui/react';
import { ENVELOPE_LOGO_LOCATION, FORGOT_PASSWORD, LOCK_LOGO_LOCATION, LOGIN, REMEMBER_ME, SIGN_UP } from '../../Library/constants';
import { contentStyles, containerLoginClassName, textFieldStyles, loginButtonStyles, additionalInfoHeaderClassName, forgotPasswordClassName, headerButtonsClassName, loginHeaderButtonStyles, signUpHeaderButtonStyles, checkBoxStyles, containerClassName, emailAddressIconClassName, passwordIconClassName } from './login.styles';
import { useState } from 'react';
import { IsModified } from '../../Library/types';
import { ILoginFormData } from './login.types';
import { Background } from '../Background/background';
import { SocialMedia } from '../SocialMedia/socialMedia';
import { Logo } from '../Logo/logo';
import { CustomIconButton } from '../CustomIconButton/customIconButton';

export const Login = (): JSX.Element => {
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [emailAddressErrorMessage, setEmailAddressErrorMessage] = useState<string>('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(false);
    const [isModified, setIsModified] = useState<IsModified<'Email' | 'Password'>>(
        {
            Email: false,
            Password: false
        }
    );

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
    const handleLogin = (): void => {
        console.log('Login pressed');
    };
    return <div className={containerClassName}>
        <Background />
        <div className={containerLoginClassName}>
            <div className={contentStyles.container}>
                <div className={headerButtonsClassName}>
                    <DefaultButton styles={loginHeaderButtonStyles} text={LOGIN} />
                    <DefaultButton styles={signUpHeaderButtonStyles} text={SIGN_UP} />
                </div>
                <p className={additionalInfoHeaderClassName}>Get login to access your account</p>
                <div className={contentStyles.body}>
                    <TextField value={emailAddress}
                        onGetErrorMessage={() => emailAddressErrorMessage.toString()}
                        onChange={onEmailAddressChange}
                        styles={textFieldStyles}
                        placeholder='Email Address' />
                    <TextField value={password}
                        onGetErrorMessage={() => passwordErrorMessage.toString()}
                        onChange={onPasswordChange}
                        styles={textFieldStyles}
                        placeholder='Password'
                        type="password" />
                    <CustomIconButton className={emailAddressIconClassName}
                        logoLocation={ENVELOPE_LOGO_LOCATION} />
                    <CustomIconButton className={passwordIconClassName}
                        logoLocation={LOCK_LOGO_LOCATION} />
                    <Checkbox onChange={onRememberMeChange}
                        styles={checkBoxStyles}
                        label={REMEMBER_ME} />
                    <DefaultButton disabled={isSaveButtonDisabled}
                        onClick={handleLogin}
                        styles={loginButtonStyles}
                        text={LOGIN} />
                    <p className={forgotPasswordClassName}>{FORGOT_PASSWORD}</p>
                </div>
            </div>
        </div>
        <Logo />
        <SocialMedia />
    </div>
};