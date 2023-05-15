/* eslint-disable jsx-a11y/anchor-is-valid */
import { IconButton } from '@fluentui/react';
import {
    countSidebarListItemClassName,
    iconButtonStyles
} from './sideBarListItem.styles';
import { ISidebarListItemProps } from './sideBarListItem.types';
import './sideBarListItem.css';
import { FONT_FAMILY } from '../../Library/constants';

export const SideBarListItem = (props: ISidebarListItemProps): JSX.Element => {

    return <>
            <li key={props.sidebarListItem!.text}
                className='list'
                onClick={props.sidebarListItem!.handleSidebarNavigation}>
                <a onClick={props.sidebarListItem!.handleSidebarNavigation}>
                    <IconButton className='icon' styles={iconButtonStyles}
                        iconProps={{ iconName: props.sidebarListItem!.iconName }} />
                    <span style={{ fontFamily: FONT_FAMILY }}
                        className='title'> {props.sidebarListItem!.text}</span>
                    <p className={countSidebarListItemClassName} >
                        {props.isToggleActive ? props.sidebarListItem!.count : undefined}
                    </p>
                </a>
            </li>
    </>
};