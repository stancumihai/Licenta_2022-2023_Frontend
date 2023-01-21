import { IMAGE_NOT_FOUND_ALTERNATE_TEXT, LOGO_IMAGE_LOCATION } from '../../Library/constants';
import { mainLogoClassName, mainTextClassName } from './logo.styles';

export const Logo = (): JSX.Element => {

    return <div>
        <img className={mainLogoClassName} src={LOGO_IMAGE_LOCATION}
            alt={IMAGE_NOT_FOUND_ALTERNATE_TEXT} />
        <h3 className={mainTextClassName}>Statflix</h3>
    </div>
};