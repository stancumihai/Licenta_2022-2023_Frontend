import { IMAGE_NOT_FOUND_ALTERNATE_TEXT, LOGO_IMAGE_LOCATION } from '../../Library/constants';
import { containerClassName, mainLogoClassName, mainTextClassName } from './logo.styles';
import { ILogoProps } from './logo.types';

export const Logo = (props: ILogoProps): JSX.Element => {
    if (props.mainLogoClassName !== undefined && props.mainTextClassName !== undefined) {

        return <div className={containerClassName}>
            <img className={props.mainLogoClassName!} src={LOGO_IMAGE_LOCATION}
                alt={IMAGE_NOT_FOUND_ALTERNATE_TEXT} />
            <h3 className={props.mainTextClassName!}>Statflix</h3>
        </div>
    }
    return <div style={{ display: 'flex' }}>
        <img className={mainLogoClassName} src={LOGO_IMAGE_LOCATION}
            alt={IMAGE_NOT_FOUND_ALTERNATE_TEXT} />
        <h3 className={mainTextClassName}>Statflix</h3>
    </div>
};