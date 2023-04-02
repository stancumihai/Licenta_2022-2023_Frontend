import {
    FontWeights,
    IButtonStyles,
    IChoiceGroupStyles,
    IIconProps,
    ISearchBoxStyles,
    getTheme,
    mergeStyleSets,
    mergeStyles
} from '@fluentui/react';
import {
    IDropdownStyles,
    IModalStyles,
    ISpinButtonStyles
} from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';

const theme = getTheme();
export const modalStyles: Partial<IModalStyles> = {
    main: {
        background: '#212121'
    }
};
export const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            border: `4px solid rgb(37, 65, 104)`,
            borderBottom: 'none',
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    heading: {
        color: 'white',
        fontWeight: FontWeights.semibold,
        fontSize: 'inherit',
    },
    body: {
        border: `4px solid rgb(37, 65, 104)`,
        borderTop: 'none',
        flex: '4 4 auto',
        padding: '0 1.5vw 3vh 1.5vw',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
});
export const cancelIcon: IIconProps = { iconName: 'Cancel' };
export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        marginLeft: '5vw',
        backgroundColor: 'transparent',
        marginTop: '-3vh',
    },
    rootHovered: {
        color: 'rgb(61,87,116)',
        backgroundColor: 'transparent',
    },
    rootPressed: {
        backgroundColor: 'transparent',
    }
};
export const choiceGroupIconButtonStyles: Partial<IButtonStyles> = {
    root: {
        backgroundColor: 'transparent',
        color: "#769bce"
    },
    rootHovered: {
        color: 'rgb(61,87,116)',
        backgroundColor: 'transparent',
    },
    rootPressed: {
        backgroundColor: 'transparent',
    }
};
export const releaseDateSpinButtonsContainerClassName: string = mergeStyles({
    display: 'flex',
    marginLeft: '-1vw'
});
export const spinButtonStyles: Partial<ISpinButtonStyles> = {
    root: {
        width: "7.5vw",
        border: "none",
        marginLeft: '1vw',
    },
    spinButtonWrapper: {
        border: "none",
        selectors: {
            ':after': {
                border: "none",
                borderBottom: '2px solid black'
            },
            ':hover::after': {
                border: "none",
                borderBottom: '2px solid rgb(37, 65, 104)'
            }
        }
    },
    input: {
        pointerEvents: 'none',
        backgroundColor: 'transparent',
        color: 'white'
    }
};
export const labelClassName: string = mergeStyles({
    color: 'white',
    marginTop: '10px'
});
export const choiceGroupStyles: Partial<IChoiceGroupStyles> = {
    root: {
        display: 'flex',
        marginLeft: "10.5vw",
        position: 'relative'
    },
    flexContainer: {
        display: 'flex',
    }
};
export const dropdownStyles: Partial<IDropdownStyles> = {
    root: {
        border: 'none',
        width: '17.5vw',
        background: 'transparent'
    },
    dropdown: {
        color: 'white',
        background: 'transparent',
        selectors: {
            ':hover': {
                color: 'white',
                border: 'none',
            }
        }
    },
    title: {
        background: 'transparent',
        color: 'white',
        selectors: {
            ':hover': {
                border: 'none',
            }
        }
    }
};
export const buttonClassName: string = mergeStyles({
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    marginTop: '1.5vh',
    gridGap: '3vw',
    justifyContent: 'start'
});
export const buttonStyles: Partial<IButtonStyles> = {

};

export const searchBoxStyle: Partial<ISearchBoxStyles> = {
    root: {
        background: 'transparent',
        border: 'none',
        borderBottom: '2px solid black',
        maxWidth: '100%',
        selectors: {
            ":after": {
                border: 'none',
            },
            ":hover": {
                border: 'none',
                borderBottom: '2px solid rgb(37, 65, 104)'
            }
        }
    },
    field: {
        color: "white",
        fontFamily: FONT_FAMILY,
        paddingLeft: '15px',
        fontSize: '12.5px',
    },
    iconContainer: {
        marginRight: '1vw',
        marginLeft: '0.5w',
        width: '0',
        selectors: {
            ':hover': {
                color: '#769bce'
            },
            '.ms-SearchBox-icon': {
                color: '#769bce'
            }, '.ms-SearchBox-icon::hover': {
                color: '#769bce'
            }
        }
    }
};