import { IconButton } from '@fluentui/react';
import {
    containerClassName,
    doubleGridItemClassName,
    iconButtonStyles,
    mainTextClassName,
    singleGridItemClassName
} from './buttonCard.styles';
import { IButtonCardProps } from './buttonCard.types';

export const ButtonCard = (props: IButtonCardProps): JSX.Element => {
    return <div className={containerClassName} onClick={props.onClick}>
        <div className={doubleGridItemClassName}>
            <h2 className={mainTextClassName}>100</h2>
            <p className={mainTextClassName}>{props.text}</p>
        </div>
        <div className={singleGridItemClassName}>
            <IconButton iconProps={{ iconName: props.iconName }}
                styles={iconButtonStyles} />
        </div>
    </div>
};