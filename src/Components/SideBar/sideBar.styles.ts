import { IButtonStyles, mergeStyles } from 'office-ui-fabric-react';

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