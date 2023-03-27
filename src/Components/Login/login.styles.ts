import { getTheme, IButtonStyles, ICheckboxStyles, IIconProps, ITextFieldStyles, mergeStyleSets } from '@fluentui/react';
import { mergeStyles } from '@fluentui/react';
import { FONT_FAMILY, LOGIN_INPUTS_COLOR } from '../../Library/constants';

export const containerLoginClassName: string = mergeStyles({
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

export const textErrorFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
        border: 'none',
        color: 'white',
        padding: '15px 15px 10px 10px',
        marginBottom: '10px',
    },
    fieldGroup: {
        fontFamily: FONT_FAMILY,
        border: 'none',
        height: '6vh'
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
    errorMessage: {
        position: 'fixed'
    }
};

export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
        border: 'none',
        color: 'white',
        padding: '15px 15px 10px 10px',
        marginBottom: '10px',
    },
    fieldGroup: {
        fontFamily: FONT_FAMILY,
        border: 'none',
        height: '6vh',
        selectors: {
            "::after": {
                border: '2px solid rgb(81, 73, 219)',
            }
        }
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
    errorMessage: {
        position: 'fixed'
    }
};

export const loginButtonStyles: Partial<IButtonStyles> = {
    root: {
        top: '5vh',
        fontFamily: FONT_FAMILY,
        width: '8vw',
        height: '4.5vh',
        left: '27%',
        backgroundColor: '#5149DB',
        color: 'white',
        borderRadius: '25px',
        border: 'none',
    },
    rootHovered: {
        backgroundColor: '#5149DB',
        // backgroundColor: '#857fe5',
        // backgroundColor: '#a7a3ed',
        color: 'white'
    },
    rootPressed: {
        backgroundColor: '#a7a3ed',
        color: 'white'
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

export const forgotPasswordStyles: Partial<IButtonStyles> = {
    root: {
        position: 'absolute',
        display: 'block',
        bottom: '1.25vh',
        border: 'none',
        color: 'white',
        background: 'transparent',
        fontFamily: FONT_FAMILY,
        left: '5.5vw'
    },
    rootHovered: {
        color: 'gray',
        background: 'transparent',
        fontFamily: FONT_FAMILY,
    },
    rootPressed: {
        color: 'white',
        background: 'transparent',
        fontFamily: FONT_FAMILY
    }
};

export const emailAddressIconClassName: string = mergeStyles({
    display: 'block',
    position: 'absolute',
    bottom: '33.5vh',
    left: '15vw',
    width: '22.5px',
    top: '19.75vh'
});

export const passwordIconClassName: string = mergeStyles({
    display: 'block',
    position: 'absolute',
    left: '15vw',
    width: '22.5px',
    top: '29.5vh'
});

export const headerButtonsClassName: string = mergeStyles({
    position: 'relative',
    marginBottom: '2vh',
    marginTop: '3vh',
    top: '2vh',
    left: '1vw',
});

export const loginHeaderButtonStyles: Partial<IButtonStyles> = {
    root: {
        marginRight: '0.5vw',
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

export const signUpHeaderButtonStyles: Partial<IButtonStyles> = {
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

export const errorClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: '#945564',
    display: 'block',
    position: 'absolute',
    left: '3vw',
    top: '38vh'
});