import { mergeStyles } from 'office-ui-fabric-react';
import { COLOR2 } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    width: '75vw',
    boxSizing: 'border-box',
    margin: 'auto',
    marginTop: '1.3%',
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: '1vw',
    height: '95%',
    overflow: 'hidden',
});

export const buttonContainerClassName: string = mergeStyles({
    height: '20vh',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 'auto',
    display: 'flex',
    position: 'fixed',
    top: '5%'
});

export const contentContainerClassName: string = mergeStyles({
    width: '100%',
    height: '100%',
    marginTop: '10%',
    marginLeft: '-5%',
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