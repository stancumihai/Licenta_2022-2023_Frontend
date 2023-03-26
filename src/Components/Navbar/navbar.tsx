import { SearchBox } from 'office-ui-fabric-react';
import { ProfileSettings } from '../ProfileSettings/profileSettings';
import {
    containerClassName,
    iconProps,
    searchBoxStyles
} from './navbar.styles';

export const Navbar = (): JSX.Element => {

    return <div className={containerClassName}>
        <SearchBox placeholder={'Search everything'}
            iconProps={iconProps}
            styles={searchBoxStyles} />
        <ProfileSettings />
    </div>
};