import {
    FontWeights,
    getTheme,
    IButtonStyles, IIconProps,
    IModalStyles,
    mergeStyleSets
} from 'office-ui-fabric-react';

export const cancelIcon: IIconProps = { iconName: 'Cancel' };

export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        backgroundColor: 'transparent',
        color: 'rgb(81, 73, 219)',
        marginTop: '4px',
    },
    rootHovered: {
        color: 'rgb(61,87,116)',
        backgroundColor: 'transparent',
    },
};

export const sendButtonStyles: Partial<IButtonStyles> = {
    root: {
        position: 'absolute',
        height: '10vh',
        color: 'red',
        top: '62vh',
        left: '32vw'
    },
    icon: {
        fontSize: '3vh',
        transition: '0.3s'
    },
    rootHovered: {
        backgroundColor: 'transparent',
        color: '#CCC',
        transition: '0.3s'
    },
    rootPressed: {
        backgroundColor: 'transparent',
        color: 'red',
        transition: '0.3s'
    }
};

export const theme = getTheme();
export const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: `4px solid rgb(81, 73, 219)`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    heading: {
        color: theme.palette.neutralPrimary,
        fontWeight: FontWeights.semibold,
        fontSize: 'inherit',
        margin: '0',
    },
    body: {
        flex: '4 4 auto',
        fontSize: '15px',
        fontWeight: '600',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
});
export const customAlertLeftStyles: Partial<IModalStyles> = {
    root: {
        transition: '0.5s',
        position: 'relative',
        top: '51.5vh',
        left: '1.1vw',
        color: '#fff',
    },

    main: {
        backgroundColor: 'rgba(61,87,116, 0.4)'
    }
};
export const customAlertStyles: Partial<IModalStyles> = {
    root: {
        transition: '1s',
        position: 'relative',
        top: '51vh',
        left: '24vw',
        color: '#fff',
    },

    main: {
        backgroundColor: 'rgba(61,87,116, 0.4)'
    }
};