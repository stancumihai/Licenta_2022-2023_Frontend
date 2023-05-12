import { mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    width: '75vw',
    height: '100vh',
    boxSizing: 'border-box',
    margin: 'auto',
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: '1vw',
    overflow: 'scroll'
});

export const buttonContainerClassName: string = mergeStyles({
    height: '20vh',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 'auto',
    display: 'flex'
});