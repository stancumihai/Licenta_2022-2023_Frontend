import { ProfileSettings } from '../ProfileSettings/profileSettings';
import {
    advancedSearchIconClassName,
    containerClassName,
    iconProps,
    iconStyles,
    textFieldStyles,
    searchContainer,
    messageBarStyles
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
import UserContext from '../../Contexts/User/userContext';
import { IUserContext } from '../../Contexts/User/userContext.types';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { HOME_PATH, PROFILE_NOT_YEY_CREATED_WARNING } from '../../Library/constants';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { UserType } from '../../Enums/UserType';
import {
    NavigateFunction,
    useNavigate,
} from 'react-router';

export const Navbar = (): JSX.Element => {
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const movieContext: IMovieContext = useContext(MovieContext);
    const userContext: IUserContext = useContext(UserContext);
    const uiContext: IUiContext = useContext(UiContext);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');
    const [isRefreshConfirmationDisplayed, setIsRefreshConfirmationDisplayed] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    const isAdmin = (): boolean => {
        return authenticationContext.User.role === UserType.Administrator;
    };

    const currentUserHasProfile = (): boolean => {
        return userContext.users.filter((u: IUserProfileRead) => u.userUid === authenticationContext.User.uid!)[0] != null || isAdmin();;
    };

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
            if (!isOnUserContext()) {
                const searchedMovies: IMovie[] = movieContext.currentUsedMovies.filter((movie: IMovie) =>
                    movie.title.toLowerCase().includes(searchText) ||
                    movie.title.includes(searchText));
                movieContext.setCurrentMovies(IMovieContextType.NONE, searchedMovies);
                setSearchText('');
                uiContext.setSpinnerState(true, 1000);
                return;
            }
            const searchedUsers: IUserProfileRead[] = userContext.users.filter((user: IUserProfileRead) =>
                user.fullName.toLowerCase().includes(searchText) ||
                user.fullName.includes(searchText));
            userContext.setCurrentUsers(searchedUsers);
            setSearchText('');
        }
    };

    const handleRefreshButtonClick = (): void => {
        setIsRefreshConfirmationDisplayed(true);
    };

    const handlRefreshCloseDialog = (accepted?: boolean): void => {
        if (accepted === true) {
            const list = $('.list');
            const homeElement = list[0];
            if (homeElement instanceof HTMLElement) {
                const element: HTMLElement = homeElement as HTMLElement;
                let j: number = 0;
                while (j < list.length) {
                    list[j++].className = 'list';
                }
                element.className = 'list active';
            }
            navigate(HOME_PATH);
            movieContext.setCurrentMovies(IMovieContextType.HOME);
        }
        setIsRefreshConfirmationDisplayed(false);
    };

    const isOnUserContext = (): boolean => {
        return window.location.href === 'http://localhost:3000/users';
    };

    return <div className={containerClassName}>
        <div className={searchContainer}>
            {uiContext.shoudDisplaySearch ? <TextField
                disabled={!currentUserHasProfile()}
                onChange={handleSearchBoxChange}
                value={searchText}
                onKeyDown={handleSearchBarEnterKeyPressed}
                placeholder={isOnUserContext() ? 'Search user' : 'Search movie'}
                iconProps={iconProps}
                styles={textFieldStyles} /> : <></>}
            {uiContext.shoudDisplaySearch && !isOnUserContext() ? <TbListSearch className={advancedSearchIconClassName}
                onClick={handleOnAdvancedSearchClick} /> : <></>}
            <AdvancedSearch isOpen={showAdvancedSearch && currentUserHasProfile()}
                handleCloseDialog={handleCloseDialog} />
            {
                uiContext.shoudDisplaySearch && !isOnUserContext() ?
                    <IconButton iconProps={{ iconName: "Refresh" }}
                        disabled={!currentUserHasProfile()}
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
        <div style={currentUserHasProfile() ||
            authenticationContext.User.role === UserType.Administrator ? { display: 'none' } : {}}>
            <MessageBar messageBarType={MessageBarType.severeWarning}
                isMultiline={false}
                styles={messageBarStyles} >
                {PROFILE_NOT_YEY_CREATED_WARNING}
            </MessageBar>
        </div>
        <ProfileSettings />
    </div >
}; 