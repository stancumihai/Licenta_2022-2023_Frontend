import { IDialogStyles, mergeStyles } from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';
import { IButtonStyles, ITextFieldStyles } from '@fluentui/react';

export const containerClassName: string = mergeStyles({
    height: '100vh',
    background: 'linear-gradient(90deg, rgba(20,20,32,1), rgba(37,65,104,1) 65%, rgba(36,45,69,1) 100%)',
    overflow: 'hidden'
});

export const contentClassName: string = mergeStyles({
    width: '20%',
    margin: 'auto',
    height: "60%",
    transform: 'translate(0%, 25%)',
    boxSizing: 'border-box',
    padding: '2%',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
});

export const labelClassName: string = mergeStyles({
    color: 'white',
    fontFamily: FONT_FAMILY,
    marginLeft: '15%',
    marginTop: '10px'
});

export const textFieldStyles: Partial<ITextFieldStyles> = {
    root: {
        width: '70%',
        margin: 'auto',
    },
    fieldGroup: {
        boxSizing: 'border-box',
        height: '4vh'
    }
};

export const goBackIconStyles: Partial<IButtonStyles> = {
    root: {
        position: 'absolute',
        marginLeft: '5vw',
        marginTop: '5vh',
        backgroundColor: 'transparent',
        color: 'white'
    },
    rootHovered: {
        color: 'rgb(61,87,116)',
        backgroundColor: 'transparent',
    },
    rootPressed: {
        backgroundColor: 'transparent',
    },
    icon: {
        fontSize: '25px'
    }
};

export const homePageTextClassName: string = mergeStyles({
    color: 'white',
    display: 'inline',
    position: 'absolute',
    marginTop: '5vh',
    marginLeft: '7.5vw',
    fontSize: '30px',
    fontFamily: FONT_FAMILY,
    selectors: {
        ':hover': {
            color: 'rgb(61,87,116)',
        }
    }
});

export const editButtonStyles: Partial<IButtonStyles> = {
    root: {
        margin: '10% 5% 0 15%',
    },
    rootHovered: {
        background: '#e5e5e5'
    },
    rootPressed: {
        background: '#cccccc'
    }
};

export const profileSettingsTitleClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: 'white',
    marginLeft: '5%',
    marginBottom: '20%'
});

export const dialogStyles: Partial<IDialogStyles> = {
    main: {
        maxWidth: 450,
        borderTop: `4px solid #5b86c3`
    }
};

export const acceptedButtonStyles: Partial<IButtonStyles> = {
    root: {
        marginTop: '3.5vh',
        color: 'white',
        background: '#5b86c3'
    },
    rootHovered: {
        color: 'white',
        background: '#4273b7'
    },
    rootPressed: {
        color: 'white',
        background: '#38629c'
    }
};