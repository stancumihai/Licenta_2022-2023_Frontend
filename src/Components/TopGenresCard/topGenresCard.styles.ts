import { mergeStyles } from 'office-ui-fabric-react';
import {
    COLOR1_D_40,
    COLOR2,
    FONT_FAMILY
} from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    display: 'flex',
    color: 'white',
    width: '150px',
    height: '50%',
    marginLeft: '20%',
});

export const genreClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    fontStyle: 'italic',
    color: COLOR1_D_40
});

export const movieEntryClassName: string = mergeStyles({
    fontSize: '15px',
    fontFamily: FONT_FAMILY,
    marginTop: '1%',
    width: '15vw',
    lineHeight: '30px',
    selectors: {
        ':hover': {
            color: COLOR2,
            cursor: 'pointer'
        }
    }
});

export const examplesMessageClassName: string = mergeStyles({
    marginTop: "14.5%",
    marginLeft: "15.5%",
    fontSize: '15px',
    fontFamily: FONT_FAMILY,
});