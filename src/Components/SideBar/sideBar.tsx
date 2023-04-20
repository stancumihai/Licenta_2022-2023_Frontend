import { useEffect, useState } from 'react';
import { ISidebarListItem } from '../../UiModels/ISidebarListItem';
import {
    containerClassName,
    horizontalRuleClassName,
    calculatedSidebarListItemsContainerClassName,
    logoutButtonStyles,
} from './sideBar.styles';
import {
    NavigateFunction,
    useNavigate
} from 'react-router';
import { DefaultButton } from 'office-ui-fabric-react';
import Cookies from 'universal-cookie';
import {
    JWT_TOKEN,
    REFRESH_TOKEN,
    LOGIN_PATH,
    WATCH_LATER_PATH,
    MY_COLLECTION_PATH,
    TRENDING_PATH,
    MY_HISTORY_PATH,
    CHARTS_PATH,
    RECOMMENDATIONS_PATH,
    TOP_GENRES_PATH,
    ARTISTS_OF_THE_MONTH_PATH,
    HOME_PATH
} from '../../Library/constants';
import { CustomDialog } from '../CustomDialog/customDialog';
import { SideBarListItem } from '../SidebarListItem/sideBarListItem';
import { ISidebarProps } from './sideBar.types';

export const SideBar = (props: ISidebarProps): JSX.Element => {
    const cookie = new Cookies();
    const [isLogoutDialogHidden, setIsLogoutDialogHidden] = useState<boolean>(true);
    const navigate: NavigateFunction = useNavigate();

    const sidebarListItems = [
        { iconName: 'Home', text: 'Home', count: 100, function: () => handleSidebarNavigation(HOME_PATH) },
        { iconName: 'Heart', text: 'My Collection', count: 100, function: () => handleSidebarNavigation(MY_COLLECTION_PATH), function2: () => handleSendDataCount(MY_COLLECTION_PATH) },
        { iconName: 'Trending12', text: 'Trending Movies', count: 100, function: () => handleSidebarNavigation(TRENDING_PATH), function2: () => handleSendDataCount(TRENDING_PATH) },
        { iconName: 'History', text: 'History', count: 100, function: () => handleSidebarNavigation(MY_HISTORY_PATH), function2: () => handleSendDataCount(MY_HISTORY_PATH) },
        { iconName: 'BarChartVertical', text: 'Charts', function: () => handleSidebarNavigation(CHARTS_PATH) },
        { iconName: 'Calendar', text: 'Watch Later', function: () => handleSidebarNavigation(WATCH_LATER_PATH), function2: () => handleSendDataCount(WATCH_LATER_PATH) },
    ];
    const sidebarCalculatedListItems: ISidebarListItem[] = [
        { iconName: 'Touch', text: 'Recommendations', function: () => handleSidebarNavigation(RECOMMENDATIONS_PATH) },
        { iconName: 'FavoriteList', text: 'Top Genres', function: () => handleSidebarNavigation(TOP_GENRES_PATH) },
        { iconName: 'Flashlight', text: 'Arists Of The Month', function: () => handleSidebarNavigation(ARTISTS_OF_THE_MONTH_PATH) },
    ];

    const handleSendDataCount = (page: string): number => {
        if (props.countMapper !== undefined) {
            switch (page) {
                case MY_COLLECTION_PATH: {
                    return props.countMapper!.collectionCount;
                }
                case TRENDING_PATH: {
                    return 1000;
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
            navigate(-1);
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
    return <>
        <ul className={containerClassName}>
            {sidebarListItems.map((sidebarListItem: ISidebarListItem, i: number) => {
                return <SideBarListItem key={i}
                    sidebarListItem={sidebarListItem} />
            })}
        </ul>
        <hr className={horizontalRuleClassName} />
        <ul className={calculatedSidebarListItemsContainerClassName}>
            {sidebarCalculatedListItems.map((sidebarListItem: ISidebarListItem, i: number) => {
                return <SideBarListItem key={i} sidebarListItem={sidebarListItem} />
            })}
        </ul>
        <DefaultButton styles={logoutButtonStyles}
            iconProps={{ iconName: 'PowerButton' }}
            text='Logout'
            onClick={() => { setIsLogoutDialogHidden(false) }} />
        <CustomDialog isHidden={isLogoutDialogHidden}
            handleCloseDialog={handleCloseDialog}
            acceptedText="Yes"
            cancelText='Cancel' />
    </>
};