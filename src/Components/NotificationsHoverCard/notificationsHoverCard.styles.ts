import { mergeStyleSets } from '@fluentui/react';

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
        display: 'flex',
        position: 'absolute',
        color: 'white'
    },
});