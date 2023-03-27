import { IButtonStyles } from '@fluentui/react';
import { mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    position: 'absolute',
    paddingTop: '10px',
    paddingBottom: '10px',
    display: 'flex',
    flexFlow: 'column nowrap',
    width: 'auto',
    height: 'auto',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column'
});

export const iconStyles: Partial<IButtonStyles> = {
    root: {
        color: '#5149DB'
    },
    rootHovered: {
        background: 'transparent',
        color: '#857fe5'
    },
    rootPressed: {
        background: 'transparent',
        color: "#a7a3ed"
    }
};

export const pagesClassName: string = mergeStyles({
    textOverflow: 'ellipsis'
});

export const paginatorNumberStyles: Partial<IButtonStyles> = {
    root: {
        outline: 'transparent',
        position: 'relative',
        WebkitFontSmoothing: 'anitalised',
        fontSize: '14px',
        boxSizing: 'border-box',
        display: 'inline-block',
        border: 'none',
        textDecoration: 'none',
        textAlign: 'center',
        padding: '0 16px',
        borderRadius: '2px',
        minWidth: '32px',
        height: '32px',
        backgroundColor: 'transparent',
        color: 'black',
        userSelect: 'none',
        minHeight: '32px'
    },
    rootHovered: {
        backgroundColor: 'transparent',
        color: "white"
    },
    rootPressed: {
        backgroundColor: 'transparent',
        color: '#CCC'
    }
};