export interface ISidebarListItem {
    iconName: string;
    text: string;
    count?: number;
    handleSidebarNavigation: () => void;
};