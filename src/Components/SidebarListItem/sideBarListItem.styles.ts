import { IButtonStyles, mergeStyles } from '@fluentui/react';
import { FONT_FAMILY } from '../../Library/constants';

export const sidebarListItemClassName: string = mergeStyles({
    display: 'inline-flex',
    transition: '0.5s',
    fontFamily: FONT_FAMILY,
    width: "15vw",
    ":hover": {
        boxSizing: 'border-box',
        marginLeft: '10px',
        width: '9.2vw',
        background: '#667ca0'
    }
});

export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: 'white',
        border: 'none',
        position: 'absolute',
        left: '0.4vw',
        marginRight: "1vw",
        marginTop: '0.2vh',
        backgroundColor: 'transparent',
    },
    rootHovered: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    rootPressed: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    icon: {
        color: 'white',
        fontSize: '18px',
        marginRight: '-10px'
    }
};

export const sidebarListItemTextClassName: string = mergeStyles({
    marginLeft: '10px',
    height: '4vh',
    boxSizing: 'border-box',
    paddingTop: '10px',
    color: 'white',
    verticalAlign: 'center',
    width: '100%',
    justifyContent: 'center'
});

export const dummySidebarItemDivClassName: string = mergeStyles({
    width: '20%',
    height: '40px',
    position: "fixed",
    marginLeft: '-10vw'
});

export const activeSideBarListItemClassName: string = mergeStyles({
    backgroundColor: '#5149DB',
    width: '0.4vw',
    marginLeft: '-12.7vw'
});

export const countSidebarListItemClassName: string = mergeStyles({
    left: "12.5vw",
    marginTop: '1vh',
    color: 'white',
    position: 'fixed'
});