
export interface IPaginatorProps {
    itemsPerPage: number;
    totalItemsCount: number;
    onPageChange: (selectedPageIndex: number, sentFromSearch: boolean, loadMoviesFromPage?: boolean) => void;
    isPageEdited: boolean;
    loadFromPage: boolean;
};