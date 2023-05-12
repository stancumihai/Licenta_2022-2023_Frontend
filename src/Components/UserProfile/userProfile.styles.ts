import {
    IDatePickerStyles,
    IDialogStyles,
    mergeStyles
} from 'office-ui-fabric-react';
import {
    COLOR1,
    COLOR2,
    COLOR2_D_20,
    COLOR2_D_40,
    FONT_FAMILY
} from '../../Library/constants';
import {
    IButtonStyles,
    ITextFieldStyles
} from '@fluentui/react';

export const containerClassName: string = mergeStyles({
    height: 'inherit',
});

export const contentClassName: string = mergeStyles({
    width: '22.5%',
    height: "70%",
    margin: 'auto',
    transform: 'translate(0%, 35%)',
    boxSizing: 'border-box',
    backdropFilter: 'blur(5px)',
    padding: '2%',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
});

export const labelClassName: string = mergeStyles({
    color: 'white',
    fontFamily: FONT_FAMILY,
    marginLeft: '15%',
    marginTop: '3vh'
});

export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        left: '11px',
        width: '80%',
        margin: 'auto',
        borderRadius: '10px'
    },
    field: {
        color: COLOR1,
        borderRadius: '2px',
        fontFamily: FONT_FAMILY,
        background: 'transparent',
    },
    wrapper: {
        background: 'transparent',
        border: 'none',
        selectors: {
            ':after': {
                borderBottom: `none`
            }
        }
    },
    fieldGroup: {
        border: 'none',
        background: 'transparent',
        boxSizing: 'border-box',
        height: '4vh',
        borderBottom: `2px solid ${COLOR2_D_20}`,
        ':hover': {
            borderBottom: `2px solid ${COLOR2_D_20}`,
        }
    }
};

export const goBackIconStyles: Partial<IButtonStyles> = {
    root: {
        position: 'absolute',
        marginLeft: '5vw',
        marginTop: '5vh',
        backgroundColor: 'transparent',
        color: 'white'
    },
    rootHovered: {
        color: COLOR2,
        backgroundColor: 'transparent',
    },
    rootPressed: {
        color: COLOR2_D_20,
        backgroundColor: 'transparent',
    },
    icon: {
        fontSize: '25px'
    }
};

export const homePageTextClassName: string = mergeStyles({
    color: 'white',
    display: 'inline',
    position: 'absolute',
    marginTop: '5vh',
    marginLeft: '7.5vw',
    fontSize: '30px',
    fontFamily: FONT_FAMILY,
    selectors: {
        ':hover': {
            color: COLOR2,
        }
    }
});

export const editButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: COLOR1,
        border: 'none',
        fontFamily: FONT_FAMILY,
        background: COLOR2,
        width: '4vw',
        height: '4vh',
        margin: '10% 5% 0 15%',
    },
    rootHovered: {
        color: COLOR1,
        background: COLOR2_D_20
    },
    rootPressed: {
        color: COLOR1,
        background: COLOR2_D_40
    }
};

export const saveSettingsButtonStyles: Partial<IButtonStyles> = {
    root: {
        width: '4vw',
        height: '4vh',
        border: 'none',
        fontFamily: FONT_FAMILY,
        background: COLOR1,
        margin: '10% 5% 0 15%',
    },
    rootHovered: {
        background: COLOR1
    },
    rootPressed: {
        background: COLOR1
    }
};

export const profileSettingsTitleClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: 'white',
    marginLeft: '5%',
    marginBottom: '20%'
});

export const dialogStyles: Partial<IDialogStyles> = {
    main: {
        maxWidth: 450,
        borderTop: `4px solid ${COLOR2}`
    }
};

export const acceptedButtonStyles: Partial<IButtonStyles> = {
    root: {
        marginTop: '3.5vh',
        color: 'white',
        background: COLOR2
    },
    rootHovered: {
        color: 'white',
        background: COLOR2_D_20
    },
    rootPressed: {
        color: 'white',
        background: COLOR2_D_40
    }
};

export const datePickerStyles: Partial<IDatePickerStyles> = {
    textField: {
        width: '80%',
        left: '4vh'
    },
    callout: {
        color: COLOR1,
        fontFamily: FONT_FAMILY
    },
};

export const datePickerTextFieldStyles: Partial<ITextFieldStyles> = {
    fieldGroup: {
        height: '4vh',
        background: "transparent",
        selectors: {
            '[data-icon-name="Calendar"]': {
                color: COLOR1,
                pointerEvents: 'none'
            },
            '.ms-TextField-field': {
                border: 'none'
            },
            '.ms-TextField-field::after': {
                border: 'none'
            }
        }
    },
    field: {
        color: COLOR1,
        fontFamily: FONT_FAMILY
    },
    wrapper: {
        borderBottom: `2px solid ${COLOR2_D_20}`,
        selectors: {
            ':after': {
                borderBottom: `2px solid ${COLOR2_D_20}`
            },
            ':hover': {
                borderBottom: `2px solid ${COLOR2_D_20}`
            }
        },
    }
};

export const roundedImageClassName: string = mergeStyles({
    width: '200px',
    height: '200px',
    borderRadius: '100%',
    opacity: "0.7",
    position: 'absolute',
    transform: 'rotate(65deg)',
    top: '72%',
    left: '37.5%'
});

export const roundedContainerImageClassName: string = mergeStyles({
    position: "absolute"
});

export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        position: "absolute",
        left: '43%',
        top: '10vh',
        backgroundColor: 'transparent',
        color: COLOR2
    },
    rootHovered: {
        backgroundColor: 'transparent',
    },
    icon: {
        fontSize: '120px'
    }
};