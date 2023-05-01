import { mergeStyles } from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    color: 'white',
    width: '150px',
    height: '150px',
    display: 'flex',
    flexDirection: 'column'
});

export const examplesMessageClassName: string = mergeStyles({
});

export const movieListContainerClassName: string = mergeStyles({
    marginLeft: '-2vw'
});

export const movieEntryClassName: string = mergeStyles({
    fontSize: '15px',
    fontFamily: FONT_FAMILY,
    marginTop: '1%',
    width: '15vw',
    lineHeight: '30px',
    selectors: {
        ':hover': {
            color: 'rgb(61,87,116)',
            cursor: 'pointer'
        }
    }
});