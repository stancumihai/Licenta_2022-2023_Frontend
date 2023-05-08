import { IDialogStyles } from '@fluentui/react';
import { IButtonStyles, IDialogContentStyles, mergeStyles } from 'office-ui-fabric-react';

export const dialogStyles: Partial<IDialogStyles> = {
    main: {
        maxWidth: 450,
        borderTop: `4px solid rgb(81, 73, 219)`
    }
};

export const acceptedButtonStyles: Partial<IButtonStyles> = {
    root: {
        marginTop: '3.5vh',
        color: 'white',
        background: 'rgb(81, 73, 219)'
    },
    rootHovered: {
        color: 'white',
        background: 'rgba(81, 73, 219,0.9)'
    },
    rootPressed: {
        color: 'white',
        background: 'rgba(81, 73, 219,0.8)'
    }
};

export const dialogContentStyles: Partial<IDialogContentStyles> = {
    title: {
        marginTop: '10px',
        fontSize: '17.5px'
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
    marginTop: '100px'
});