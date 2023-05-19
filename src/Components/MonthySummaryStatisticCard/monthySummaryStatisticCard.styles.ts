import { mergeStyles } from '@fluentui/react';
import { COLOR1, COLOR1_D_40, COLOR2, FONT_FAMILY } from '../../Library/constants';

export const statisticsCardContainerClassName: string = mergeStyles({
    width: '250px',
    height: '200px',
    padding: '10px',
    boxSizing: 'border-box',
    background: COLOR1_D_40,
    borderRadius: '10px',
    marginBottom: '10%',
});

export const listItemClassName: string = mergeStyles({
    color: COLOR1,
    display: 'flex',
    justifyContent: 'left',
    fontFamily: FONT_FAMILY,
    selectors: {
        ':hover': {
            color: COLOR2
        }
    }
});

export const unorderedListClassName: string = mergeStyles({
    textAlign: 'center',
    margin: 'auto',
    lineHeight: '30px'
});