import { mergeStyleSets } from '@fluentui/react';
import { FONT_FAMILY } from '../../Library/constants';

export const compactCardClassNames = mergeStyleSets({
    compactCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    expandedCard: {
        padding: '16px 24px',
    },
    item: {
        lineHeight: '20px',
        fontFamily: FONT_FAMILY,
        display: 'flex',
        position: 'absolute',
        marginTop: '10px',
        width: '100px',
        color: 'white'
    },
});