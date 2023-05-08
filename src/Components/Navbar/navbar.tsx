import { SearchBox } from 'office-ui-fabric-react';
import { ProfileSettings } from '../ProfileSettings/profileSettings';
import {
    advancedSearchIconClassName,
    containerClassName,
    iconProps,
    iconStyles,
    searchBoxStyles,
    searchContainer
} from './navbar.styles';
import { TbListSearch } from "react-icons/tb";
import { useEffect, useState } from 'react';
import { AdvancedSearch } from '../AdvancedSearch/advancedSearch';
import { INavbarProps } from './navbar.types';
import { IconButton } from '@fluentui/react';

export const Navbar = (props: INavbarProps): JSX.Element => {
    const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
    const [isAdvancedSearchEnabled, setIsAdvancedSearchEnabled] = useState<boolean>(false);

    useEffect(() => {
        setIsAdvancedSearchEnabled(props.areMoviesLoaded);
    }, [props.areMoviesLoaded])

    const handleOnAdvancedSearchClick = (): void => {
        setShowAdvancedSearch(true);
    };

    const handleCloseDialog = (): void => {
        setShowAdvancedSearch(false);
    };

    return <div className={containerClassName}>
        <div className={searchContainer}>
            <SearchBox disabled={!isAdvancedSearchEnabled}
                placeholder={'Search everything'}
                iconProps={iconProps}
                styles={searchBoxStyles} />
            <div style={!isAdvancedSearchEnabled ? { pointerEvents: 'none' } : {}}>
                <TbListSearch className={advancedSearchIconClassName}
                    onClick={handleOnAdvancedSearchClick} />
            </div>
            <AdvancedSearch isOpen={props.isAdvancedSearchClosed !== undefined ? false : showAdvancedSearch}
                handleCloseDialog={handleCloseDialog}
                collectAdvancedSearchedMovies={props.collectAdvancedSearchedMovies}
            />
            <IconButton iconProps={{ iconName: "Refresh" }}
                onClick={props.handleRefreshMovies}
                styles={iconStyles} />
        </div>
        <div style={!isAdvancedSearchEnabled ? { pointerEvents: 'none' } : {}}>
            <ProfileSettings />
        </div>
    </div>
}; 