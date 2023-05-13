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
    setSpinnerState: () => { }
});

export const UIContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const [shouldDisplayNavbar, setShouldShouldDisplayNavbar] = useState<boolean>(true);
    const [shouldDisplaySideBar, setShouldDisplaySideBar] = useState<boolean>(true);
    const [shoudDisplaySearch, setShouldDisplaySearch] = useState<boolean>(true);
    const [shouldDisplaySpinner, setShouldDisplaySpinner] = useState<boolean>(true);

    const setNavbarState = (flag: boolean) => {
        setShouldShouldDisplayNavbar(flag);
    };

    const setSideBarState = (flag: boolean) => {
        setShouldDisplaySideBar(flag);
    };

    const setSearchState = (flag: boolean) => {
        setShouldDisplaySearch(flag);
    };

    const setSpinnerState = (flag: boolean) => {
        setShouldDisplaySpinner(flag);
    };

    return (<UiContext.Provider value={{
        shouldDisplayNavbar,
        shouldDisplaySideBar,
        shoudDisplaySearch,
        shouldDisplaySpinner,
        setNavbarState,
        setSideBarState,
        setSearchState,
        setSpinnerState
    }}> {children} </UiContext.Provider>);
};

export default UiContext;