import {
    ICheckboxStyles,
    IChoiceGroupStyles,
    ILabelStyles,
    mergeStyles
} from '@fluentui/react';
import { IButtonStyles, ICalloutContentStyles, IChoiceGroupOptionStyles } from 'office-ui-fabric-react';
import { COLOR1, COLOR1_D_20, COLOR1_D_40, COLOR2, COLOR2_D_20, COLOR2_D_40, FONT_FAMILY } from '../../Library/constants';

export const mainLogoDivClassName: string = mergeStyles({
    position: 'relative',
    left: '-26.5%',
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
    overflow: 'hidden'
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
    field: {
        selectors: {
            ':hover .ms-ChoiceFieldLabel': {
                color: 'white'
            },
            ':before': {
                borderColor: 'none'
            },
            ':after': {
                backgroundColor: COLOR2,
                borderColor: COLOR2_D_40
            },
            ':hover::after': {
                backgroundColor: COLOR2
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
        border: `1px solid ${COLOR2_D_20}`,
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
    marginBottom: '10vh',
    bottom: '2vh',
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
        top: '5vh',
        fontFamily: FONT_FAMILY,
        width: '8vw',
        height: '4.5vh',
        left: '45%',
        backgroundColor: COLOR1,
        color: COLOR2,
        borderRadius: '25px',
        border: 'none',
        fontSize: '17.5px'
    },
    rootHovered: {
        backgroundColor: COLOR1_D_20,
        color: 'white'
    },
    rootPressed: {
        backgroundColor: COLOR1_D_40,
        color: 'white'
    }
};
export const informationClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontSize: '20px',
    display: 'block',
    position: 'absolute',
    color: COLOR2_D_20,
    top: '14.5vh'
});
export const requiredAssetClassName: string = mergeStyles({
    width: '10px',
    height: '10px',
    marginLeft: '5px',
    marginTop: '22.5px'
});
export const requiredAssetContainerClassName: string = mergeStyles({
    display: 'flex'
});
export const calloutTootltipStyles: Partial<ICalloutContentStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
        width: 'auto',
        height: 'auto',
    },
    beak: {
        display: 'none',
    },
    container: {
        opacity: '0.8',
    }
};
export const pressForMoreIconButtonStyles: Partial<IButtonStyles> = {
    root: {
        marginLeft: '1vw',
        backgroundColor: 'transparent',
        color: COLOR2
    },
    rootHovered: {
        backgroundColor: 'transparent',
        color: COLOR2_D_20,

    },
    rootPressed: {
        backgroundColor: 'transparent',
        color: COLOR2_D_40
    },
    icon: {
        fontSize: '20px'
    }
};