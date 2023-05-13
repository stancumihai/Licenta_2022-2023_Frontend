import {
    IconButton,
    ITooltipProps,
    TooltipHost
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { calloutStyles } from './paginatorItem.styles';
import { IPaginatorItemProps } from './paginatorItem.types';

export const PaginatorItem = (props: IPaginatorItemProps): JSX.Element => {
    const tooltipId = useId('tooltip');

    const tooltipProps: ITooltipProps = {
        onRenderContent: () => (
            <p>{props.tooltipPropsContent}</p>
        ),
    };

    return <TooltipHost
        calloutProps={{ styles: calloutStyles }}
        id={tooltipId}
        tooltipProps={props.tooltipPropsContent === undefined ? undefined : tooltipProps}
        directionalHint={props.directionalHint}>
        <IconButton disabled={props.disabled}
            onClick={props.onClick}
            style={props.isLeft ? { transform: 'rotate(180deg)' } : {}}
            aria-describedby={tooltipId}
            styles={props.iconStyles ?? props.iconStyles!}
            iconProps={{ iconName: props.iconName }} />
    </TooltipHost>
};  