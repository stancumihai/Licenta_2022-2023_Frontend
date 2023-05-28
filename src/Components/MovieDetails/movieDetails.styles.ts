import { mergeStyles } from 'office-ui-fabric-react';
import { COLOR1, COLOR1_D_40, COLOR2, COLOR2_D_20, COLOR2_D_40, FONT_FAMILY } from '../../Library/constants';
import { IButtonStyles, IRatingStyles } from '@fluentui/react';

export const containerClassName: string = mergeStyles({
    padding: '5vh',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '2px',
    boxSizing: 'border-box'
});

export const listClassName: string = mergeStyles({
    marginTop: '7vh',
    marginLeft: '-2vw',
    listStyleType: 'none',
    boxSizing: 'border-box',
});

export const titleClassName: string = mergeStyles({
    marginTop: '2vh',
    lineHeight: 1.3,
    fontHeight: 700,
    marginLeft: '0.3vw',
    color: 'white',
    fontSize: '3vh',
    letterSpacing: '1px'
});

export const listItemClassName: string = mergeStyles({
    color: '#888',
});

export const detailSpanTitleClassName: string = mergeStyles({
    display: 'block',
    fontFamily: FONT_FAMILY,
    fontWeight: '900',
    marginTop: '2vh',
});

export const paragraphListingClassName: string = mergeStyles({
    display: 'inline-block',
    marginRight: '5px',
    lineHeight: "0",
    selectors: {
        ':hover': {
            color: COLOR2
        }
    }
});

export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: COLOR2_D_20,
        marginLeft: '-50%',
        backgroundColor: 'transparent',
    },
    rootHovered: {
        color: COLOR2_D_40,
        backgroundColor: 'transparent',
    },
    rootPressed: {
        color: COLOR2_D_20,
        backgroundColor: 'transparent',
    },
    icon: {
        fontSize: '20px'
    }
};

export const iconClassName: string = mergeStyles({
    width: '2.5vw',
    height: '2.5vh',
    color: 'white',
    marginBottom: '1vh',
    selectors: {
        ":hover": {
            color: '#888',
            cursor: 'pointer'
        },
        ":active": {
            color: '#666',
        }
    }
});

export const disabledIconClassName: string = mergeStyles({
    color: 'rgb(255, 193, 7)',
    width: '2.5vw',
    height: '2.5vh',
    marginBottom: '1vh',
    selectors: {
        ":hover": {
            color: '#b78900',
            cursor: 'pointer'
        },
        ":active": {
            color: '#836200',
        }
    }
});

export const iconContainerClassName: string = mergeStyles({
    marginLeft: '40vh',
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
});

export const buttonTextClassName: string = mergeStyles({
    color: 'white',
    fontFamily: FONT_FAMILY,
    display: 'inline-block',
    position: 'relative',
    bottom: '1.05vh',
    marginLeft: '10px',
    selectors: {
        ":hover": {
            color: '#888',
            cursor: 'pointer'
        },
        ":active": {
            color: '#666',
        }
    }
});

export const disabledButtonTextClassName: string = mergeStyles({
    pointerEvents: 'none',
    color: 'rgb(255, 193, 7)',
    fontFamily: FONT_FAMILY,
    display: 'inline-block',
    position: 'relative',
    bottom: '1.05vh',
    selectors: {
        ":hover": {
            cursor: 'pointer',
            color: 'red'
        },
        ":active": {
            color: '#666',
        }
    }
});

export const ratingStyles: Partial<IRatingStyles> = {
    ratingStarFront: {
        color: '#FFC107',
    },
    ratingButton: {
        selectors: {
            ':hover .ms-RatingStar-front': {
                color: '#b78900'
            },
            ':hover .ms-RatingStar-back': {
                color: '#b78900'
            }
        }
    }
};

export const seenMoviesCountClassName: string = mergeStyles({
    color: COLOR1,
    fontFamily: FONT_FAMILY,
    position: 'absolute',
    left: '6vw',
    bottom: '1.4vh',
    marginLeft: '0.3vw',
    selectors: {
        ':hover': {
            color: COLOR1_D_40,
            cursor: 'pointer'
        }
    }
});