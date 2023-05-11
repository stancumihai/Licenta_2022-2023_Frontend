import { IButtonStyles, mergeStyles } from 'office-ui-fabric-react';
import { COLOR1, COLOR1_D_40, COLOR2, COLOR2_D_20, COLOR2_D_40, COLOR3 } from '../../Library/constants';

export const sidebarContainerClassName: string = mergeStyles({
    // position: 'fixed',
    // maxWidth: '17.5%',
    // height: '100vh',
    //background: '#484874',
});

export const containerClassName: string = mergeStyles({
    listStyleType: 'none',
    display: 'flex',
    maxWidth: '15%',
    height: '35%',
    flexFlow: 'column wrap',
    justifyContent: 'space-evenly',
});

export const horizontalRuleClassName: string = mergeStyles({
    maxWidth: '12vw',
    marginLeft: '0'
});

export const calculatedSidebarListItemsContainerClassName: string = mergeStyles({
    listStyleType: 'none',
    display: 'flex',
    maxWidth: '15%',
    height: '25%',
    flexFlow: 'column wrap',
    justifyContent: 'space-evenly',
});

export const sidebarIconButtonStyles: Partial<IButtonStyles> = {
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

export const inActiveIconButtonStyles: Partial<IButtonStyles> = {
    root: {
        backgroundColor: COLOR2,
        borderRadius: '10px',
        width: '50px',
        height: '50px',
        marginLeft: '-8vw'
    },
    rootHovered: {
        backgroundColor: COLOR2_D_20,
        borderRadius: '10px',
        width: '50px',
        height: '50px'
    },
    rootPressed: {
        backgroundColor: COLOR2_D_40,
        borderRadius: '10px',
        width: '50px',
        height: '50px'
    },

    icon: {
        color: 'white',
        fontSize: '30px',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export const activeIconButtonStyles: Partial<IButtonStyles> = {
    root: {
        backgroundColor: COLOR1_D_40,
        borderRadius: '10px',
        width: '50px',
        height: '50px',
        marginLeft: '-8vw'
    },
    rootHovered: {
        backgroundColor: COLOR1_D_40,
        borderRadius: '10px',
        width: '50px',
        height: '50px'
    },
    rootPressed: {
        backgroundColor: COLOR1_D_40,
        borderRadius: '10px',
        width: '50px',
        height: '50px'
    },

    icon: {
        color: 'white',
        fontSize: '30px',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export const logoutButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: 'white',
        border: 'none',
        position: 'absolute',
        backgroundColor: 'transparent',
        left: '-0.2vw',
    },
    rootHovered: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: '10px',
        transition: '0.3s'
    },
    rootPressed: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    icon: {
        transition: '0.5s',
        color: 'white',
        fontSize: '20px',
        selectors: {
            ":hover": {
                transition: '0.5s',
                color: '#5149DB',
                fontSize: '22px'
            }
        }
    },
    textContainer: {
        transition: '0.5s',
        fontSize: '18px',
        marginLeft: '5px',
        selectors: {
            ":hover": {
                transition: '0.5s',

                color: '#5149DB',
                fontSize: '20px'
            }
        }
    }
};