import { IButtonStyles } from '@fluentui/react';
import { DirectionalHint } from 'office-ui-fabric-react';

export interface IPaginatorItemProps {
    tooltipPropsContent: string | undefined;
    iconName: string;
    iconStyles?: Partial<IButtonStyles>;
    directionalHint: DirectionalHint;
    isLeft?: boolean;
    onClick: () => void;
    disabled: boolean;
};