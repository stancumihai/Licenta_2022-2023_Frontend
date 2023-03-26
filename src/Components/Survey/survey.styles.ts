import {
    ICheckboxStyles,
    IChoiceGroupStyles,
    ILabelStyles,
    ISpinnerStyles,
    mergeStyles
} from '@fluentui/react';
import { IButtonStyles, IChoiceGroupOptionStyles } from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';

export const mainLogoDivClassName: string = mergeStyles({
    position: 'relative',
    left: '-26.5%',
    top: '1.5%'
});
export const mainLogoClassName: string = mergeStyles({
    width: '2vw',
    borderRadius: '3px',
});
export const mainTextClassName: string = mergeStyles({
    font: FONT_FAMILY,
    fontSize: '1vw',
    color: 'white',
    marginTop: '1vh',
    marginLeft: '0.8vw'
});
export const containerClassName: string = mergeStyles({
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(90deg, rgba(20,20,32,1), rgba(37,65,104,1) 65%, rgba(36,45,69,1) 100%)',
    position: 'absolute'
});
export const surveyContentClassName: string = mergeStyles({
    marginLeft: '12.5%',
    marginTop: '3vh',
    width: '75%',
    padding: '5vh 5vw 5vh 5vw',
    boxSizing: 'border-box',
    color: 'white',
});
export const choiceGroupStyles: Partial<IChoiceGroupStyles> = {
    label: {
        fontFamily: FONT_FAMILY,
        color: '#CCCCCC',
    },
    flexContainer: {
        selectors: {
            ".ms-ChoiceField": {
                fontFamily: FONT_FAMILY,
                color: '#CCCCCC'
            },
        }
    }
};
export const choiceGroupOptionStyle: Partial<IChoiceGroupOptionStyles> = {
    root: {

    },
    field: {
        selectors: {
            ':hover .ms-ChoiceFieldLabel': {
                color: 'white'
            },
            ':before': {
                borderColor: 'none'
            },
            ':after': {
                backgroundColor: '#5149DB',
                borderColor: '#5149DB'
            },
            ':hover::after': {
                backgroundColor: '#5149DB'
            }
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
    checkbox: {
        border: '1px solid #5149DB',
    },
    label: {
        selectors: {
            ":hover .ms-Checkbox-text": {
                color: 'white'
            },
        }
    },
    text: {
        fontFamily: FONT_FAMILY,
        color: "rgb(204, 204, 204)",
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
export const sendButtonStyles: Partial<IButtonStyles> = {
    root: {
        top: '8vh',
        fontFamily: FONT_FAMILY,
        width: '8vw',
        height: '4.5vh',
        left: '45%',
        backgroundColor: '#5149DB',
        color: 'white',
        borderRadius: '25px',
        border: 'none',
    },
    rootHovered: {
        backgroundColor: '#857fe5',
        color: 'white'
    },
    rootPressed: {
        backgroundColor: '#a7a3ed',
        color: 'white'
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
        marginTop: '35vh',
    },
    circle: {
        width: '200px',
        height: '200px',
        borderColor: '#5149DB rgb(199, 224, 244) rgb(199, 224, 244)'
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