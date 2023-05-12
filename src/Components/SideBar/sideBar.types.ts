import { ICountMapper } from '../HomePage/homePage.types';

export interface ISidebarListItem {
    iconName: string;
    text: string;
    handleNavigation: () => void;
};