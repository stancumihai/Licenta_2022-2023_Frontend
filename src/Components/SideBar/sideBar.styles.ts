import { IButtonStyles, mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    listStyleType: 'none',
    display: 'flex',
    maxWidth: '20%',
    height: '35%',
    flexFlow: 'column wrap',
    justifyContent: 'space-evenly',
});

export const sidebarListItemTextClassName: string = mergeStyles({
    height: '4vh',
    color: 'white',
    verticalAlign: 'center',
    width: '40%',
    justifyContent: 'center'
});

export const horizontalRuleClassName: string = mergeStyles({
    maxWidth: '12vw',
    marginLeft: '0'
});

export const sidebarListItemClassName: string = mergeStyles({
    display: 'inline-flex',
    ":hover": {
        width: '10vw',
        background: '#798cac'
    }
});

export const dummySidebarItemDivClassName: string = mergeStyles({
    width: '20%',
    height: '40px',
    position: "fixed",
    marginLeft: '-10vw'
});

export const activeSideBarListItemClassName: string = mergeStyles({
    backgroundColor: '#2893ff',
    width: '0.3vw',
    marginLeft: '-6vw'
});

export const calculatedSidebarListItemsContainerClassName: string = mergeStyles({
    listStyleType: 'none',
    display: 'flex',
    maxWidth: '20%',
    height: '25%',
    flexFlow: 'column wrap',
    justifyContent: 'space-evenly',
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
        fontSize: '15px',
    }
};
export const logoutButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: 'white',
        border: 'none',
        position: 'absolute',
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
        fontSize: '15px',
    }
};