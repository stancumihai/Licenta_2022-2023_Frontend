import { IButtonStyles, ISpinnerStyles, mergeStyles } from '@fluentui/react';
import { COLOR2, COLOR2_D_20, FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(90deg, rgba(18,19,36,1) 0%, rgba(28,28,66,1) 49%, rgba(38,29,57,1) 100%)',
    overflow: 'hidden',
});

export const contentContainerClassName: string = mergeStyles({
    width: '80vw',
    height: '50vh',
    margin: 'auto',
    marginTop: '7.5%',
    display: 'grid',
    gridTemplateRows: 'auto auto auto auto auto',
    gridTemplateColumns: 'auto auto',
});
export const loadingSpinnerStyle: Partial<ISpinnerStyles> = {
    root: {
        marginTop: '35vh',
    },
    circle: {
        width: '200px',
        height: '200px',
        borderColor: `${COLOR2} #5d246c`
    },
    label: {
        color: '#CCCCCC',
        fontSize: '900',
    }
};
export const goBackIconStyles: Partial<IButtonStyles> = {
    root: {
        position: 'absolute',
        marginTop: '-5vh',
        marginLeft: '5vw',
        backgroundColor: 'transparent',
        color: 'white'
    },
    rootHovered: {
        color: COLOR2,
        backgroundColor: 'transparent',
    },
    rootPressed: {
        color: COLOR2_D_20,
        backgroundColor: 'transparent',
    },
    icon: {
        fontSize: '25px'
    }
};
export const homePageTextClassName: string = mergeStyles({
    color: 'white',
    display: 'inline',
    position: 'absolute',
    marginTop: '-5vh',
    marginLeft: '7.5vw',
    fontSize: '30px',
    fontFamily: FONT_FAMILY,
    selectors: {
        ':hover': {
            color: COLOR2,
        }
    }
});