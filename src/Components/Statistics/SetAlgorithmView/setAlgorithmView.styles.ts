import {
    IDialogStyles,
    IDropdownStyles,
    IProgressIndicatorStyles,
    mergeStyles
} from 'office-ui-fabric-react';
import {
    COLOR2,
    FONT_FAMILY,
    COLOR1,
    COLOR2_D_20,
    COLOR2_D_40
} from '../../../Library/constants';
import { IButtonStyles } from '@fluentui/react';

export const dropdownStyles: Partial<IDropdownStyles> = {
    title: {
        background: 'transparent'
    },
    caretDown: {
        color: COLOR2,
    },
    dropdown: {
        width: '50%',
        margin: 'auto',
        marginTop: '5%',
        borderColor: COLOR2,
        fontFamily: FONT_FAMILY,
        color: 'white',
        selectors: {
            ':hover': {
                fontFamily: FONT_FAMILY,
                color: 'white',
            },
            ':focus::after': {
                border: `2px solid ${COLOR2}`
            }
        }
    },
    label: {
        fontFamily: FONT_FAMILY,
        color: COLOR1,
        fontSize: '16px',
        transform: 'translate(0, 100%)'
    }
};

export const editButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: COLOR1,
        border: 'none',
        fontFamily: FONT_FAMILY,
        background: COLOR2,
        width: '4vw',
        height: '4vh',
        marginTop: "3%",
        marginRight: '5%'
    },
    rootHovered: {
        color: COLOR1,
        background: COLOR2_D_20
    },
    rootPressed: {
        color: COLOR1,
        background: COLOR2_D_40
    }
};

export const saveButtonStyles: Partial<IButtonStyles> = {
    root: {
        width: '4vw',
        height: '4vh',
        border: 'none',
        fontFamily: FONT_FAMILY,
        background: COLOR1,
    },
    rootHovered: {
        background: COLOR1
    },
    rootPressed: {
        background: COLOR1
    }
};

export const progressIndicatorStyles: Partial<IProgressIndicatorStyles> = {
    root: {
        position: 'absolute',
        top: '25%',
        left: '30%',
        width: '50%',
        height: '1px',
    },
    progressBar: {
        background: COLOR2
    },
    itemName: {
        fontSize: '15px',
        color: COLOR2,
        fontFamily: FONT_FAMILY
    }
};

export const dialogStyles: Partial<IDialogStyles> = {
    main: {
        maxWidth: 450,
        left: "8%",
        borderTop: `4px solid ${COLOR2}`
    }
};

export const contentClassName: string = mergeStyles({
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    marginTop: '10%'
});

export const errorMessageClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: COLOR2,
    fontSize: '20px'
});