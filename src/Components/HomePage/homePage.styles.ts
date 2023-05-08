import { IButtonStyles, IDialogStyles, ISpinnerStyles, mergeStyles } from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(90deg, rgba(20,20,32,1), rgba(37,65,104,1) 65%, rgba(36,45,69,1) 100%)',
    overflow: 'hidden'
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

export const mainLogoDivClassName: string = mergeStyles({
    position: 'absolute',
    top: '-5%',
    left: '-41%'
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