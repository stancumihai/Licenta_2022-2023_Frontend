import { mergeStyles } from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';

export const cardClassName: string = mergeStyles({
    width: '15vw',
    height: '30vh',
});

export const cardTitleClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: 'white',
    position: 'fixed',
    marginTop: '32vh',
    marginLeft: '0.2vw'
});

export const movieCardPictureClassName: string = mergeStyles({
    position: 'fixed',
    width: '12vw',
    height: '31vh',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
});