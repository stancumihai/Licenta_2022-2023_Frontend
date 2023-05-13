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
    useContext,
    useState
} from 'react';
import { AdvancedSearch } from '../AdvancedSearch/advancedSearch';
import {
    IconButton,
    TextField
} from '@fluentui/react';
import { CustomDialog } from '../CustomDialog/customDialog';
import MovieContext from '../../Contexts/Movie/movieContext';
import { IMovieContext } from '../../Contexts/Movie/movieContext.types';
import { IMovieContextType } from '../../Enums/movieContextType';
import { IMovie } from '../../Models/IMovie';
import UiContext from '../../Contexts/Ui/uiContext';
import { IUiContext } from '../../Contexts/Ui/uiContext.types';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import { UserType } from '../../Enums/UserType';

export const Navbar = (): JSX.Element => {
    const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [isRefreshConfirmationDisplayed, setIsRefreshConfirmationDisplayed] = useState<boolean>(false);
    const movieContext: IMovieContext = useContext(MovieContext);
    const uiContext: IUiContext = useContext(UiContext);
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);

    const handleOnAdvancedSearchClick = (): void => {
        setShowAdvancedSearch(true);
    };

    const handleCloseDialog = (): void => {
        setShowAdvancedSearch(false);
    };

    const handleSearchBoxChange = (event?: any, newValue?: string | undefined) => {
        setSearchText(newValue!);
    };

    const handleSearchBarEnterKeyPressed = (e: any) => {
        if (e.key === 'Enter') {
            const searchedMovies: IMovie[] = movieContext.movies.filter((movie: IMovie) => movie.title.includes(searchText));
            movieContext.setCurrentMovies(IMovieContextType.NONE, searchedMovies);
            setSearchText('');
            uiContext.setSpinnerState(true);
        }
    };

    const handleRefreshButtonClick = (): void => {
        setIsRefreshConfirmationDisplayed(true);
    };

    const handlRefreshCloseDialog = (): void => {
        setIsRefreshConfirmationDisplayed(false);
        movieContext.setCurrentMovies(IMovieContextType.HOME);
    };

    const isAdmin = (): boolean => {
        return authenticationContext.User.role === UserType.Administrator;
    };

    return <div className={containerClassName}>
        <div className={searchContainer}>
            {uiContext.shoudDisplaySearch ? <TextField
                onChange={handleSearchBoxChange}
                value={searchText}
                onKeyDown={handleSearchBarEnterKeyPressed}
                placeholder={isAdmin() ? 'Search user' : 'Search movie'}
                iconProps={iconProps}
                styles={textFieldStyles} /> : <></>}
            {uiContext.shoudDisplaySearch && !isAdmin() ? <TbListSearch className={advancedSearchIconClassName}
                onClick={handleOnAdvancedSearchClick} /> : <></>}
            <AdvancedSearch isOpen={showAdvancedSearch}
                handleCloseDialog={handleCloseDialog} />
            {
                uiContext.shoudDisplaySearch && !isAdmin() ?
                    <IconButton iconProps={{ iconName: "Refresh" }}
                        onClick={handleRefreshButtonClick}
                        styles={iconStyles} /> : <></>
            }
            {<CustomDialog
                mainText={"Are you sure you want to refresh movies?"}
                isHidden={!isRefreshConfirmationDisplayed}
                handleCloseDialog={handlRefreshCloseDialog}
                acceptedText="Yes"
                cancelText='No' />}
        </div>
        <ProfileSettings />
    </div >
}; 