import { mergeStyles } from 'office-ui-fabric-react';
import { COLOR1_D_40, COLOR2, FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    display: 'flex',
    color: 'white',
    width: '150px',
    height: '130px',
    marginLeft: '20%',
});
export const knownForHeaderClassName: string = mergeStyles({
    marginTop: "14.5%",
    marginLeft: "15.5%",
    fontSize: '15px',
    fontFamily: FONT_FAMILY,
});
export const knownForMovieEntryClassName: string = mergeStyles({
    fontSize: '15px',
    fontFamily: FONT_FAMILY,
    marginTop: '1%',
    width: '15vw',
    selectors: {
        ':hover': {
            color: COLOR2,
            cursor: 'pointer'
        },
    }
});

export const personNameClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontStyle: 'italic',
    color: COLOR1_D_40
});