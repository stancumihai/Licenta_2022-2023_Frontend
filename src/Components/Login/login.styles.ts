import { getTheme, IButtonStyles, ICheckboxStyles, IIconProps, ITextFieldStyles, mergeStyleSets } from '@fluentui/react';
import { mergeStyles } from '@fluentui/react';
import { COLOR1, COLOR1_D_20, COLOR1_D_40, COLOR2, COLOR2_D_20, COLOR2_D_40, FONT_FAMILY, LOGIN_INPUTS_COLOR } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    display: 'grid',
    position: 'absolute',
    marginLeft: '-20vw'
});

export const containerLoginClassName: string = mergeStyles({
    padding: "1%",
    fontFamily: FONT_FAMILY,
    color: '#49494D',
    fontStyle: 'normal',
    position: 'absolute',
    height: '55%',
    width: '18.5%',
    left: '40%',
    top: '20%',
    backgroundColor: '#0C0B0F',
    border: `3px solid ${COLOR2_D_20}`,
    borderRadius: '10px',
    marginLeft: '5vw'
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
                border: `2px solid ${COLOR2}`,
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
        top: '10vh',
        fontFamily: FONT_FAMILY,
        width: '8vw',
        height: '4.5vh',
        left: '27%',
        backgroundColor: COLOR2,
        color: 'white',
        borderRadius: '25px',
        border: 'none',
    },
    rootHovered: {
        backgroundColor: COLOR2_D_20,
        color: 'white'
    },
    rootPressed: {
        backgroundColor: COLOR2_D_40,
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
        bottom: '2vh',
        border: 'none',
        color: COLOR1,
        background: 'transparent',
        fontFamily: FONT_FAMILY,
        left: '6.2vw'
    },
    rootHovered: {
        color: COLOR1_D_20,
        background: 'transparent',
        fontFamily: FONT_FAMILY,
    },
    rootPressed: {
        color: COLOR1_D_40,
        background: 'transparent',
        fontFamily: FONT_FAMILY
    }
};

export const emailAddressIconClassName: string = mergeStyles({
    display: 'block',
    width: '25px',
    position: 'absolute',
    left: '80%',
    top: '32%'
});

export const passwordIconClassName: string = mergeStyles({
    display: 'block',
    width: '25px',
    position: 'absolute',
    left: '80%',
    top: '47.5%'
});

export const nushClassName: string = mergeStyles({
    width: '100%',
    height: '20%',
    display: 'block'
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
        height: '17.5px',
        border: `1px solid ${COLOR2}`
    },
    text: {
        fontFamily: FONT_FAMILY,
        color: COLOR1_D_40,
        selectors: {
            ":hover": {
                color: COLOR1_D_40,
            }
        }
    }
};

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
    border: '1px solid red'
});

export const errorClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: '#945564',
    display: 'block',
    position: 'absolute',
    left: '4.5vw',
    top: '38vh',
});