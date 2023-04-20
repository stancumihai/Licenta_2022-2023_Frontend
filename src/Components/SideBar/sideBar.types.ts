import { ICountMapper } from '../HomePage/homePage.types';

export interface ISidebarProps {
    handleSidebarClick: (page: string) => void;
    countMapper: ICountMapper | undefined;
};

export interface ISidebarListItem {
    iconName: string;
    text: string;
    handleNavigation: () => void;
};