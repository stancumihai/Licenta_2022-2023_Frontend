import { mergeStyles } from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    display: 'grid',
    minWidth: "70%",
    position: 'fixed',
    gridTemplateColumns: 'auto auto auto auto',
    gridTemplateRows: 'auto auto',
    justifyContent: 'space-evenly',
    gridRowGap: '10vh',
    width: '70%',
    height: '70%',
    top: '15vh',
    left: '18vw',
    fontFamily: FONT_FAMILY
});