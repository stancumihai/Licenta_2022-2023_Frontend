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
        overflow: "hidden",
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
        backgroundImage: "linear-gradient(to right, #49494D, #0C0B0F)",
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
        selectors: {
            "::after": {
                outline: 'red'
            },
            "::is-active": {
                outline: 'red'
            }
        }
    },
    field: {
        fontFamily: FONT_FAMILY,
        paddingLeft: '15px',
        fontSize: '12.5px',
        color: 'white',
        selectors: {
            "::after": {
                outline: 'red'
            },
            "::is-active": {
                outline: 'red'
            }
        }
    },
    icon: {
        color: '#0C0B0F'
    }
};