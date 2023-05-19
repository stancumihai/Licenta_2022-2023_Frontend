import { mergeStyles } from 'office-ui-fabric-react';
import {
    FONT_FAMILY,
    COLOR1,
    COLOR2
} from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    width: '75vw',
    boxSizing: 'border-box',
    margin: 'auto',
    marginTop: '3%',
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: '1vw',
    height: '100%',
    overflow: 'scroll',
    overflowX: 'hidden',
    selectors: {
        '::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
        },
        '::-webkit-scrollbar-track': {
            background: 'transparent'
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: COLOR2,
            borderRadius: '5px',
        }
    }
});

export const buttonContainerClassName: string = mergeStyles({
    height: '20vh',
    position: 'relative',
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
    marginTop: '2%'
});

export const mainTextClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: COLOR1,
    marginTop: '20%'
});