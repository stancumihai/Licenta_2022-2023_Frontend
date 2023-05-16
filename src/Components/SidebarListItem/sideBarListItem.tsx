/* eslint-disable jsx-a11y/anchor-is-valid */
import { IconButton } from '@fluentui/react';
import {
    countSidebarListItemClassName,
    iconButtonStyles
} from './sideBarListItem.styles';
import { ISidebarListItemProps } from './sideBarListItem.types';
import './sideBarListItem.css';
import { FONT_FAMILY } from '../../Library/constants';
import $ from 'jquery';

export const SideBarListItem = (props: ISidebarListItemProps): JSX.Element => {

    const handleListItemHoverTooltip = () => {
        const isNavigationActive = $('.navigation.active');
        if (isNavigationActive.length !== 0) {
            $('li.list').each((i, el) => {
                $(el).removeAttr('title');
            })
            return;
        }
        $('li.list').each((i, el) => {
            $(el).attr('title', props.sidebarListItem!.text);
        })
    };

    return <>
        <li title={props.sidebarListItem!.text} key={props.sidebarListItem!.text}
            className='list'
            onClick={props.sidebarListItem!.handleSidebarNavigation}
            onMouseEnter={handleListItemHoverTooltip}>
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