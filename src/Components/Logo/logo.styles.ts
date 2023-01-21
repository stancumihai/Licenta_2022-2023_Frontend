import { mergeStyles } from '@fluentui/react';
import { FONT_FAMILY } from '../../Library/constants';

export const mainTextClassName: string = mergeStyles({
    position: 'fixed',
    top: '79vh',
    left: '48.5vw',
    font: FONT_FAMILY,
    color: 'white',
    fontSize: '23px'
});

export const mainLogoClassName: string = mergeStyles({
    position: 'fixed',
    width: '1.8vw',
    left: '46vw',
    borderRadius: '3px',
    top: '81vh'
});