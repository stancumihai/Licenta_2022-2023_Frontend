import { ICalloutContentStyles } from '@fluentui/react';
import { FONT_FAMILY } from '../../Library/constants';

export const calloutStyles: Partial<ICalloutContentStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
        width: 'auto',
        height: 'auto',
    },
    beak: {
        display: 'none',
    },
    container:{
        opacity: '0.8',
    }
};