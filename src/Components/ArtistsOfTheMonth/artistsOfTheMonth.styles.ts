import { IButtonStyles, ISpinnerStyles, mergeStyles } from '@fluentui/react';
import { FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(90deg, rgba(20,20,32,1), rgba(37,65,104,1) 65%, rgba(36,45,69,1) 100%)',
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
export const goBackIconStyles: Partial<IButtonStyles> = {
    root: {
        position: 'absolute',
        marginTop: '-5vh',
        marginLeft: '5vw',
        backgroundColor: 'transparent',
        color: 'white'
    },
    rootHovered: {
        color: 'rgb(61,87,116)',
        backgroundColor: 'transparent',
    },
    rootPressed: {
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
            color: 'rgb(61,87,116)',
        }
    }
});
export const loadingSpinnerStyle: Partial<ISpinnerStyles> = {
    root: {
        marginTop: '35vh',
    },
    circle: {
        width: '200px',
        height: '200px',
        borderColor: '#5149DB rgb(199, 224, 244) rgb(199, 224, 244)'
    },
    label: {
        color: '#CCCCCC',
        fontSize: '900',
    }
};