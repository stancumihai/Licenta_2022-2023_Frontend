import {
    CommandButton,
    IContextualMenuProps
} from 'office-ui-fabric-react';
import {
    commandButtonStyles,
    containerClassName,
    contextualIconButtonStyles,
    contextualMenuStyles,
    iconButtonStyles,
    notificationDotClassName,
    notificationIcon
} from './profileSettings.styles'
import {
    NavigateFunction,
    useNavigate
} from 'react-router';
import { IconButton } from '@fluentui/react';
import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel
} from '@aspnet/signalr';
import {
    useContext,
    useEffect,
    useState
} from 'react';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import { NotificationsHoverCard } from '../NotificationsHoverCard/notificationsHoverCard';
import { UserType } from '../../Enums/UserType';
import UserContext from '../../Contexts/User/userContext';
import { IUserContext } from '../../Contexts/User/userContext.types';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';

export const ProfileSettings = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const userContext: IUserContext = useContext(UserContext);
    const [showHoverCard, setShowHoverCard] = useState<boolean>(false);

    const handleProfileSettingsClick = () => {
        navigate("/profile")
    };

    const menuProps: IContextualMenuProps | undefined = {
        items: [
            {
                key: 'profileSettings',
                text: 'Profile Settings',
                iconProps: {
                    iconName: 'Settings',
                    styles: contextualIconButtonStyles
                },
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
    //     if (authenticationContext.User.role !== UserType.Administrator && currentUserHasProfile()) {
    //         setTimeout(() => {
    //             try {
    //                 const webSocketUrl = "https://localhost:7145/notification";
    //                 const connection: HubConnection = new HubConnectionBuilder()
    //                     .withUrl(webSocketUrl)
    //                     .configureLogging(LogLevel.None)
    //                     .build();
    //                 setConnection(connection);
    //             } catch (e) {
    //                 console.log(e);
    //             }
    //         }, 5000);
    //     }
    // });

    // useEffect(() => {
    //     if (connection && authenticationContext.User.role !== UserType.Administrator) {
    //         connection.start()
    //             .then(result => {
    //                 connection.on('ReceiveNotification', (message: string) => {
    //                     authenticationContext.setUpdatedNotifications(true);
    //                 });
    //             })
    //     }
    // }, [connection]);


    const currentUserHasProfile = (): boolean => {
        return userContext.users.filter((u: IUserProfileRead) => u.userUid === authenticationContext.User.uid!)[0] != null || isAdmin();
    };

    const handleNotificationClick = (): void => {
        authenticationContext.setUpdatedNotifications(false);
        setShowHoverCard(false);
    };

    const handleOnNotificationMouseEnter = (): void => {
        if (authenticationContext.HasNotifications) {
            setShowHoverCard(true);
        }
    };

    const isAdmin = (): boolean => {
        return authenticationContext.User.role === UserType.Administrator;
    };

    return <div className={containerClassName}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <IconButton style={isAdmin() ? { display: 'none' } : {}}
                styles={iconButtonStyles}
                iconProps={notificationIcon}
                onClick={handleNotificationClick}
                onMouseEnter={handleOnNotificationMouseEnter}
                onMouseLeave={() => setShowHoverCard(false)} />
            {authenticationContext.HasNotifications && <div style={isAdmin() || !currentUserHasProfile() ? { display: 'none' } : {}}
                className={notificationDotClassName}></div>}
            {showHoverCard && <NotificationsHoverCard />}
        </div>
        <CommandButton style={isAdmin() ? { display: 'none' } : {}}
            iconProps={{ iconName: 'AccountManagement' }}
            styles={commandButtonStyles}
            menuProps={menuProps} />
    </div >
}