import { mergeStyles } from 'office-ui-fabric-react';

export const pageTitleContainerClassName: string = mergeStyles({
    width: '100%',
    height: '30%',
});

export const headerPosterClassName: string = mergeStyles({
    objectFit: "cover",
    backgroundPosition: 'center center',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    opacity: '0.3',
    width: 'inherit',
    height: 'inherit',
    backgroundSize: 'cover',
    backgroundAttachment: 'scroll',
    backgroundRepeat: 'no-repeat',
});

export const pageTitleOverlayClassName: string = mergeStyles({
    position: 'absolute',
    width: 'inherit',
    height: 'inherit',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: -1,
    background: 'linear-gradient(to right, #673AB7, rgba(33, 150, 243, 0.7))'
});

export const textContainerClassName: string = mergeStyles({
    maxWidth: '100%',
    paddingTop: '5.5vh',
    paddingLeft: '10vw',
    position: 'relative',
    boxSizing: 'border-box'
});

export const movieTitleClassName: string = mergeStyles({
    textTransform: 'uppercase',
    lineHeight: '1',
    wordWrap: 'break-word',
    color: 'white',
    fontSize: '34px',
    WebkitFontSmoothing: 'antialised',
    letterSpacing: '0.1px'
});

export const paragraphClassName: string = mergeStyles({
    fontSize: '22px',
    letterSpacing: '0.5px',
    color: 'white',
    opacity: '0.7',
    marginTop: '10px',
    lineHeight: '1.7',
    display: 'inline-block',
    borderTop: '3px solid rgba(255,255,255,0.3)'
});