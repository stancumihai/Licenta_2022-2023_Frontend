import { mergeStyles } from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(90deg, rgba(20,20,32,1), rgba(37,65,104,1) 65%, rgba(36,45,69,1) 100%)'
});

export const mainLogoClassName: string = mergeStyles({
    width: '2vw',
    borderRadius: '3px',
});

export const mainTextClassName: string = mergeStyles({
    font: FONT_FAMILY,
    fontSize: '1vw',
    color: 'white',
    marginTop: '1vh',
    marginLeft: '0.8vw'
});

export const mainLogoDivClassName: string = mergeStyles({
    position: 'absolute',
    top: '-5%',
    left: '-41%'
});