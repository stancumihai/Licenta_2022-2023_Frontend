import { createContext, PropsWithChildren, useState } from 'react';
import { IUiContext } from './uiContext.types';

const UiContext: React.Context<IUiContext> = createContext<IUiContext>({
    shouldDisplayNavbar: false,
    setNavbarState: () => { },
    shouldDisplaySideBar: false,
    setSideBarState: () => { },
    shoudDisplaySearch: false,
    setSearchState: () => { },
    shouldDisplaySpinner: false,
    setSpinnerState: () => { },
    shouldRefreshPage: false,
    setRefreshState: () => { },
    spinnerTime: 0
});

export const UIContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const [shouldDisplayNavbar, setShouldShouldDisplayNavbar] = useState<boolean>(true);
    const [shouldDisplaySideBar, setShouldDisplaySideBar] = useState<boolean>(true);
    const [shoudDisplaySearch, setShouldDisplaySearch] = useState<boolean>(true);
    const [shouldDisplaySpinner, setShouldDisplaySpinner] = useState<boolean>(false);
    const [shouldRefreshPage, setShouldRefreshPage] = useState<boolean>(true);
    const [spinnerTime, setSpinnerTime] = useState<number>(0);

    const setNavbarState = (flag: boolean) => {
        setShouldShouldDisplayNavbar(flag);
    };

    const setSideBarState = (flag: boolean) => {
        setShouldDisplaySideBar(flag);
    };

    const setSearchState = (flag: boolean) => {
        setShouldDisplaySearch(flag);
    };

    const setSpinnerState = (flag: boolean, spinnerTime?: number) => {
        setShouldDisplaySpinner(flag);
        if (flag) {
            setSpinnerTime(spinnerTime!);
        }
    };

    const setRefreshState = (flag: boolean) => {
        if (flag === true) {
            setShouldRefreshPage(false);
            window.location.reload();
        }
    };

    return (<UiContext.Provider value={{
        shouldDisplayNavbar,
        shouldDisplaySideBar,
        shoudDisplaySearch,
        shouldDisplaySpinner,
        shouldRefreshPage,
        setNavbarState,
        setSideBarState,
        setSearchState,
        setSpinnerState,
        setRefreshState,
        spinnerTime: spinnerTime,
    }}> {children} </UiContext.Provider>);
};

export default UiContext;