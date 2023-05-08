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
    ICalloutContentStyles,
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
            border: `2px solid rgb(37, 65, 104)`,
            borderBottom: 'none',
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '3vh 1.5vw 1.5vh 1.5vw',
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
export const pressForMoreIconButtonStyles: Partial<IButtonStyles> = {
    root: {
        marginLeft: '1vw',
        backgroundColor: 'transparent',
    },
    rootHovered: {
        color: 'rgb(61,87,116)',
        backgroundColor: 'transparent',
    },
    rootPressed: {
        backgroundColor: 'transparent',
    },
    icon: {
        fontSize: '20px'
    }
};
export const choiceGroupIconButtonStyles: Partial<IButtonStyles> = {
    root: {
        backgroundColor: 'transparent',
        color: "#769bce",
    }
};
export const releaseDateSpinButtonsContainerClassName: string = mergeStyles({
    display: 'flex',
    marginLeft: '-1vw',
    marginTop: '1.5vh'
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
        borderBottom: '2px solid black',
        width: '17.5vw',
        background: 'transparent',
        color: 'white',
    },
    dropdown: {
        color: 'white',
        selectors: {
            ":hover": {
                color: 'white'
            },
            ":focus::after": {
                color: 'white',
                border: '2px solid rgb(37, 65, 104)'
            },
            ':hover.ms-Dropdown-title': {
                color: 'white'
            }
        }
    },
    title: {
        background: '#212121',
        color: 'white',
        selectors: {
            ':hover': {
                color: 'white'
            }
        }
    },
};
export const buttonContainerClassName: string = mergeStyles({
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    marginTop: '2.5vh',
    marginLeft: '2vw',
    gridGap: '3vw',
    justifyContent: 'start'
});
export const buttonStyles: Partial<IButtonStyles> = {
    root: {
        borderRadius: '5px',
        border: "none",
        color: 'white'
    },
    rootPressed: {
        background: '#5f5f5f'
    }
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
            '.ms-SearchBox-icon': {
                color: '#769bce'
            }
        }
    },
    clearButton: {
        display: 'none'
    }
};
export const calloutTootltipStyles: Partial<ICalloutContentStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
        width: 'auto',
        height: 'auto',
    },
    beak: {
        display: 'none',
    },
    container: {
        opacity: '0.8',
    }
};
export const orderByOptionsRootClassName: string = mergeStyles(
    {
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none'
    }
);