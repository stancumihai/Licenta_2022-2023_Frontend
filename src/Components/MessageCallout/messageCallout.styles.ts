import {
    FontWeights,
    mergeStyleSets
} from 'office-ui-fabric-react';

export const calloutStyles = mergeStyleSets({
    callout: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        marginLeft: '42vw',
        marginTop: '55vh',
        width: 320,
        maxWidth: '90%',
        paddingLeft: '30px',
        boxSizing: 'border-box'
    },
    title: {
        marginBottom: 12,
        paddingLeft: "20px",
        fontWeight: FontWeights.semilight,
    },
    message: {
        paddingLeft: "20px",
        fontWeight: FontWeights.semibold,
    }
});