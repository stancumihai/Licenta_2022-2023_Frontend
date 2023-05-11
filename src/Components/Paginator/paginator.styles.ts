import { IButtonStyles } from '@fluentui/react';
import { mergeStyles } from 'office-ui-fabric-react';
import { COLOR1, COLOR2, COLOR2_D_20, COLOR2_D_40 } from '../../Library/constants';

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
        color: COLOR2
    },
    rootHovered: {
        background: 'transparent',
        color: COLOR2_D_20
    },
    rootPressed: {
        background: 'transparent',
        color: COLOR2_D_40
    },
    rootDisabled: {
        background: 'transparent',
    }
};


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
        color: COLOR1,
        userSelect: 'none',
        minHeight: '32px'
    },
    rootHovered: {
        backgroundColor: 'transparent',
        color: COLOR2
    },
    rootPressed: {
        backgroundColor: 'transparent',
        color: '#CCC'
    },
    rootDisabled: {
        backgroundColor: 'transparent',
        color: 'gray'
    }
};