import { mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    width: '75vw',
    boxSizing: 'border-box',
    margin: 'auto',
    marginTop: '1.3%',
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: '1vw',
    overflowX: 'hidden'
});

export const buttonContainerClassName: string = mergeStyles({
    height: '20vh',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 'auto',
    display: 'flex'
});