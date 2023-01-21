import { BACKGROUND_IMAGE_LOCATION, IMAGE_NOT_FOUND_ALTERNATE_TEXT } from '../../Library/constants';
import { backgroundImageClassName } from './background.styles';

export const Background = (): JSX.Element => {
    return <div>
        <div >
            <img className={backgroundImageClassName}
                src={BACKGROUND_IMAGE_LOCATION} alt={IMAGE_NOT_FOUND_ALTERNATE_TEXT} />
        </div>
    </div>
};