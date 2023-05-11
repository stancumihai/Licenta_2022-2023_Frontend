import { IButtonStyles, ITextFieldStyles, mergeStyles } from 'office-ui-fabric-react';
import { COLOR2, COLOR2_D_20, COLOR2_D_40, FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    position: 'relative',
    top: '20vh'
});
export const errorClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: '#945564',
    display: 'block',
    position: 'absolute',
    left: '3vw',
    top: '38vh'
});
export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        maxWidth: '22vw',
        left: "1vw",
        margin: 'auto',
        top: '2vh',
    },
    revealIcon: {
        color: COLOR2
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
    top: '2.5vh',
    marginTop: '5px',
    marginBottom: '5px',
    position: 'relative',
    fontFamily: FONT_FAMILY,
    left: '40vw'
});
export const resetPasswordButtonStyles: Partial<IButtonStyles> = {
    root: {
        background: COLOR2,
        color: 'white',
        position: 'relative',
        left: '40vw',
        top: '5vh',
        border: 'none',
        borderRadius: '5px',
        padding: '20px',
        width: '20vw'
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
export const mainLogoClassName: string = mergeStyles({
    width: '5vw',
    borderRadius: '3px',
});
export const mainTextClassName: string = mergeStyles({
    font: FONT_FAMILY,
    fontSize: '1.35vw'
});
export const resetPasswordQuestionClassName: string = mergeStyles({
    position: 'relative',
    fontFamily: FONT_FAMILY,
    left: '44.5vw',
    top: '6vh',
});
export const loginSpanClassName: string = mergeStyles({
    marginLeft: '5px',
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