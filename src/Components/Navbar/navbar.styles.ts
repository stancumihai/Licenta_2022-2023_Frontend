import { IButtonStyles, ITextFieldStyles, mergeStyles } from 'office-ui-fabric-react';
import { COLOR1, COLOR2, FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    padding: '2vh',
    position: 'relative',
    right: '-25%',
    maxWidth: '75vw',
    maxHeight: '10vh',
    height: '10vh',
    top: '1vh'
});

export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        border: 'none',
        marginLeft: '-6.3vw',
        width: '17.5%',
        selectors: {
            "::after": {
                border: 'none',
            }
        },
    },
    fieldGroup: {
        background: COLOR1,
        borderRadius: '25px',
        border: 'none',
        selectors: {
            ':after': {
                border: 'none',
                cursor: "grab"
            }
        }
    },
    field: {
        color: 'black',
        borderRadius: '25px',
        marginLeft: '4vh',
        fontFamily: FONT_FAMILY,
    },
    icon: {
        marginRight: '11.5vw',
        width: '0'
    }
};

export const iconProps = {
    iconName: 'Search',
    style: { opacity: 100, color: 'black', cursor: 'pointer' }
};

export const advancedSearchIconClassName: string = mergeStyles({
    transition: '0.5s',
    display: "inline-block",
    color: COLOR1,
    marginTop: '0.5vh',
    fontSize: '25px',
    marginLeft: "3vw",
    selectors: {
        ":hover": {
            marginTop: '0',
            color: COLOR2,
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
        color: COLOR1,
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
        color: COLOR2,
        marginTop: '0',
        transition: '0.5s',
        fontSize: '25px',
        marginLeft: "1.2vw",
    },
    rootPressed: {
        backgroundColor: 'transparent',
    },
    rootDisabled: {
        pointerEvents: 'none',
        backgroundColor: 'transparent',
    }
};

