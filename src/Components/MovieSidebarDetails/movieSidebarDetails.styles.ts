import { mergeStyles } from 'office-ui-fabric-react';

export const movieDetailsContainerClassName: string = mergeStyles({

});

export const imageClassName: string = mergeStyles({
    width: '20vw',
    height: '50vh',
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