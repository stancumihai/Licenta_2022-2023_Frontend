import { DefaultButton, TextField } from 'office-ui-fabric-react';
import { useContext, useState } from 'react';
import { ServiceContext, ServiceContextInstance } from '../../Core/serviceContext';
import { IResponse } from '../../Models/IResponse';
import { IRenewPassword } from '../../Models/RenewPassword';
import { errorClassName } from './renewPassword.styles';

export const RenewPassword = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onNewPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newPassword?: string | undefined): void => {
        setNewPassword(newPassword!)
    };

    const onConfirmPasswordChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, confirmPassword?: string | undefined): void => {
        setConfirmPassword(confirmPassword!)
    };

    const getEmailFromURL = (): string => {
        return window.location.href.split('email=')[1];
    };

    const onHandleSubmitClick = () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords are not the same');
            setTimeout(() => {
                setErrorMessage('');
            }, 2000)
            return;
        }
        const email = getEmailFromURL();
        services.AuthenticationService.RenewPassword({
            email: email,
            password: newPassword
        }).then((data: IResponse<any>) => {
            console.log(data);
        });
    };

    return <div>
        <p className={errorClassName}>{errorMessage}</p>
        <TextField onChange={onNewPasswordChange}
            label='Password'
            type="password" />
        <TextField onChange={onConfirmPasswordChange}
            label='Confirm Password'
            type="password" />
        <DefaultButton onClick={onHandleSubmitClick}
            text='Reset Password' />
    </div>
};