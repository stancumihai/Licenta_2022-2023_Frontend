import { FACEBOOK_LOGO_LOCATION, GOOGLE_LOGO_LOCATION, LINKEDIN_LOGO_LOCATION } from '../../Library/constants';
import { CustomIconButton } from '../CustomIconButton/customIconButton';
import { socialMediaContainerClassName } from './socialMedia.styles';

export const SocialMedia = (): JSX.Element => {

    return <div className={socialMediaContainerClassName}>
        <CustomIconButton logoLocation={FACEBOOK_LOGO_LOCATION} />
        <CustomIconButton logoLocation={GOOGLE_LOGO_LOCATION} />
        <CustomIconButton logoLocation={LINKEDIN_LOGO_LOCATION} />
    </div>
};