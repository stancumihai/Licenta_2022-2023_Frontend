import { TextField } from '@fluentui/react';
import {
    DefaultButton,
    IconButton,
    Label
} from 'office-ui-fabric-react';
import {
    useContext,
    useState
} from 'react';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import {
    FORGOT_PASSWORD_HEADER_MESSAGE,
    SIGN_UP_PATH,
    VALID_EMAIL_ADDRESS_ERROR_MESSAGE
} from '../../Library/constants';
import { IResponse } from '../../Models/IResponse';
import {
    circleClassName1,
    circleClassName2,
    containerClassName,
    contentClassName,
    dontHaveAccountMessageClassName,
    forgotPasswordMessageClassName,
    headerClassName,
    iconButtonStyles,
    labelClassName,
    mainLogoClassName,
    mainTextClassName,
    resetPasswordButtonStyles,
    signUpSpanClassName,
    textFieldStyles
} from './forgotPassword.styles';
import {
    NavigateFunction,
    useNavigate
} from 'react-router';
import validator from 'validator';
import { Logo } from '../Logo/logo';
import { MessageCallout } from '../MessageCallout/messageCallout';

export const ForgotPassword = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [notificationTitle, setNotificationTitle] = useState<string>('');
    const [notificationMessage, setNotificationMessage] = useState<string>('');
    const [isCalloutVisible, setIsCalloutVisible] = useState<boolean>(false);

    const navigate: NavigateFunction = useNavigate();

    const onEmailAddressChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newEmailAddress?: string | undefined): void => {
        setEmailAddress(newEmailAddress!)
    };
    const setCalloutParameters = (notificationTitle: string, notificationMessage: string) => {
        setIsCalloutVisible(true);
        setNotificationTitle(notificationTitle);
        setNotificationMessage(notificationMessage);
    };
    const onResetPasswordClick = (): void => {
        setIsCalloutVisible(false);
        if (!validator.isEmail(emailAddress)) {
            setCalloutParameters("Invalid mail address!", VALID_EMAIL_ADDRESS_ERROR_MESSAGE)
            return;
        }
        services.AuthenticationService.SendEmail(emailAddress.trim())
            .then((data: IResponse<string>) => {
                if (data.Error! !== undefined) {
                    setCalloutParameters('Mail cannot be found!', '');
                    return;
                }
                setCalloutParameters('Mail successfully sent!',
                    'Please check your email to reset password!');
            });
    };
    const handleSignUpClick = () => {
        navigate(SIGN_UP_PATH);
    };

    return <>
        <Logo mainLogoClassName={mainLogoClassName}
            mainTextClassName={mainTextClassName} />
        <div className={containerClassName}>
            <div style={{
                background: 'white',
                width: '200px',
                height: '200px',
                position: 'absolute',
                borderRadius: '100%',
                right: '30%',
                top: '7.5%'
            }}>
                <IconButton styles={iconButtonStyles}
                    iconProps={{ iconName: 'Lock' }} />
            </div>
            <div className={circleClassName1}>
            </div>
            <div className={circleClassName2}>
            </div>
            <div className={contentClassName}>
                <div className={headerClassName}>
                    <p className={forgotPasswordMessageClassName}>{FORGOT_PASSWORD_HEADER_MESSAGE}</p>
                </div>
                <Label className={labelClassName}>Email</Label>
                <TextField onChange={onEmailAddressChange}
                    styles={textFieldStyles}
                    underlined={true} />
                <DefaultButton onClick={onResetPasswordClick}
                    styles={resetPasswordButtonStyles}
                    text='Reset Password' />
                <p className={dontHaveAccountMessageClassName}>Don't have an account?
                    <span onClick={handleSignUpClick}
                        className={signUpSpanClassName}>Sign up</span></p>
            </div>
        </div>
        {
            isCalloutVisible &&
            <MessageCallout setIsCalloutVisible={setIsCalloutVisible}
                notificationMessage={notificationMessage}
                notificationTitle={notificationTitle} />
        }
    </>
};