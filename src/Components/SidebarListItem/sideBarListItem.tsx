import { IconButton } from '@fluentui/react';
import { activeSideBarListItemClassName, countSidebarListItemClassName, dummySidebarItemDivClassName, iconButtonStyles, sidebarListItemClassName, sidebarListItemTextClassName } from './sideBarListItem.styles';
import { ISidebarListItemProps } from './sideBarListItem.types';

export const SideBarListItem = (props: ISidebarListItemProps): JSX.Element => {
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
        <IconButton
            styles={iconButtonStyles}
            iconProps={{ iconName: props.sidebarListItem.iconName }} />
        <li className={sidebarListItemTextClassName}>{props.sidebarListItem.text}</li>
        <div onMouseEnter={handleMouseEnterSidebarItem}
            onMouseLeave={handleOnMouseLeaveSidebarItem}
            className={dummySidebarItemDivClassName}></div>
        <div></div>
        <li className={countSidebarListItemClassName} >{props.sidebarListItem.count}</li>
    </div>
};