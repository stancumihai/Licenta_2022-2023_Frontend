import {
    IconButton,
    ITooltipHostStyles,
    ITooltipProps,
    TooltipHost
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { hostStyles } from './paginatorItem.styles';
import { IPaginatorItemProps } from './paginatorItem.types';

export const PaginatorItem = (props: IPaginatorItemProps): JSX.Element => {

    const tooltipId = useId('tooltip');

    const tooltipProps: ITooltipProps = {
        onRenderContent: () => (
            <p>{props.tooltipPropsContent}</p>
        ),
    };

    return <TooltipHost
        id={tooltipId}
        tooltipProps={tooltipProps}
        directionalHint={props.directionalHint}
        styles={hostStyles}>
        <IconButton
            style={props.isLeft ? { transform: 'rotate(180deg)', } : {}}
            aria-describedby={tooltipId}
            styles={props.iconStyles ?? props.iconStyles!}
            iconProps={{ iconName: props.iconName }} />
    </TooltipHost>

};  