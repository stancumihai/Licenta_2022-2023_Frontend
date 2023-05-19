import { ISpinnerStyles } from '@fluentui/react';
import { mergeStyles } from 'office-ui-fabric-react';
import { COLOR2 } from './Library/constants';

export const containerClassName: string = mergeStyles({
    background: 'linear-gradient(90deg, rgba(18,19,36,1) 0%, rgba(28,28,66,1) 49%, rgba(38,29,57,1) 100%)',
    width: '100vw',
    height: '100vh',
    overflowX: 'hidden'
});

export const mainContentClassName: string = mergeStyles({
    width: '88%',
    marginLeft: '8.75%',
    height: '89%',
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

export const loadingSpinnerContainer: string = mergeStyles({
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    paddingTop: '10%',
    background: 'linear-gradient(90deg, rgba(18,19,36,1) 0%, rgba(28,28,66,1) 49%, rgba(38,29,57,1) 100%)',
    zIndex: '2'
});