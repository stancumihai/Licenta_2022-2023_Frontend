import { FontWeights, ICalloutContentStyles, mergeStyles } from 'office-ui-fabric-react';
import {
    FONT_FAMILY,
    COLOR1,
    COLOR1_D_20,
    COLOR1_D_40,
    COLOR2
} from '../../Library/constants';
import { mergeStyleSets } from '@fluentui/react';

export const countTextClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    marginTop: '90px',
    color: COLOR1,
    selectors: {
        ':hover': {
            color: COLOR1_D_20,
            cursor: 'pointer'
        }
    }
});

export const dataTypeTextClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    color: COLOR1,
    marginLeft: '5%',
    fontSize: '18px',
    selectors: {
        ':hover': {
            color: COLOR1_D_20,
            cursor: 'pointer'
        }
    }
});

export const listItemClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    paddingTop: "5px",
    color: COLOR1,
    selectors: {
        ':hover': {
            color: COLOR1_D_20
        }
    }
});

export const listItemCalloutClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    paddingTop: "5px",
    selectors: {
        ':hover': {
            color: COLOR2
        }
    }
});

export const listItemContainerClassName: string = mergeStyles({
    marginLeft: '-15%'
});

export const informationCardContainerClassName: string = mergeStyles({
    width: '250px',
    height: '250px',
    background: COLOR1_D_40,
    padding: '10px',
    boxSizing: 'border-box',
    borderRadius: '10px',
    display: 'flex',
});

export const calloutStyles = mergeStyleSets({
    callout: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        width: '225px',
        height: '200px',
        boxSizing: 'border-box',
        fontFamily: FONT_FAMILY,
    },
    title: {
        fontFamily: FONT_FAMILY,
        marginBottom: 12,
        fontWeight: FontWeights.semilight,
    },
    link: {
        display: 'block',
        marginTop: 20,
    },
});