import { mergeStyles } from 'office-ui-fabric-react';
import { COLOR1, COLOR1_D_40, COLOR2, FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    width: '75vw',
    boxSizing: 'border-box',
    margin: 'auto',
    marginTop: '1.3%',
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: '1vw',
    height: '95%',
});

export const buttonContainerClassName: string = mergeStyles({
    height: '20vh',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 'auto',
    display: 'flex',
    marginTop: '5%' 
});

export const contentContainerClassName: string = mergeStyles({
    width: '100%',
    height: '80%',
    overflow: 'scroll',
    overflowX: 'hidden',
    selectors: {
        '::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
        },
        '::-webkit-scrollbar-track': {
            background: 'transparent'
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: COLOR2,
            borderRadius: '5px',
        }
    }
});

export const selectedDateInfoClassName: string = mergeStyles({
    color: COLOR1,
    fontSize: '16px',
    fontWeight: '600',
    transform: 'translate(0,-50%)',
    fontFamily: FONT_FAMILY,
});

export const calendarClassName: string = mergeStyles({
    selectors: {
        '.ms-DatePicker-goToday': {
            fontFamily: FONT_FAMILY,
            color: COLOR1,
            marginLeft: '27.5%',
            transform: 'translate(0,-10%)'
        },
        '.goToday_daee6904:hover': {
            fontFamily: FONT_FAMILY,
            color: COLOR1_D_40,
        },
        'button[role="button"].ms-DatePicker-goToday': {
            fontSize: '14px'
        },
        '.ms-DatePicker-monthOption,.ms-DatePicker-yearOption': {
            color: 'white',
            font: FONT_FAMILY,
        },
        '.monthOption_daee6904:hover,.yearOption_daee6904:hover': {
            color: 'white',
            background: COLOR1_D_40,
            font: FONT_FAMILY,
        },
        'button[role="gridcell"].ms-DatePicker-monthOption,button[role="gridcell"].ms-DatePicker-yearOption': {
            font: FONT_FAMILY,
            fontSize: '13px'
        },
        '.ms-DatePicker-day--highlighted': {
            color: COLOR1,
            background: COLOR2
        },
        '.monthIsHighlighted_daee6904.monthOption_daee6904:hover,.yearIsHighlighted_daee6904.yearOption_daee6904:hover': {
            color: COLOR1,
            background: COLOR2
        },
        '.ms-DatePicker-prevYear,.ms-DatePicker-nextYear,.ms-DatePicker-currentYear,.ms-DatePicker-prevDecade,.ms-DatePicker-nextDecade,.ms-DatePicker-currentDecade': {
            color: COLOR1,
            fontFamily: FONT_FAMILY
        },
    }
});

export const calendarContainerClassName: string = mergeStyles({
    position: 'relative',
    marginRight: '10%'
});