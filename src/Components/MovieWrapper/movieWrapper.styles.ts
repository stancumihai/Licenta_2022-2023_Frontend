import { IRatingStyles, mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    width: '100%',
    background: 'linear-gradient(90deg, rgba(20,20,32,1), rgba(37,65,104,1) 65%, rgba(36,45,69,1) 100%)',
    maxWidth: '100%',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '100vh',
    paddingTop: '1vh',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
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