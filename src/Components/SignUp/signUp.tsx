import { DefaultButton, TextField } from '@fluentui/react'
import { useState } from 'react'
import { ENVELOPE_LOGO_LOCATION, LOCK_LOGO_LOCATION, LOGIN, SIGN_UP } from '../../Library/constants'
import { IsModified } from '../../Library/types'
import { Background } from '../Background/background'
import { CustomIconButton } from '../CustomIconButton/customIconButton'
import { loginHeaderButtonStyles, signUpHeaderButtonStyles, additionalInfoHeaderClassName } from '../Login/login.styles'
import { Logo } from '../Logo/logo'
import { SocialMedia } from '../SocialMedia/socialMedia'
import { containerClassName, containerSignUpClassName, contentStyles, headerButtonsClassName, signUpButtonStyles, emailAddressIconClassName, textFieldStyles, passwordIconClassName } from './signUp.styles'
import { ISignUpFormData } from './signUp.types'

export const SignUp = (): JSX.Element => {
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailAddressErrorMessage, setEmailAddressErrorMessage] = useState<string>('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState<boolean>(false);
    const [isModified, setIsModified] = useState<IsModified<'Email' | 'Password'>>(
        {
            Email: false,
            Password: false
        }
    );
    const isReadyToSumbit = (data: ISignUpFormData): boolean => {
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
    const handleSignUp = (): void => {
        console.log('SignUp pressed');
    };
    return <div className={containerClassName}>
        <Background />
        <div className={containerSignUpClassName}>
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

                    <DefaultButton disabled={isSaveButtonDisabled}
                        onClick={handleSignUp}
                        styles={signUpButtonStyles}
                        text={SIGN_UP} />
                </div>
            </div>
        </div>
        <Logo />
        <SocialMedia />
    </div>
}