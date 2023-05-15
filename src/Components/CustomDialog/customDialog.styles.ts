import { IDialogStyles } from '@fluentui/react';
import { IButtonStyles, IDialogContentStyles, mergeStyles } from 'office-ui-fabric-react';
import { COLOR2, COLOR2_D_20, COLOR2_D_40 } from '../../Library/constants';

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

export const dialogContentStyles: Partial<IDialogContentStyles> = {
    title: {
        marginTop: '10px',
        fontSize: '17.5px',
    },
    topButton: {
        display: 'none'
    },
    inner: {
        minHeight: "0"
    }
};

export const containerClassName: string = mergeStyles({
    display: 'inline-block',
    position: 'absolute',
    marginTop: '100px'
});