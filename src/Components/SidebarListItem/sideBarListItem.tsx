import { IconButton } from '@fluentui/react';
import {
    activeSideBarListItemClassName,
    countSidebarListItemClassName,
    dummySidebarItemDivClassName,
    iconButtonStyles,
    sidebarListItemClassName,
    sidebarListItemTextClassName
} from './sideBarListItem.styles';
import { ISidebarListItemProps } from './sideBarListItem.types';
import { useEffect, useState } from 'react';

export const SideBarListItem = (props: ISidebarListItemProps): JSX.Element => {
    const [dataCount, setDataCount] = useState<number | undefined>(undefined);
    const getUrlPage = (): string => {
        const page: string = window.location.href.split('/')[4];
        if (page === undefined) {
            return "";
        }
        return page;
    };

    useEffect(() => {
        if(props.sidebarListItem.function2 === undefined){
            return;
        }
        const pageUrl: string = getUrlPage();
        const dataCount: number = props.sidebarListItem.function2!(pageUrl);
        setDataCount(dataCount);
        return;
    }, []);

    const handleMouseEnterSidebarItem = (ev: any) => {
        const activeDiv = $($(ev.target).parent()[0]).find('div')[1];
        if (!activeDiv.classList.contains(activeSideBarListItemClassName)) {
            activeDiv.classList.add(activeSideBarListItemClassName);
        }
    };

    const handleOnMouseLeaveSidebarItem = (ev: any) => {
        const activeDiv = $($(ev.target).parent()[0]).find('div')[1];
        if (activeDiv.classList.contains(activeSideBarListItemClassName)) {
            activeDiv.classList.remove(activeSideBarListItemClassName);
        }
    };

    return <div key={props.sidebarListItem.text}
        className={sidebarListItemClassName}
        onClick={props.sidebarListItem.function}>
        <IconButton styles={iconButtonStyles}
            iconProps={{ iconName: props.sidebarListItem.iconName }} />
        <li className={sidebarListItemTextClassName}
            onClick={props.sidebarListItem.function}
        >{props.sidebarListItem.text}</li>
        <div onMouseEnter={handleMouseEnterSidebarItem}
            onMouseLeave={handleOnMouseLeaveSidebarItem}
            className={dummySidebarItemDivClassName}></div>
        <div></div>
        <li className={countSidebarListItemClassName} >{dataCount !== undefined ? dataCount : undefined}</li>
    </div>
};