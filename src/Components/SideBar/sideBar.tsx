import { useContext, useEffect, useState } from 'react';
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
    TRENDING_PATH,
    MY_HISTORY_PATH,
    DASHBOARD_PATH,
    RECOMMENDATIONS_PATH,
    TOP_GENRES_PATH,
    ARTISTS_OF_THE_MONTH_PATH,
    HOME_PATH
} from '../../Library/constants';
import { CustomDialog } from '../CustomDialog/customDialog';
import { SideBarListItem } from '../SidebarListItem/sideBarListItem';
import './sideBar.css'
import MovieContext from '../../Contexts/Movie/movieContext';
import { IMovieContext } from '../../Contexts/Movie/movieContext.types';
import { IMovieContextType } from '../../Enums/movieContextType';
import $ from 'jquery';

export const SideBar = (): JSX.Element => {
    const cookie = new Cookies();
    const movieContext: IMovieContext = useContext(MovieContext);

    const [isLogoutCustomDialogHidden, setIsLogoutCustomDialogHidden] = useState<boolean>(true);
    const [isSidebarClicked, setIsSidebarClicked] = useState<boolean>(false);
    const [isToggleActive, setIsToggleActive] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    const sidebarListItems = [
        {
            iconName: 'Home',
            text: 'Home',
            handleSidebarNavigation: () => {
                movieContext.setCurrentMovies(IMovieContextType.HOME);
                navigate(HOME_PATH);
            }
        },
        {
            iconName: 'Heart',
            text: 'My Collection',
            handleSidebarNavigation: () => {
                movieContext.setCurrentMovies(IMovieContextType.COLLECTION);
                navigate(MY_COLLECTION_PATH);
            },
        },
        {
            iconName: 'Trending12',
            text: 'Trending',
            handleSidebarNavigation: () => navigate(TRENDING_PATH),
        },
        {
            iconName: 'History',
            text: 'History',
            count: movieContext.historyMovies.length,
            handleSidebarNavigation: () => {
                movieContext.setCurrentMovies(IMovieContextType.HISTORY);
                navigate(MY_HISTORY_PATH)
            },
        },
        {
            iconName: 'BarChartVertical',
            text: 'Charts',
            count: movieContext.watchLaterMovies.length,
            handleSidebarNavigation: () => navigate(DASHBOARD_PATH)
        },
        {
            iconName: 'Calendar',
            text: 'Watch Later',
            handleSidebarNavigation: () => {
                movieContext.setCurrentMovies(IMovieContextType.WATCHLATER);
                navigate(WATCH_LATER_PATH)
            }
        },
        {
            iconName: 'Touch',
            text: 'Recommendations',
            handleSidebarNavigation: () => navigate(RECOMMENDATIONS_PATH)
        },
        {
            iconName: 'FavoriteList',
            text: 'Top Genres',
            handleSidebarNavigation: () => navigate(TOP_GENRES_PATH)
        },
        {
            iconName: 'Flashlight',
            text: 'Arists Of The Month',
            handleSidebarNavigation: () => navigate(ARTISTS_OF_THE_MONTH_PATH)
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
        handleSidebar();
    }, []);

    const handleSidebar = () => {
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
            setIsSidebarClicked(true);
            const element: HTMLElement = list[0] as HTMLElement;
            element.className = 'list active';
            return;
        }
    };

    const handleLogout = (): void => {
        cookie.getAll();
        cookie.remove(REFRESH_TOKEN);
        navigate(LOGIN_PATH);
    };

    const handleCloseDialog = (accepted?: boolean): void => {
        setIsLogoutCustomDialogHidden(true);
        if (accepted) {
            handleLogout();
        }
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
        {sidebarListItems.map((sidebarListItem: ISidebarListItem, i: number) => {
            return <SideBarListItem key={i}
                isToggleActive={isToggleActive}
                sidebarListItem={sidebarListItem} />
        })}
        <div className='toggle'>
            <IconButton onClick={handleToggleButton}
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