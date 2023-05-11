import { useEffect, useState } from 'react';
import { ISidebarListItem } from '../../UiModels/ISidebarListItem';
import {
    containerClassName,
    horizontalRuleClassName,
    calculatedSidebarListItemsContainerClassName,
    logoutButtonStyles,
    activeIconButtonStyles,
    sidebarContainerClassName,
    inActiveIconButtonStyles,
} from './sideBar.styles';
import {
    NavigateFunction,
    useNavigate,
} from 'react-router';
import { DefaultButton, IconButton } from 'office-ui-fabric-react';
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
import { ISidebarProps } from './sideBar.types';
import './sideBar.css'

export const SideBar = (props: ISidebarProps): JSX.Element => {
    const cookie = new Cookies();
    const [isLogoutDialogHidden, setIsLogoutDialogHidden] = useState<boolean>(true);
    const [isSidebarClicked, setIsSidebarClicked] = useState<boolean>(false);
    const [isToggleActive, setIsToggleActive] = useState<boolean>(false);

    const navigate: NavigateFunction = useNavigate();

    const sidebarListItems = [
        { iconName: 'Home', text: 'Home', count: 0, function: () => handleSidebarNavigation(HOME_PATH) },
        { iconName: 'Heart', text: 'My Collection', count: 0, function: () => handleSidebarNavigation(MY_COLLECTION_PATH), function2: () => handleSendDataCount(MY_COLLECTION_PATH) },
        { iconName: 'Trending12', text: 'Trending', count: 0, function: () => handleSidebarNavigation(TRENDING_PATH), function2: () => handleSendDataCount(TRENDING_PATH) },
        { iconName: 'History', text: 'History', count: 0, function: () => handleSidebarNavigation(MY_HISTORY_PATH), function2: () => handleSendDataCount(MY_HISTORY_PATH) },
        { iconName: 'BarChartVertical', text: 'Charts', function: () => handleSidebarNavigation(DASHBOARD_PATH) },
        { iconName: 'Calendar', text: 'Watch Later', function: () => handleSidebarNavigation(WATCH_LATER_PATH), function2: () => handleSendDataCount(WATCH_LATER_PATH) },
        { iconName: 'Touch', text: 'Recommendations', function: () => handleSidebarNavigation(RECOMMENDATIONS_PATH) },
        { iconName: 'FavoriteList', text: 'Top Genres', function: () => navigate(TOP_GENRES_PATH) },
        { iconName: 'Flashlight', text: 'Arists Of The Month', function: () => navigate(ARTISTS_OF_THE_MONTH_PATH) },
        { iconName: 'PowerButton', text: 'Logout', function: () => { setIsLogoutDialogHidden(false) } },

    ];
    // const sidebarCalculatedListItems: ISidebarListItem[] = [
    //     { iconName: 'Touch', text: 'Recommendations', function: () => handleSidebarNavigation(RECOMMENDATIONS_PATH) },
    //     { iconName: 'FavoriteList', text: 'Top Genres', function: () => navigate(TOP_GENRES_PATH) },
    //     { iconName: 'Flashlight', text: 'Arists Of The Month', function: () => navigate(ARTISTS_OF_THE_MONTH_PATH) },
    // ];

    const handleSendDataCount = (page: string): number => {
        if (props.countMapper !== undefined) {
            switch (page) {
                case MY_COLLECTION_PATH: {
                    return props.countMapper!.collectionCount;
                }
                case TRENDING_PATH: {
                    return 1;
                }
                case MY_HISTORY_PATH: {
                    return props.countMapper!.historyCount;
                }
                case WATCH_LATER_PATH: {
                    return props.countMapper!.watchLaterCount;
                }
                default: {
                    return 0;
                }
            }
        }
        return 0;
    };
    const handleSidebarNavigation = (page: string): void => {
        if (window.location.href === 'http://localhost:3000/home' && page === HOME_PATH) {
            return;
        }
        if (page === HOME_PATH) {
            window.location.replace('http://localhost:3000/home');
        }
        props.handleSidebarClick(page);
        navigate(`/home/${page}`);
    };
    const handleLogout = (): void => {
        cookie.getAll();
        cookie.remove(REFRESH_TOKEN);
        navigate(LOGIN_PATH);
    };
    const handleCloseDialog = (accepted?: boolean): void => {
        setIsLogoutDialogHidden(true);
        if (accepted) {
            handleLogout();
        }
    };

    const handleSidebar = () => {
        const menuToggle = document.querySelector('.toggle');
        const navigation = document.querySelector('.navigation');
        if (menuToggle && navigation instanceof HTMLElement) {
            (menuToggle as HTMLElement).onclick = function () {
                menuToggle.classList.toggle('active');
                navigation.classList.toggle('active');
                if (navigation.classList.contains('active')) {
                    setTimeout(() => {
                        setIsToggleActive(true);
                    }, 300)
                } else {
                    setIsToggleActive(false);
                }
            }
        }
        const list: NodeListOf<Element> = document.querySelectorAll('.list');
        if (!isSidebarClicked) {
            setIsSidebarClicked(true);
            const element: HTMLElement = list[0] as HTMLElement;
            element.className = 'list active';
            return;
        }
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
    };

    useEffect(() => {
        handleSidebar();
    },)

    // return <div className={sidebarContainerClassName}>
    //     <IconButton iconProps={{ iconName: "GlobalNavButton" }}
    //         styles={iconButtonStyles}
    //         onClick={handleExtendSidebarClick} />
    //     <ul className={containerClassName}>
    //         {sidebarListItems.map((sidebarListItem: ISidebarListItem, i: number) => {
    //             return <SideBarListItem key={i}
    //                 sidebarListItem={sidebarListItem} />
    //         })}
    //     </ul>
    //     <hr className={horizontalRuleClassName} />
    //     <ul className={calculatedSidebarListItemsContainerClassName}>
    //         {sidebarCalculatedListItems.map((sidebarListItem: ISidebarListItem, i: number) => {
    //             return <SideBarListItem key={i} sidebarListItem={sidebarListItem} />
    //         })}
    //     </ul>
    //     <DefaultButton styles={logoutButtonStyles}
    //         iconProps={{ iconName: 'PowerButton' }}
    //         text='Logout'
    //         onClick={() => { setIsLogoutDialogHidden(false) }} />
    //     <CustomDialog mainText='Are you sure you want to logout?'
    //         isHidden={isLogoutDialogHidden}
    //         handleCloseDialog={handleCloseDialog}
    //         acceptedText="Yes"
    //         cancelText='Cancel' />
    // </div>
    return <div>
    
        <div className='navigation'>
            {sidebarListItems.map((sidebarListItem: ISidebarListItem, i: number) => {
                return <SideBarListItem key={i}
                    isToggleActive={isToggleActive}
                    sidebarListItem={sidebarListItem} />
            })}
        </div>
        <div className='toggle'>
            <IconButton iconProps={!isToggleActive ? { iconName: "GlobalNavButton" } : { iconName: 'Cancel' }}
                styles={!isToggleActive ? inActiveIconButtonStyles : activeIconButtonStyles} />
        </div>

        <CustomDialog mainText='Are you sure you want to logout?'
            isHidden={isLogoutDialogHidden}
            handleCloseDialog={handleCloseDialog}
            acceptedText="Yes"
            cancelText='Cancel' />
    </div>
};