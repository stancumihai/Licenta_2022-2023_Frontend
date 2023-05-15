import { mergeStyles } from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    transform: 'translate(0,25%)',
    height: '50%',
    width: '75%',
    margin: 'auto',
    gridRowGap: '100px',
    justifyContent: ' space-around',
    padding: '3%',
    paddinTop: '50vh',
    boxSizing: 'border-box',
});

export const titleClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    fontStyle: 'normal',
    height: '56px',
    fontWeight: '700',
    fontSize: '54px',
    lineHeight: '75px',
    color: 'white',
    position: "absolute",
    left: '25%',
    marginTop: '5vh',
});