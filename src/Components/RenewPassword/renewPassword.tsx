import {
    DefaultButton,
    Label,
    TextField
} from 'office-ui-fabric-react';
import {
    useContext,
    useState
} from 'react';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { IResponse } from '../../Models/IResponse';
import { Logo } from '../Logo/logo';
import { MessageCallout } from '../MessageCallout/messageCallout';
import {
    containerClassName,
    labelClassName,
    loginSpanClassName,
    mainLogoClassName,
    mainTextClassName,
    resetPasswordButtonStyles,
    resetPasswordQuestionClassName,
    textFieldStyles
} from './renewPassword.styles';
import {
    NavigateFunction,
    useNavigate
} from 'react-router';
import { LOGIN_PATH } from '../../Library/constants';
export const RenewPassword = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [notificationTitle, setNotificationTitle] = useState<string>('');
    const [notificationMessage, setNotificationMessage] = useState<string>('');
    const [isCalloutVisible, setIsCalloutVisible] = useState<boolean>(false);

    const navigate: NavigateFunction = useNavigate();

    const onNewPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newPassword?: string | undefined): void => {
        setNewPassword(newPassword!)
    };

    const onConfirmPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, confirmPassword?: string | undefined): void => {
        setConfirmPassword(confirmPassword!)
    };

    const getEmailFromURL = (): string => {
        return window.location.href.split('email=')[1];
    };
    const setCalloutParameters = (notificationTitle: string, notificationMessage: string) => {
        setIsCalloutVisible(true);
        setNotificationTitle(notificationTitle);
        setNotificationMessage(notificationMessage);
    };
    const onHandleSubmitClick = () => {
        if (newPassword === '' || confirmPassword === '') {
            setCalloutParameters('Please field both fields', '');
            return;
        }
        if (newPassword !== confirmPassword) {
            setCalloutParameters('Passwords do not match!',
                'Please enter passwords that match!');
            return;
        }
        const email = getEmailFromURL();
        services.AuthenticationService.RenewPassword({
            email: email,
            password: newPassword
        }).then((data: IResponse<any>) => {
            if (data.Error !== undefined) {
                setCalloutParameters('Please try again', '');
                return;
            }
            setCalloutParameters('Password successfully changed!', '');
        });
    };
    const handleLoginClick = () => {
        navigate(LOGIN_PATH);
    };
    
    return <div>
        <Logo mainLogoClassName={mainLogoClassName}
            mainTextClassName={mainTextClassName} />
        <div className={containerClassName}>
            <Label className={labelClassName}>Password</Label>
            <TextField onChange={onNewPasswordChange}
                canRevealPassword={true}
                styles={textFieldStyles}
                underlined={true}
                type="password" />
            <Label className={labelClassName}>Confirm Password</Label>
            <TextField onChange={onConfirmPasswordChange}
                canRevealPassword={true}
                underlined={true}
                styles={textFieldStyles}
                type="password" />
            <DefaultButton onClick={onHandleSubmitClick}
                styles={resetPasswordButtonStyles}
                text='Reset Password' />
            <p className={resetPasswordQuestionClassName}>Have you reset password?
                <span onClick={handleLoginClick}
                    className={loginSpanClassName} >Login</span></p>
        </div>
        {
            isCalloutVisible &&
            <MessageCallout setIsCalloutVisible={setIsCalloutVisible}
                notificationMessage={notificationMessage}
                notificationTitle={notificationTitle} />
        }
    </div>
};