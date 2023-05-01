import { mergeStyles } from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    color: 'white',
    width: '150px',
    height: '150px',
    display: 'flex'
});
export const knownForHeaderClassName: string = mergeStyles({
    marginTop: "14.5%",
    marginLeft: "12.5%",
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
            color: 'rgb(61,87,116)',
            cursor: 'pointer'
        },
    }
});