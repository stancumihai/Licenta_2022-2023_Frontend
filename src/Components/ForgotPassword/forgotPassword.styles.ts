import { IButtonStyles } from '@fluentui/react';
import {
    FontWeights,
    ITextFieldStyles,
    mergeStyles
} from 'office-ui-fabric-react';
import '../../Fonts/TisaSansProLight.ttf';
import {
    COLOR1,
    COLOR1_D_40,
    COLOR2,
    COLOR2_D_20,
    COLOR2_D_40,
    FONT_FAMILY
} from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    height: 'inherit'
});

export const contentClassName: string = mergeStyles({
    position: 'relative',
    width: '25%',
    height: '60%',
    margin: 'auto',
    paddingTop: '2%',
    top: '22.5%',
    boxShadow: `rgba(0, 0, 0, 0.25) 0px 54px 55px, 
                rgba(0, 0, 0, 0.12) 0px -12px 30px, 
                rgba(0, 0, 0, 0.12) 0px 4px 6px, 
                rgba(0, 0, 0, 0.17) 0px 12px 13px, 
                rgba(0, 0, 0, 0.09) 0px -3px 5px`,
    boxSizing: 'border-box',
    borderRadius: '20px',
    backdropFilter: 'blur(5px)',
});

export const headerClassName: string = mergeStyles({
    display: 'block',
    position: 'relative',
    margin: 'auto',
    fontWeight: "0",
    width: '75%',
});

export const forgotPasswordMessageClassName: string = mergeStyles({
    fontWeight: FontWeights.regular,
    fontFamily: FONT_FAMILY,
    fontSize: '0.875vw',
    color: COLOR1
});

export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        width: '70%',
        margin: 'auto',
    },
    field: {
        color: 'black',
        fontFamily: FONT_FAMILY
    },
    wrapper: {
        border: 'none',
        selectors: {
            "::after": {
                border: 'none',
            }
        }
    },
    fieldGroup: {
        borderRadius: '5px',
    }
};

export const labelClassName: string = mergeStyles({
    top: '3%',
    marginBottom: '5%',
    position: 'relative',
    fontFamily: FONT_FAMILY,
    color: COLOR1,
    left: '15%'
});

export const resetPasswordButtonStyles: Partial<IButtonStyles> = {
    root: {
        background: COLOR2,
        color: 'white',
        position: 'relative',
        top: '3vh',
        border: 'none',
        borderRadius: '5px',
        padding: '20px',
        width: '50%',
        left: '25%'
    },
    rootHovered: {
        background: COLOR2_D_20,
        color: 'white',
    },
    rootPressed: {
        background: COLOR2_D_40,
        color: 'white',
    }
};

export const footerClassName: string = mergeStyles({
    margin: 'auto',
    maxHeight: '10px'
});

export const dontHaveAccountMessageClassName: string = mergeStyles({
    position: 'relative',
    fontFamily: FONT_FAMILY,
    color: COLOR1,
    textAlign: "center",
    top: '10%'
});

export const signUpSpanClassName: string = mergeStyles({
    marginLeft: '5px',
    fontFamily: FONT_FAMILY,
    color: COLOR2,
    selectors: {
        ":hover": {
            'color': COLOR2_D_20,
            cursor: 'pointer'
        },
        ":active": {
            color: COLOR2_D_40,
        }
    }
});

export const mainLogoClassName: string = mergeStyles({
    width: '4vw',
    marginLeft: '60px',
});

export const mainTextClassName: string = mergeStyles({
    font: FONT_FAMILY,
    color: COLOR1,
    fontSize: '1.35vw',
    marginLeft: '15%'
});

export const circleClassName1: string = mergeStyles({
    background: COLOR2,
    width: '200px',
    height: '200px',
    position: 'absolute',
    borderRadius: '100%',
    top: '60%',
    left: "36%"
});

export const circleClassName2: string = mergeStyles({
    background: COLOR1_D_40,
    width: '200px',
    height: '200px',
    position: 'absolute',
    borderRadius: '100%',
    top: '60%',
    left: "58%"
});

export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        position: "absolute",
        left: '43%',
        top: '9vh',
        backgroundColor: 'transparent',
        color: COLOR2
    },
    rootHovered: {
        backgroundColor: 'transparent',
    },
    icon: {
        fontSize: '100px'
    }
};