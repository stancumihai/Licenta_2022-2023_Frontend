import { ISpinnerStyles } from '@fluentui/react';
import { mergeStyles } from 'office-ui-fabric-react';
import { COLOR2 } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    width: '80%',
    height: '80%',
    paddingTop: "1.5%",
    marginLeft: "15%",
    boxSizing: 'border-box',
    overflow: 'hidden',
    marginTop: '5%',
    boxShadow: 'rgba(0, 0, 0, 0.35) -10px 1px 15px',
    borderRadius: '25px',
    border: '1px solid gray'
});


export const contentContainerClassName: string = mergeStyles({
    display: 'grid',
    margin: 'auto',
    gridTemplateRows: 'auto auto auto auto auto',
    gridTemplateColumns: 'auto auto',
    height: '100%'
});

export const loadingSpinnerStyle: Partial<ISpinnerStyles> = {
    root: {
        marginTop: '25vh',
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