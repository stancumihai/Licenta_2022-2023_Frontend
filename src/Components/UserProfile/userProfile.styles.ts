import { mergeStyles } from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';
import { IButtonStyles, ITextFieldStyles } from '@fluentui/react';

export const containerClassName: string = mergeStyles({
    height: '100vh',
    background: 'linear-gradient(90deg, rgba(20,20,32,1), rgba(37,65,104,1) 65%, rgba(36,45,69,1) 100%)',
    overflow: 'hidden'
});

export const contentClassName: string = mergeStyles({
    width: '20%',
    margin: 'auto',
    height: "70%",
    transform: 'translate(0%,15%)'
});

export const labelClassName: string = mergeStyles({
    color: 'white',
    fontFamily: FONT_FAMILY
});

export const textFieldStyles: Partial<ITextFieldStyles> = {

};

export const goBackIconStyles: Partial<IButtonStyles> = {
    root: {
        position: 'absolute',
        marginLeft: '5vw',
        marginTop: '5vh',
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
    marginTop: '5vh',
    marginLeft: '7.5vw',
    fontSize: '30px',
    fontFamily: FONT_FAMILY,
    selectors: {
        ':hover': {
            color: 'rgb(61,87,116)',
        }
    }
});