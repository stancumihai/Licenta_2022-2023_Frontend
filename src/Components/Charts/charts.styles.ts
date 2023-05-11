import { mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    width: '100%',
    height: '100%'
});

export const chartContentClassName: string = mergeStyles({
    width: '50%',
    height: '50%',
    display: 'flex',
    marginTop: '100px'
});

export const customTooltipClassName: string = mergeStyles({
    backgroundColor: 'rgb(244, 244, 244)'
})

export const chartTitleClassName: string = mergeStyles({
    textAlign: 'center',
    marginRight: '100px',
    marginBottom: '10px',
});