import { mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto',
    gridTemplateRows: 'auto auto',
    justifyContent: 'space-evenly',
    position: 'absolute',
    gridRowGap: '10vh',
    width: '70%',
    height: '70%',
    top: '15vh',
    left: '22.5vw'
});