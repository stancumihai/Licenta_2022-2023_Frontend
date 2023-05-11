import { ProfileSettings } from '../ProfileSettings/profileSettings';
import {
    advancedSearchIconClassName,
    containerClassName,
    iconProps,
    iconStyles,
    textFieldStyles,
    searchContainer
} from './navbar.styles';
import { TbListSearch } from "react-icons/tb";
import {
    useEffect,
    useState
} from 'react';
import { AdvancedSearch } from '../AdvancedSearch/advancedSearch';
import { INavbarProps } from './navbar.types';
import {
    IconButton,
    TextField
} from '@fluentui/react';

export const Navbar = (props: INavbarProps): JSX.Element => {
    const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
    const [isAdvancedSearchEnabled, setIsAdvancedSearchEnabled] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        setIsAdvancedSearchEnabled(props.areMoviesLoaded);
    }, [props.areMoviesLoaded])

    const handleOnAdvancedSearchClick = (): void => {
        setShowAdvancedSearch(true);
    };

    const handleCloseDialog = (): void => {
        setShowAdvancedSearch(false);
    };

    const handleSearchBoxChange = (event?: any, newValue?: string | undefined) => {
        setSearchText(newValue!);
    };

    const handleEnterKey = (e: any) => {
        if (e.key === 'Enter') {
            props.handleSearchboxText(searchText!);
            setSearchText('');
        }
    };

    return <div className={containerClassName}>
        <div className={searchContainer}>
            <TextField disabled={!isAdvancedSearchEnabled || props.isDashboardPageClicked}
                onChange={handleSearchBoxChange}
                value={searchText}
                onKeyDown={handleEnterKey}
                placeholder={'Search everything'}
                iconProps={iconProps}
                styles={textFieldStyles} />
            <div style={(!isAdvancedSearchEnabled || props.isDashboardPageClicked) ? { pointerEvents: 'none' } : {}}>
                <TbListSearch className={advancedSearchIconClassName}
                    onClick={handleOnAdvancedSearchClick} />
            </div>
            <AdvancedSearch isOpen={props.isAdvancedSearchClosed !== undefined ? false : showAdvancedSearch}
                handleCloseDialog={handleCloseDialog}
                collectAdvancedSearchedMovies={props.collectAdvancedSearchedMovies}
            />
            <IconButton iconProps={{ iconName: "Refresh" }}
                disabled={props.isDashboardPageClicked}
                onClick={props.handleRefreshMovies}
                styles={iconStyles} />
        </div>
        <div style={!isAdvancedSearchEnabled ? { pointerEvents: 'none' } : {}}>
            <ProfileSettings />
        </div>
    </div>
}; 