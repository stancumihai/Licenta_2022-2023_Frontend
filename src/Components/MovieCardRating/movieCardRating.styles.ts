import { mergeStyles } from 'office-ui-fabric-react';
import { COLOR2 } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    position: 'fixed',
    marginTop: '22.8vh',
    marginLeft: '10.7vw',
    width: '45px',
    height: '45px',
    background: COLOR2,
    borderRadius: '50px',
    opacity: '0.85'
});

export const ratingClassName: string = mergeStyles({
    color: 'white',
    position: 'relative',
    marginLeft: '0.65vw',
    marginTop: '1.3vh',
});