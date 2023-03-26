import { ISearchBoxStyles } from '@fluentui/react';
import { mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    padding: '2vh',
    position: 'relative',
    right: '-25%',
    maxWidth: '75vw',
    maxHeight: '10vh',
    height: '10vh',
    top:'1vh'
});

export const searchBoxStyles: Partial<ISearchBoxStyles> = {
    root: {
        borderRadius: '25px',
        border: 'none',
        maxWidth: '20%',
        selectors: {
            "::after": {
                border: 'none',
            }
        }
    },
    iconContainer: {
        marginRight: '1.5vw',
        marginLeft: '0.5vw',
        width: '0'
    },
    clearButton: {
        display: 'none'
    }
};

export const iconProps = {
    iconName: 'Search',
    style: { opacity: 100, color: 'black', cursor: 'pointer' }
};