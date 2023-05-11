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
    IChoiceGroupOptionStyles,
    IDropdownStyles,
    IModalStyles,
    ISpinButtonStyles
} from 'office-ui-fabric-react';
import {
    COLOR1,
    COLOR1_D_20,
    COLOR1_D_40,
    COLOR2,
    COLOR2_D_20,
    COLOR2_D_40,
    FONT_FAMILY
} from '../../Library/constants';

const theme = getTheme();
export const modalStyles: Partial<IModalStyles> = {
    main: {
        background: 'linear-gradient(90deg, rgba(18,19,36,1) 0%, rgba(28,28,66,1) 49%, rgba(38,29,57,1) 100%)',
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
            border: `3px solid ${COLOR2_D_20}`,
            borderBottom: 'none',
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '3vh 1.5vw 1.5vh 1.5vw',
        },
    ],
    heading: {
        fontFamily: FONT_FAMILY,
        color: 'white',
        fontWeight: FontWeights.semibold,
        fontSize: 'inherit',
    },
    body: {
        border: `3px solid ${COLOR2_D_20}`,
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
        color: COLOR2_D_20,
        marginLeft: '5vw',
        backgroundColor: 'transparent',
        marginTop: '-3vh',
    },
    rootHovered: {
        color: COLOR2_D_40,
        backgroundColor: 'transparent',
    },
    rootPressed: {
        color: COLOR2_D_20,
        backgroundColor: 'transparent',
    }
};
export const pressForMoreIconButtonStyles: Partial<IButtonStyles> = {
    root: {
        marginLeft: '1vw',
        top: '15px',
        color: COLOR2,
        backgroundColor: 'transparent',
    },
    rootHovered: {
        color: COLOR2_D_20,
        backgroundColor: 'transparent',
    },
    rootPressed: {
        color: COLOR2_D_40,
        backgroundColor: 'transparent',
    },
    icon: {
        fontSize: '20px'
    }
};
export const choiceGroupIconButtonStyles: Partial<IButtonStyles> = {
    root: {
        backgroundColor: 'transparent',
        color: COLOR2_D_20,
    }
};
export const releaseDateSpinButtonsContainerClassName: string = mergeStyles({
    display: 'flex',
    marginLeft: '-1vw',
    fontFamily: FONT_FAMILY,
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
                borderBottom: `2px solid ${COLOR2_D_20}`
            },
            ':hover::after': {
                border: "none",
                borderBottom: `2px solid ${COLOR2_D_40}`
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
    marginTop: '10px',
    fontFamily: FONT_FAMILY
});
export const choiceGroupStyles: Partial<IChoiceGroupStyles> = {
    root: {
        display: 'flex',
        marginLeft: "10.5vw",
        position: 'relative'
    },
    label: {
        borderColor: 'red'
    },
    flexContainer: {
        display: 'flex',
    }
};
export const choiceGroupOptionStyle: Partial<IChoiceGroupOptionStyles> = {
    field: {
        selectors: {
            ':hover .ms-ChoiceFieldLabel': {
                color: 'white'
            },
            ':before': {
                borderColor: 'none'
            },
            ':after': {
                backgroundColor: COLOR2,
                borderColor: COLOR2_D_40
            },
            ':hover::after': {
                backgroundColor: COLOR2
            }
        }
    }
};
export const dropdownStyles: Partial<IDropdownStyles> = {
    root: {
        border: 'none',
        borderBottom: `2px solid ${COLOR2_D_20}`,
        width: '17.5vw',
        color: 'white',
    },
    dropdown: {
        fontFamily: FONT_FAMILY,
        color: 'white',
        border: 'none',
        selectors: {
            ":hover": {
                color: 'white',
                border: 'none',
            },
            ":focus::after": {
                color: 'white',
                border: 'none',
            },
            ':hover.ms-Dropdown-title': {
                color: 'white'
            }
        }
    },
    title: {
        background: 'transparent',
        color: 'white',
        border: 'none',
        selectors: {
            ':hover': {
                color: 'white',
                border: 'none',
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
        background: COLOR2_D_20,
        borderRadius: '5px',
        border: "none",
        color: 'white'
    },
    rootHovered: {
        background: COLOR2_D_40,
        color: 'white'
    },
    rootPressed: {
        background: COLOR2_D_20,
        color: 'white'
    }
};

export const resetButtonStyles: Partial<IButtonStyles> = {
    root: {
        background: COLOR1,
        borderRadius: '5px',
        border: "none",
        color: 'black'
    },
    rootHovered: {
        background: COLOR1_D_20
    },
    rootPressed: {
        background: COLOR1_D_40
    }
};

export const searchBoxStyle: Partial<ISearchBoxStyles> = {
    root: {
        marginBottom: '10px',
        background: 'transparent',
        border: 'none',
        borderBottom: `2px solid ${COLOR2_D_20}`,
        maxWidth: '100%',
        selectors: {
            ":after": {
                border: 'none',
            },
            ":hover": {
                border: 'none',
                borderBottom: `2px solid ${COLOR2_D_40} `
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
                color: COLOR2_D_20
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
        pointerEvents: 'none',
    }
);