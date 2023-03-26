import { IButtonStyles, mergeStyles } from '@fluentui/react';

export const sidebarListItemClassName: string = mergeStyles({
    display: 'inline-flex',
    ":hover": {
        width: '10vw',
        background: '#798cac'
    }
});

export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: 'white',
        border: 'none',
        position: 'absolute',
        left: '0.4vw',
        marginTop: '-0.4vh',
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
        fontSize: '15px'
    }
};

export const sidebarListItemTextClassName: string = mergeStyles({
    height: '4vh',
    color: 'white',
    verticalAlign: 'center',
    width: '40%',
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
    width: '0.3vw',
    marginLeft: '-6vw'
});
