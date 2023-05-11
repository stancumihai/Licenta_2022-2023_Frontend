import { IButtonStyles } from '@fluentui/react';
import {
    FontWeights,
    ITextFieldStyles,
    mergeStyles
} from 'office-ui-fabric-react';
import '../../Fonts/TisaSansProLight.ttf';
import { COLOR2, COLOR2_D_20, COLOR2_D_40, FONT_FAMILY } from '../../Library/constants';

export const contentClassName: string = mergeStyles({
    display: 'block',
    position: 'relative',
    margin: 'auto',
    padding: '20px',
    top: '20vh',
    maxWidth: '75vw',
    height: '50vh',
});
export const headerClassName: string = mergeStyles({
    display: 'block',
    position: 'relative',
    margin: 'auto',
    fontWeight: "0",
    maxWidth: '25vw',
    top: '20vh',
    left: '2.9vw'
});
export const forgotPasswordMessageClassName: string = mergeStyles({
    fontWeight: FontWeights.regular,
    maxWidth: '20vw',
    fontFamily: FONT_FAMILY,
    fontSize: '0.875vw',
});
export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        maxWidth: '20vw',
        margin: 'auto',
    },
    field: {
        fontFamily: FONT_FAMILY,
        height: '4.5vh',
        borderRadius: '5px',
        border: '3px solid #d3e6ee'
    },
    wrapper: {
        border: 'none',
        selectors: {
            "::after": {
                border: 'none',
            }
        }
    },
};
export const labelClassName: string = mergeStyles({
    marginLeft: '27.6vw',
    fontFamily: FONT_FAMILY
});
export const resetPasswordButtonStyles: Partial<IButtonStyles> = {
    root: {
        background: COLOR2,
        color: 'white',
        position: 'relative',
        left: '27.5vw',
        top: '3vh',
        border: 'none',
        borderRadius: '5px',
        padding: '20px',
        width: '20vw'
    },
    rootHovered: {
        background: COLOR2_D_20,
        color: 'white'
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
    left: '44.5vw',
    bottom: '16vh',
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
    width: '5vw',
    borderRadius: '3px',
});
export const mainTextClassName: string = mergeStyles({
    font: FONT_FAMILY,
    fontSize: '1.35vw'
});
export const containerClassName: string = mergeStyles({
    position: 'relative',
    top: '3vh'
});