export interface ISidebarListItem {
    iconName: string;
    text: string;
    count?: number;
    function?: () => void;
};