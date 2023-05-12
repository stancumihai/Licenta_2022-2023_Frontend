import { createContext, PropsWithChildren, useState } from 'react';
import { IUiContext } from './uiContext.types';

const UiContext: React.Context<IUiContext> = createContext<IUiContext>({
    shouldDisplayNavbar: false,
    setNavbarState: () => { },
    shouldDisplaySideBar: false,
    setSideBarState: () => { },
});

export const UIContextProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const [shouldDisplayNavbar, setShouldShouldDisplayNavbar] = useState<boolean>(true);
    const [shouldDisplaySideBar, setShouldDisplaySideBar] = useState<boolean>(true);

    const setNavbarState = (flag: boolean) => {
        setShouldShouldDisplayNavbar(flag);
    };

    const setSideBarState = (flag: boolean) => {
        setShouldDisplaySideBar(flag);
    };

    return (<UiContext.Provider value={{
        shouldDisplayNavbar,
        shouldDisplaySideBar,
        setNavbarState,
        setSideBarState
    }}> {children} </UiContext.Provider>);
};

export default UiContext;