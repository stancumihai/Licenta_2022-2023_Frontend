export interface ISidebarListItem {
    iconName: string;
    text: string;
    count?: number;
    handleSidebarNavigation: () => void;
    function2?: (page: string) => number;
};