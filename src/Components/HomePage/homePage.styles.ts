import { IButtonStyles, IDialogStyles, mergeStyles } from 'office-ui-fabric-react';
import { COLOR2, COLOR2_D_20, COLOR2_D_40, FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    width: '100%',
    height: '100%',
    overflow: 'hidden'
});

export const mainLogoClassName: string = mergeStyles({
    width: '2.5vw',
    borderRadius: '3px',
    marginTop: '-1vh',
});

export const mainTextClassName: string = mergeStyles({
    font: FONT_FAMILY,
    fontSize: '1.5vw',
    color: 'white',
    marginTop: '-0.1vh',
    marginLeft: '0.8vw'
});

export const mainLogoDivClassName: string = mergeStyles({
    position: 'absolute',
    top: '-4.5%',
    left: '-36.6%'
});


export const dialogStyles: Partial<IDialogStyles> = {
    main: {
        maxWidth: 450,
        borderTop: `4px solid ${COLOR2}`
    }
};

export const acceptedButtonStyles: Partial<IButtonStyles> = {
    root: {
        marginTop: '3.5vh',
        color: 'white',
        background: COLOR2
    },
    rootHovered: {
        color: 'white',
        background: COLOR2_D_20
    },
    rootPressed: {
        color: 'white',
        background: COLOR2_D_40
    }
};