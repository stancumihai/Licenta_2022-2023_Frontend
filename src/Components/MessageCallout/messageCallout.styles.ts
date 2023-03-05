import { FontWeights, mergeStyleSets } from 'office-ui-fabric-react';

export const calloutStyles = mergeStyleSets({
    callout: {
        marginLeft: '41vw',
        marginTop: '52.5vh',
        width: 320,
        maxWidth: '90%',
        padding: '20px 24px',
    },
    title: {
        marginBottom: 12,
        fontWeight: FontWeights.semilight,
    },
    message: {
        fontWeight: FontWeights.semibold,
    }
});