import { mergeStyles } from '@fluentui/react';

export const socialMediaContainerClassName: string = mergeStyles({
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    position: 'absolute',
    left: '47.5%',
    zIndex: '100',
    top: '10px'
});