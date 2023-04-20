export interface ISidebarListItem {
    iconName: string;
    text: string;
    count?: number;
    function: () => void;
    function2?: (page: string) => number;
};