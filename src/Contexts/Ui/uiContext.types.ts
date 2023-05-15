export interface IUiContext {
    shouldDisplayNavbar: boolean;
    setNavbarState: (flag: boolean) => void;
    shouldDisplaySideBar: boolean;
    setSideBarState: (flag: boolean) => void;
    shoudDisplaySearch: boolean;
    setSearchState: (flag: boolean) => void;
    shouldDisplaySpinner: boolean,
    setSpinnerState: (flag: boolean) => void;
    shouldRefreshPage: boolean;
    setRefreshState: (flag: boolean) => void;
};