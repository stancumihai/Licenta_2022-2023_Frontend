import {
    useContext,
    useEffect,
    useState
} from 'react';
import { ISidebarListItem } from '../../UiModels/ISidebarListItem';
import {
    activeIconButtonStyles,
    inActiveIconButtonStyles,
} from './sideBar.styles';
import {
    NavigateFunction,
    useNavigate,
} from 'react-router';
import { IconButton } from 'office-ui-fabric-react';
import Cookies from 'universal-cookie';
import {
    REFRESH_TOKEN,
    LOGIN_PATH,
    WATCH_LATER_PATH,
    MY_COLLECTION_PATH,
    MY_HISTORY_PATH,
    DASHBOARD_PATH,
    RECOMMENDATIONS_PATH,
    TOP_GENRES_PATH,
    ARTISTS_OF_THE_MONTH_PATH,
    HOME_PATH,
    MANAGE_USERS_PATH,
    JWT_TOKEN,
    STATISTICS_PATH
} from '../../Library/constants';
import { CustomDialog } from '../CustomDialog/customDialog';
import { SideBarListItem } from '../SidebarListItem/sideBarListItem';
import './sideBar.css'
import MovieContext from '../../Contexts/Movie/movieContext';
import { IMovieContext } from '../../Contexts/Movie/movieContext.types';
import $ from 'jquery';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { UserType } from '../../Enums/UserType';
import UserContext from '../../Contexts/User/userContext';
import { IUserContext } from '../../Contexts/User/userContext.types';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';

export const SideBar = (): JSX.Element => {
    const cookie = new Cookies();
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const movieContext: IMovieContext = useContext(MovieContext);
    const userContext: IUserContext = useContext(UserContext);
    const [isLogoutCustomDialogHidden, setIsLogoutCustomDialogHidden] = useState<boolean>(true);
    const [isSidebarClicked, setIsSidebarClicked] = useState<boolean>(false);
    const [isToggleActive, setIsToggleActive] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    const sidebarAdminListItems: ISidebarListItem[] = [
        {
            iconName: 'Home',
            text: 'Home',
            handleSidebarNavigation: () => {
                navigate(HOME_PATH);
            }
        },
        {
            iconName: 'Contact',
            text: 'Users',
            count: userContext.users.length,
            handleSidebarNavigation: () => {
                navigate(MANAGE_USERS_PATH);
            }
        },
        {
            iconName: 'BarChartVertical',
            text: 'Statistics',
            handleSidebarNavigation: () => {
                navigate(STATISTICS_PATH);
            }
        },
        {
            iconName: 'Trending12',
            text: 'Charts',
            handleSidebarNavigation: () => {
                navigate(DASHBOARD_PATH);
            }
        },
        {
            iconName: 'FavoriteList',
            text: 'Top Genres',
            handleSidebarNavigation: () => {
                navigate(TOP_GENRES_PATH);
            }
        },
        {
            iconName: 'Flashlight',
            text: 'Arists Of The Month',
            handleSidebarNavigation: () => {
                navigate(ARTISTS_OF_THE_MONTH_PATH);
            }
        },
        {
            iconName: 'PowerButton',
            text: 'Logout',
            handleSidebarNavigation: () => {
                setIsLogoutCustomDialogHidden(false)
            }
        },
    ];

    const sidebarUserListItems: ISidebarListItem[] = [
        {
            iconName: 'Home',
            text: 'Home',
            handleSidebarNavigation: () => {
                navigate(HOME_PATH)
            }
        },
        {
            iconName: 'Heart',
            text: 'My Collection',
            count: movieContext.collectionMovies.length,
            handleSidebarNavigation: () => {
                navigate(MY_COLLECTION_PATH);
            }
        },
        {
            iconName: 'Touch',
            text: 'Recommendations',
            handleSidebarNavigation: () => {
                navigate(RECOMMENDATIONS_PATH);
            }
        },
        {
            iconName: 'History',
            text: 'History',
            count: movieContext.historyMovies.length,
            handleSidebarNavigation: () => {
                navigate(MY_HISTORY_PATH);
            }
        },
        {
            iconName: 'Calendar',
            text: 'Watch Later',
            count: movieContext.watchLaterMovies.length,
            handleSidebarNavigation: () => {
                navigate(WATCH_LATER_PATH);
            }
        },
        {
            iconName: 'BarChartVertical',
            text: 'Charts',
            handleSidebarNavigation: () => {
                navigate(DASHBOARD_PATH);
            }
        },
        {
            iconName: 'FavoriteList',
            text: 'Top Genres',
            handleSidebarNavigation: () => {
                navigate(TOP_GENRES_PATH);
            }
        },
        {
            iconName: 'Flashlight',
            text: 'Arists Of The Month',
            handleSidebarNavigation: () => {
                navigate(ARTISTS_OF_THE_MONTH_PATH)
            }
        },
        {
            iconName: 'PowerButton',
            text: 'Logout',
            handleSidebarNavigation: () => {
                setIsLogoutCustomDialogHidden(false)
            }
        },
    ];

    useEffect(() => {
        handleSidebarMechanism();
    }, [window.location.href]);

    const getSidebarUserIndex = (): number => {
        const url: string = window.location.href;
        switch (url) {
            case "http://localhost:3000/home": {
                return 0;
            }
            case "http://localhost:3000/home/myCollection": {
                return 1;
            }
            case "http://localhost:3000/home/recommendations": {
                return 2;
            }
            case "http://localhost:3000/home/myHistory": {
                return 3;
            }
            case "http://localhost:3000/home/watchLater": {
                return 4;
            }
            case "http://localhost:3000/charts": {
                return 5;
            }
            case "http://localhost:3000/topGenres": {
                return 5;
            }
            case "http://localhost:3000/artistsOfTheMonth": {
                return 6;
            }
            default: {
                return -1;
            }
        }
    };

    const getSidebarAdminIndex = (): number => {
        const url: string = window.location.href;
        switch (url) {
            case "http://localhost:3000/home": {
                return 0;
            }
            case "http://localhost:3000/users": {
                return 1;
            }
            case "http://localhost:3000/userDetails": {
                return 1;
            }
            case "http://localhost:3000/statistics": {
                return 2;
            }
            case "http://localhost:3000/charts": {
                return 3;
            }
            case "http://localhost:3000/topGenres": {
                return 4;
            }
            case "http://localhost:3000/artistsOfTheMonth": {
                return 5;
            }
            default: {
                return -1;
            }
        }
    };

    const isAdmin = (): boolean => {
        return authenticationContext.User.role === UserType.Administrator;
    };

    const getSideBarListItems = (): ISidebarListItem[] => {
        return isAdmin() ? sidebarAdminListItems : sidebarUserListItems;
    };

    const handleSidebarMechanism = () => {
        const list = $('.list');
        for (let i: number = 0; i < list.length; i++) {
            if (list[i] instanceof HTMLElement) {
                const element: HTMLElement = list[i] as HTMLElement;
                element.onclick = function () {
                    let j: number = 0;
                    while (j < list.length) {
                        list[j++].className = 'list';
                    }
                    element.className = 'list active';
                }
            }
        }
        if (!isSidebarClicked) {
            const sidebarIndex: number = isAdmin() ? getSidebarAdminIndex() : getSidebarUserIndex();
            if (sidebarIndex === -1) {
                return;
            }
            setIsSidebarClicked(true);
            const element: HTMLElement = list[sidebarIndex] as HTMLElement;
            element.className = 'list active';
            return;
        }
    };

    const handleLogout = (): void => {
        cookie.remove(JWT_TOKEN);
        cookie.remove(REFRESH_TOKEN);
        navigate(LOGIN_PATH);
    };

    const handleCloseDialog = (accepted?: boolean): void => {
        setIsLogoutCustomDialogHidden(true);
        if (accepted) {
            handleLogout();
        }
    };

    const currentUserHasProfile = (): boolean => {
        return userContext.users.filter((u: IUserProfileRead) => u.userUid === authenticationContext.User.uid!)[0] != null || isAdmin();
    };

    const handleToggleButton = () => {
        $('.navigation').toggleClass('active');
        if (!isToggleActive) {
            setTimeout(() => {
                setIsToggleActive(prev => !prev);
            }, 300);
            return;
        }
        setIsToggleActive(prev => !prev);
    };

    return <div className='navigation'>
        {getSideBarListItems().map((sidebarListItem: ISidebarListItem, i: number) => {
            return <SideBarListItem
                key={i}
                isToggleActive={isToggleActive}
                sidebarListItem={sidebarListItem} />
        })}
        <div className='toggle'>
            <IconButton onClick={handleToggleButton}
                disabled={!currentUserHasProfile()}
                iconProps={!isToggleActive ? { iconName: "GlobalNavButton" } : { iconName: 'Cancel' }}
                styles={!isToggleActive ? inActiveIconButtonStyles : activeIconButtonStyles} />
        </div>

        <CustomDialog mainText='Are you sure you want to logout?'
            isHidden={isLogoutCustomDialogHidden}
            handleCloseDialog={handleCloseDialog}
            acceptedText="Yes"
            cancelText='Cancel' />
    </div>
};