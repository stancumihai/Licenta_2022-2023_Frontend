import { GOOGLE_LOGO_LOCATION, IMAGE_NOT_FOUND_ALTERNATE_TEXT } from '../../Library/constants';
import { customIconClassName, customIconClassNameSpecial } from './customIconButton.styles';
import { ICustomIconButtonProps } from './customIconButton.types';

export const CustomIconButton = (props: ICustomIconButtonProps): JSX.Element => {
    return <div>
        <img
            className={props.className ?
                props.className :
                (props.logoLocation === GOOGLE_LOGO_LOCATION ? customIconClassNameSpecial : customIconClassName)}
            src={props.logoLocation}
            alt={IMAGE_NOT_FOUND_ALTERNATE_TEXT}>
        </img>
    </div>
};