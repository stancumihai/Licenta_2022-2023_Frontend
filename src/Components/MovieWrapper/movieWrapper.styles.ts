import { IRatingStyles, mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    marginLeft: 'auto',
    marginRight: 'auto',
    overflowY: 'hidden',
});

export const imageClassName: string = mergeStyles({
    width: '17.5vw',
    imageRendering: 'pixelated',
    filter: 'hue-rotate("0deg")',
    opacity: '1',
    transition: 'filter 0.4s ease-in-out, opacity 0.4s ease-in-out'
});

export const innerContainer: string = mergeStyles({
    margin: '40px 0px',
    position: 'relative',
    marginLeft: '20vw'
});

export const contentContainerClassName: string = mergeStyles({
    marginTop: '5vh',
    width: '75%',
    display: 'flex',
    height: '92vh',
    background: "#212121",
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
});

export const ratingStyles: Partial<IRatingStyles> = {
    ratingStarFront: {
        color: '#FFC107'
    }
};