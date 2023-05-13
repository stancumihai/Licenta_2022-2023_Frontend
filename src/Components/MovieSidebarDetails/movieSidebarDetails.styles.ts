import { mergeStyles } from 'office-ui-fabric-react';

export const movieDetailsContainerClassName: string = mergeStyles({

});

export const imageClassName: string = mergeStyles({
    width: '20vw',
    height: '50vh',
    transition: 'filter 0.4s ease-in-out, opacity 0.4s ease-in-out',
    filter: 'hue-rotate(0deg)',
    borderTopLeftRadius: '10px',
    selectors: {
        ':hover': {
            filter: 'hue-rotate(90deg)',
            opacity: '0.9',
            transition: '0.5s'
        }
    }
});

export const listClassName: string = mergeStyles({
    listStyleType: 'none',
    boxSizing: 'border-box',
    padding: '20px'
});

export const listItemClassName: string = mergeStyles({
    borderBottom: '1px solid #424242',
    color: '#888',
    marginBottom: '15px'
});

export const detailSpanTitleClassName: string = mergeStyles({
    display: 'block',
    paddingBottom: '5px'
});

export const iconClassName: string = mergeStyles({
    marginLeft: '1vw'
});


export const additionalInfoClassName: string = mergeStyles({
    marginBottom: '10px'
});

export const detailsSidebarClassName: string = mergeStyles({
    flex: '0 0 33.3%',
    width: 'auto',
    height: '100%',
});