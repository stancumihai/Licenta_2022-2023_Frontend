import { ISearchBoxStyles } from '@fluentui/react';
import { IButtonStyles, mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    padding: '2vh',
    position: 'relative',
    right: '-25%',
    maxWidth: '75vw',
    maxHeight: '10vh',
    height: '10vh',
    top: '1vh'
});

export const searchBoxStyles: Partial<ISearchBoxStyles> = {
    root: {
        borderRadius: '25px',
        border: 'none',
        marginLeft: '-6.3vw',
        maxWidth: '17.5%',
        width: '17.5%',
        selectors: {
            "::after": {
                border: 'none',
            }
        },
    },
    iconContainer: {
        marginRight: '1.5vw',
        marginLeft: '0.5vw',
        width: '0'
    },
    clearButton: {
        display: 'none'
    }
};

export const iconProps = {
    iconName: 'Search',
    style: { opacity: 100, color: 'black', cursor: 'pointer' }
};

export const advancedSearchIconClassName: string = mergeStyles({
    transition: '0.5s',
    display: "inline-block",
    color: 'white',
    marginTop: '0.5vh',
    fontSize: '25px',
    marginLeft: "3vw",
    selectors: {
        ":hover": {
            marginTop: '0',
            color: "#888",
            transition: '0.5s',
            fontSize: '30px',
        }
    }
});

export const searchContainer: string = mergeStyles({
    display: 'flex',
    justifyContent: 'flex-start'
});

export const iconStyles: Partial<IButtonStyles> = {
    root: {
        backgroundColor: 'transparent',
        transition: '0.5s',
        display: "inline-block",
        color: 'white',
        marginTop: '0.3vh',
        marginLeft: "1vw",
    },
    icon: {
        fontSize: '20px',
        selectors: {
            ':hover': {
                fontSize: '25px',
            }
        }
    },
    rootHovered: {
        backgroundColor: 'transparent',
        color: "#888",
        marginTop: '0',
        transition: '0.5s',
        fontSize: '25px',
        marginLeft: "1.2vw",
    },
    rootPressed: {
        backgroundColor: 'transparent',
    }
};

