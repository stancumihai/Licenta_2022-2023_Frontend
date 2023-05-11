import { mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    width: '75vw',
    marginLeft: "25vw",
    height: '100vh',
    boxSizing: 'border-box',
    overflow: 'hidden'
});

export const buttonContainerClassName: string = mergeStyles({
    width: '75vw',
    height: '15vh',
    marginLeft: "25vw",
    marginTop: '2vh',
    display: 'flex'
});