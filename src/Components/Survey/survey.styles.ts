import {
    IButtonGridStyles,
    ICheckboxStyles,
    IChoiceGroupStyles,
    ILabelStyles,
    ISpinnerStyles,
    mergeStyles
} from '@fluentui/react';
import { FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    marginLeft: '12.5%',
    marginTop: '3vh',
    border: '1px solid black',
    width: '75%',
    padding: '5vh 5vw 5vh 5vw',
    boxSizing: 'border-box',
    color: 'white'
});
export const choiceGroupStyles: Partial<IChoiceGroupStyles> = {
    label: {
        fontFamily: FONT_FAMILY,
        color: '#CCCCCC'
    },
    flexContainer: {
        selectors: {
            ".ms-ChoiceField": {
                fontFamily: FONT_FAMILY,
                color: '#CCCCCC'
            },
            '.ms-ChoiceField-field::before': {
                backgroundColor: '#49494D',
            },
            '.ms-ChoiceField-field::after': {
                backgroundColor: '#0C0B0F',
            },
        }
    }
};
export const checkboxContainerClassName: string = mergeStyles({
    marginTop: '1%',
    display: 'grid',
    columnGap: '50px',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto auto',
});
export const checkboxItemStyle: Partial<ICheckboxStyles> = {
    root: {
        marginBottom: '0.5vh',
    },
    text: {
        fontFamily: FONT_FAMILY,
        color: "#CCC"
    },
    checkbox: {
        selectors: {
            '.ms-Checkbox::disabled': {
                backgroundColor: 'green'
            },
            '.checkbox-219': {
                background: 'yellow'
            }
        }
    }
};
export const surveyTitleClassName: string = mergeStyles({
    position: 'relative',
    fontFamily: FONT_FAMILY,
    left: '20vw',
    marginBottom: '6.5vh',
    color: '#CCCCCC',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
});
export const labelStyles: Partial<ILabelStyles> = {
    root: {
        marginTop: '1.5vh',
        fontFamily: FONT_FAMILY,
        color: '#CCCCCC'
    }
};
export const sendButtonStyles: Partial<IButtonGridStyles> = {
    root: {
        position: 'relative',
        marginLeft: '45%',
        top: '2.5vh',
        backgroundColor: '#CCCCCC'
    }
};
export const informationClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    display: 'block',
    position: 'absolute',
    color: 'red',
    top: '15vh'
});
export const loadingSpinnerStyle: Partial<ISpinnerStyles> = {
    root: {
        marginTop: '35vh'
    },
    circle: {
        width: '200px',
        height: '200px'
    },
    label: {
        color: '#CCCCCC',
        fontSize: '900',
    }
};
export const requiredAssetClassName: string = mergeStyles({
    width: '10px',
    height: '10px',
    marginLeft: '5px',
    marginTop: '22.5px'
});
export const requiredAssetContainerClassName: string = mergeStyles({
    display: 'flex'
});