import { getTheme, IButtonStyles, ICheckboxStyles, IIconProps, ITextFieldStyles, mergeStyleSets } from '@fluentui/react';
import { mergeStyles } from '@fluentui/react';
import { FONT_FAMILY, LOGIN_INPUTS_COLOR } from '../../Library/constants';

export const containerSignUpClassName: string = mergeStyles({
    display: 'grid',
    padding: "1%",
    fontFamily: FONT_FAMILY,
    color: '#49494D',
    fontStyle: 'normal',
    position: 'absolute',
    height: '50%',
    width: '18.5%',
    border: '1px solid black',
    left: '40%',
    top: '25%',
    backgroundColor: '#0C0B0F',
});

export const backgroundImageClassName: string = mergeStyles({
    height: '100vh',
    width: '100%',
});

export const logoClassName: string = mergeStyles({
    width: '10px',
    height: '10px',
    margin: 'auto'
});

export const cancelIcon: IIconProps = { iconName: 'Cancel' };

export const theme = getTheme();

export const contentStyles = mergeStyleSets({
    container: {
        fontFamily: FONT_FAMILY,
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    heading: {
        color: theme.palette.neutralPrimary,
        fontSize: 'inherit',
        margin: '0',
    },
    body: {
        flex: '4 4 auto',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
});

export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};

export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
        border: 'none',
        color: 'white',
        padding: '15px 15px 10px 10px',
        marginBottom: '10px'
    },
    fieldGroup: {
        fontFamily: FONT_FAMILY,
        border: 'none',
        height: '6vh',
    },
    field: {
        fontFamily: FONT_FAMILY,
        paddingLeft: '15px',
        fontSize: '12.5px',
        backgroundImage: "linear-gradient(to right, #49494D, #0C0B0F)",
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
        color: 'white',
        selectors: {
            "::placeholder": {
                color: '#CCCCCC',
                fontSize: '24'
            }
        }
    },
    wrapper: {
        backgroundColor: '#0C0B0F'
    },
    revealButton: {
        border: "none",
        backgroundColor: '#49494D',
        selectors: {
            "revealIcon-122": {
                color: 'red'
            }
        }
    },
    errorMessage: {
        position: 'fixed'
    }
};

export const signUpButtonStyles: Partial<IButtonStyles> = {
    root: {
        top: '7vh',
        fontFamily: FONT_FAMILY,
        width: '8vw',
        height: '4.5vh',
        left: '27%',
        backgroundColor: '#5149DB',
        color: 'white',
        borderRadius: '25px',
        border: 'none',
    }
};

export const additionalInfoHeaderClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: LOGIN_INPUTS_COLOR,
    marginBottom: '15px',
    fontSize: '13px',
    left: "1.8vw",
    position: 'relative'
});

export const forgotPasswordClassName: string = mergeStyles({
    top: '7vh',
    fontFamily: FONT_FAMILY,
    color: 'white',
    position: 'relative',
    left: '30%',
    fontSize: '14px',
});

export const emailAddressIconClassName: string = mergeStyles({
    display: 'block',
    position: 'absolute',
    bottom: '33.5vh',
    left: '15vw',
    width: '22.5px',
});

export const passwordIconClassName: string = mergeStyles({
    display: 'block',
    position: 'absolute',
    bottom: '23.5vh',
    left: '15vw',
    width: '22.5px',
});

export const headerButtonsClassName: string = mergeStyles({
    position: 'relative',
    marginBottom: '2vh',
    marginTop: '3vh',
    top: '2vh',
    left: '1vw',
});



export const signUpHeaderButtonStyles: Partial<IButtonStyles> = {
    root: {
        right: '-0.5vw',
        fontSize: '22px',
        color: 'white',
        fontFamily: FONT_FAMILY,
        border: 'none',
        backgroundColor: 'transparent'
    },
    rootHovered: {
        color: '#CCC',
        backgroundColor: 'transparent'
    },
    rootPressed: {
        color: 'white',
        backgroundColor: 'transparent'
    }
};

export const loginHeaderButtonStyles: Partial<IButtonStyles> = {
    root: {
        fontSize: '22px',
        fontFamily: FONT_FAMILY,
        border: 'none',
        backgroundColor: 'transparent'
    },
    rootHovered: {
        backgroundColor: 'transparent'
    },
    rootPressed: {
        color: LOGIN_INPUTS_COLOR,
        backgroundColor: 'transparent'
    }
};
export const rememberMeCheckboxStyles: Partial<ICheckboxStyles> = {
    root: {
        left: '1vw',
    },
    checkbox: {
        borderRadius: '25px',
        width: '17.5px',
        height: '17.5px'
    },
    checkmark: {
    },
    text: {
        fontFamily: FONT_FAMILY
    }
};

export const containerClassName: string = mergeStyles({
    display: 'grid',
    position: 'relative'
});

export const socialMediaContainerClassName: string = mergeStyles({
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    position: 'absolute',
    left: '47.5%',
    zIndex: '100',
    top: '10px'
});

export const customIconButtonContainerClasssName: string = mergeStyles({
    pointerEvents: 'none',
});