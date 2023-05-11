import { mergeStyles } from 'office-ui-fabric-react';
import { COLOR2 } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
});

export const navigationClassName: string = mergeStyles({
    listStyle: 'none',
    position: 'fixed',
    top: "20px",
    bottom: "20px",
    left: '20px',
    background: COLOR2,
    width: '300px',
    borderRadius: '10px',
    borderLeft: `5px solid ${COLOR2}`,
    boxSizing: "initial",
    transition: 'width 0.5s'
});

export const navigationUlClassName: string = mergeStyles({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    paddingLeft: "5px",
    paddingTop: '40px'
});

export const listClassName: string = mergeStyles({
    position: "relative",
    listStyle: "none",
    width: '100%',
});

export const activeListClassName: string = mergeStyles({
    background: "white",
    listStyle: "none",
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px'
});

export const anchorClassName: string = mergeStyles({
    position: 'relative',
    width: '100%',
    display: 'flex',
    textDecoration: 'none',
    color: 'white'
});

export const activeAnchorClassName: string = mergeStyles({
    position: 'relative',
    width: '100%',
    display: 'flex',
    textDecoration: 'none',
    color: '#333'
});

export const iconSpanClassName: string = mergeStyles({
    position: 'relative',
    display: 'block',
    minWidth: '60px',
    height: '60px',
    lineHeight: '60px',
    textAlign: 'center'
});

export const titleSpanClassName: string = mergeStyles({
    position: 'relative',
    display: 'block',
    paddingLeft: '10px',
    height: '60px',
    lineHeight: '60px',
    whiteSpace: 'normal'
});