import {
    CommandButton,
    IContextualMenuProps
} from 'office-ui-fabric-react';
import {
    commandButtonStyles,
    containerClassName,
    contextualMenuStyles,
    iconButtonStyles,
    notificationDotClassName,
    notificationIcon,
    userIcon
} from './profileSettings.styles'
import {
    NavigateFunction,
    useNavigate
} from 'react-router';
import { IconButton } from '@fluentui/react';

export const ProfileSettings = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();
    const hasNotifications = false;

    const handleProfileSettingsClick = () => {
        navigate("/profile")
    };

    const menuProps: IContextualMenuProps | undefined = {
        items: [
            {
                key: 'profileSettings',
                text: 'Profile Settings',
                iconProps: { iconName: 'Settings' },
                onClick: handleProfileSettingsClick,
            }
        ],
        shouldFocusOnMount: true,
        styles: contextualMenuStyles,
        calloutProps: {
            style: {
                right: '-1px'
            }
        }
    };

    const handleNotificationClick = (): void => {

    };

    const handleOnNotificationMouseEnter = (): void => {
    };

    return <div className={containerClassName}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <IconButton styles={iconButtonStyles}
                iconProps={notificationIcon}
                onClick={handleNotificationClick}
                onMouseEnter={handleOnNotificationMouseEnter} />
            {hasNotifications && <div className={notificationDotClassName}></div>}
        </div>
        <CommandButton iconProps={userIcon}
            styles={commandButtonStyles}
            menuProps={menuProps} />
    </div >
}