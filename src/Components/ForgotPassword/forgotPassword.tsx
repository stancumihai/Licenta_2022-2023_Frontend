import { TextField } from '@fluentui/react';
import { DefaultButton } from 'office-ui-fabric-react';
import { useContext, useState } from 'react';
import { ServiceContext, ServiceContextInstance } from '../../Core/serviceContext';
import { IResponse } from '../../Models/IResponse';

export const ForgotPassword = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [emailAddress, setEmailAddress] = useState<string>('');

    const onEmailAddressChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newEmailAddress?: string | undefined): void => {
        setEmailAddress(newEmailAddress!)
    };

    const onResetPasswordClick = (): void => {
        console.log(emailAddress);
        services.AuthenticationService.SendEmail(emailAddress.trim())
            .then((data: IResponse<string>) => {
                console.log(data);
            });
    };

    return <div>
        <TextField onChange={onEmailAddressChange}
            label='Email' />
        <DefaultButton onClick={onResetPasswordClick}
            text='Reset Password' />
    </div>
};