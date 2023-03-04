import { DefaultButton } from '@fluentui/react';
import { NavigateFunction, useNavigate } from 'react-router';
import { LOGIN_PATH } from '../../Library/constants';

export const HomePage = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();

    return <div>
        <DefaultButton onClick={() => {
            navigate(LOGIN_PATH)
        }}>Logout</DefaultButton>
    </div>
};