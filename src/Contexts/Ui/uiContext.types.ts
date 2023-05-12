export interface IUiContext {
    shouldDisplayNavbar: boolean;
    setNavbarState: (flag: boolean) => void;
    shouldDisplaySideBar: boolean;
    setSideBarState: (flag: boolean) => void;
};