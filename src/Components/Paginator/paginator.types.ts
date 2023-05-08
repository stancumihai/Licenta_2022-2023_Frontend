
export interface IPaginatorProps {
    itemsPerPage: number;
    totalItemsCount: number;
    onPageChange: (selectedPageIndex: number, loadMoviesFromPage?: boolean) => void;
    isPageEdited: boolean;
    loadFromPage: boolean;
};