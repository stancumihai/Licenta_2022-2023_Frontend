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
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { useContext, useEffect, useState } from 'react';
import AuthentificationContext from '../../Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Authentication/authenticationContext.types';
import { NotificationsHoverCard } from '../NotificationsHoverCard/notificationsHoverCard';

export const ProfileSettings = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const [showHoverCard, setShowHoverCard] = useState<boolean>(false);

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

    // useEffect(() => {
    //     setTimeout(() => {
    //         try {
    //             const webSocketUrl = "https://localhost:7145/notification";
    //             const connection: HubConnection = new HubConnectionBuilder()
    //                 .withUrl(webSocketUrl)
    //                 .configureLogging(LogLevel.None)
    //                 .build();
    //             setConnection(connection);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }, 5000)
    // });

    // useEffect(() => {
    //     if (connection) {
    //         connection.start()
    //             .then(result => {
    //                 connection.on('ReceiveNotification', (message: string) => {
    //                     authenticationContext.setUpdatedNotifications(true);
    //                 });
    //             })
    //     }
    // }, [connection]);

    const handleNotificationClick = (): void => {
        authenticationContext.setUpdatedNotifications(false);
        setShowHoverCard(false);
    };

    const handleOnNotificationMouseEnter = (): void => {
        if (authenticationContext.HasNotifications) {
            setShowHoverCard(true);
        }
    };

    return <div className={containerClassName}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <IconButton styles={iconButtonStyles}
                iconProps={notificationIcon}
                onClick={handleNotificationClick}
                onMouseEnter={handleOnNotificationMouseEnter}
                onMouseLeave={() => setShowHoverCard(false)} />
            {authenticationContext.HasNotifications && <div className={notificationDotClassName}></div>}
            {showHoverCard && <NotificationsHoverCard />}
        </div>
        <CommandButton iconProps={userIcon}
            styles={commandButtonStyles}
            menuProps={menuProps} />
    </div >
}