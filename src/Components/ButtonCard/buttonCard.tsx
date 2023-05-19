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

    const handleClick = (ev: any) => {
        props.onClick();
        $(ev.currentTarget).parent().children().each((i, el) => {
            if ($(el).attr('id') === props.id) {
                $(el).css('background-color', 'rgba(255, 255, 255 , 0.1)');
                return;
            }
            $(el).css('background-color', 'transparent');
        });
    };

    return <div id={props.id}
        style={props.leftMargin === true ? { marginLeft: '10%' } : {}}
        className={containerClassName}
        onClick={handleClick}>
        <div className={doubleGridItemClassName}>
            <h2 className={mainTextClassName}>{props.count}</h2>
            <p className={props.mainTextClassName !== undefined ?
                props.mainTextClassName :
                mainTextClassName}>{props.text}</p>
        </div>
        <div className={singleGridItemClassName}>
            <IconButton iconProps={{ iconName: props.iconName }}
                styles={iconButtonStyles} />
        </div>
    </div>
};