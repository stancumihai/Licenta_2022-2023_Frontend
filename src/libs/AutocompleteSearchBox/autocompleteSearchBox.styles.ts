import { ISearchBoxStyles } from '@fluentui/react';
import { DefaultEffects, ICalloutContentStyles, IProgressIndicatorStyles } from 'office-ui-fabric-react';
import { CSSProperties } from 'react';
import { FONT_FAMILY } from '../../Library/constants';

export const ProgressIndicatorStyle: Partial<IProgressIndicatorStyles> = {
    itemProgress: {
        paddingBottom: "4px",
    },
};

export const typeAheadCalloutStyle: Partial<ICalloutContentStyles> = {
    root: {
        boxShadow: DefaultEffects.elevation4,
        borderRadius: 2,
        marginTop: 0,
        minWidth: "200px",
        top: "0px!important",
        left: "0px!important",
        selectors: {
            "@media(max-width: 600px)": {
                top: "0px",
                left: "0px!important",
                minWidth: "200px",
            },
        },
    },
    container: {
        zIndex: 3,
        position: "relative",
    },
    calloutMain: {
        minHeight: "fit-content",
        maxHeight: "500px!important",
        height: "100%",
    },
};

export const defaultSuggestionItem: CSSProperties = {
    width: "100%",
    float: "left",
    padding: "5px",
};

export const searchContainer: CSSProperties = {
    width: 'fit-content'
};

export const searchBoxStyle: Partial<ISearchBoxStyles> = {
    root: {
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '5px',
        border: 'none',
        maxWidth: '100%',
        selectors: {
            "::after": {
                border: 'none',
            }
        }
    },
    field: {
        fontFamily: FONT_FAMILY,
        paddingLeft: '15px',
        fontSize: '12.5px',
        width: '25vh',
        //pointerEvents: 'none'
    },
    iconContainer: {
        marginRight: '1.5vw',
        marginLeft: '0.5vw',
        width: '0'
    },
    icon: {
        color: '#0C0B0F'
    },
    clearButton: {
        display: 'none'
    }
};

export const iconProps = {
    iconName: 'Search',
};