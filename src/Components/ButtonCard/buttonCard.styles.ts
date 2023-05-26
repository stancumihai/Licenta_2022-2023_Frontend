import { IButtonStyles, mergeStyles } from 'office-ui-fabric-react';
import {
    COLOR1,
    COLOR2_D_20,
    FONT_FAMILY
} from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    width: '15vw',
    height: '12.5vh',
    borderRadius: '10px',
    border: 'none',
    marginRight: "2vw",
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    display: 'flex',
    padding: '20px',
    boxSizing: 'border-box',
    transition: '0.5s',
    selectors: {
        ':hover': {
            cursor: 'grab',
            transition: '0.5s',
            width: '15.5vw',
            height: '13vh',
        }
    }
});

export const singleGridItemClassName: string = mergeStyles({
    position: 'relative',
    width: '33.3%',
    height: '100%',
    borderRadius: '0 10px 10px 0',
});

export const doubleGridItemClassName: string = mergeStyles({
    position: 'relative',
    width: '66.7%',
    height: '100%',
    borderRadius: '10px  0 0 10px',
});

export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        backgroundColor: 'transparent',
        marginTop: '2vh',
    },
    rootHovered: {
        backgroundColor: 'transparent',
        cursor: 'default'
    },
    rootPressed: {
        backgroundColor: 'transparent',
    },

    icon: {
        color: COLOR2_D_20,
        fontSize: '40px'
    }
};

export const mainTextClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: COLOR1,
});