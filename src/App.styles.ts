import { mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    background: 'linear-gradient(90deg, rgba(18,19,36,1) 0%, rgba(28,28,66,1) 49%, rgba(38,29,57,1) 100%)',
    width: '100vw',
    height: '100vh',
    overflowX: 'hidden'
});

export const mainContentClassName: string = mergeStyles({
    width: '88vw',
    marginLeft: '8.75%',
    height: '87.5vh',
});