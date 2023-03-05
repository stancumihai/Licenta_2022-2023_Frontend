import { IButtonStyles, ITextFieldStyles, mergeStyles } from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';

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
        color: '#526ad6'
    },
    field: {
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
    marginBottom: '2px',
    position: 'relative',
    left: '40vw'
});
export const resetPasswordButtonStyles: Partial<IButtonStyles> = {
    root: {
        background: '#526ad6',
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
        background: '#d3e6ee',
    },
    rootPressed: {
        background: '#526ad6',
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
    left: '44.5vw',
    top: '6vh',
});
export const loginSpanClassName: string = mergeStyles({
    marginLeft: '5px',
    color: '#526ad6',
    selectors: {
        ":hover": {
            'color': '#d3e6ee',
            cursor: 'pointer'
        },
        ":active": {
            color: '#526ad6',
        }
    }
});