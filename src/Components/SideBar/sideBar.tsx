import { useState } from 'react';
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
    LOGIN_PATH
} from '../../Library/constants';
import { CustomDialog } from '../CustomDialog/customDialog';
import { SideBarListItem } from '../SidebarListItem/sideBarListItem';

export const SideBar = (): JSX.Element => {
    const cookie = new Cookies();
    const [isLogoutDialogHidden, setIsLogoutDialogHidden] = useState<boolean>(true);
    const navigate: NavigateFunction = useNavigate();
    const sidebarListItems = [
        { iconName: 'Heart', text: 'My Collection', count: 100, function: () => handleSidebarNavigation('/profile') },
        { iconName: 'Trending12', text: 'Trending Movies', count: 100, function: () => handleSidebarNavigation('/profile') },
        { iconName: 'History', text: 'History', count: 100, function: () => handleSidebarNavigation('/profile') },
        { iconName: 'BarChartVertical', text: 'Charts', function: () => handleSidebarNavigation('/profile') },
        { iconName: 'Calendar', text: 'Watch Later', function: () => handleSidebarNavigation('/profile') },
    ];
    const sidebarCalculatedListItems = [
        { iconName: 'Touch', text: 'Recommendations', function: () => handleSidebarNavigation('/profile') },
        { iconName: 'FavoriteList', text: 'Top Genres', function: () => handleSidebarNavigation('/profile') },
        { iconName: 'Flashlight', text: 'Arist Of The Month', function: () => handleSidebarNavigation('/profile') },
    ];

    const handleSidebarNavigation = (page: string): void => {
        navigate(page);
    };
    const handleLogout = (): void => {
        cookie.remove(JWT_TOKEN);
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