
export interface IPaginatorProps {
    itemsPerPage: number;
    totalItemsCount: number;
    onPageChange: (selectedPageIndex: number) => void;
    isPageEdited: boolean;
    loadFromPage: boolean;
};