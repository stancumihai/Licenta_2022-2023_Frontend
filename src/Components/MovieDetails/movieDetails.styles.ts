import { mergeStyles } from 'office-ui-fabric-react';
import { FONT_FAMILY } from '../../Library/constants';

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
    lineHeight: "0"
});