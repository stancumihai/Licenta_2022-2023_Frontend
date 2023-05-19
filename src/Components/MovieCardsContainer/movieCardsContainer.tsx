import { useContext, useEffect, useState } from 'react';
import { IMovie } from '../../Models/IMovie';
import { MovieCard } from '../MovieCard/movieCard';
import { containerClassName } from './movieCardsContainer.styles';
import { IMovieCardsContainerProps } from './movieCardsContainer.types';
import UserContext from '../../Contexts/User/userContext';
import { IUserContext } from '../../Contexts/User/userContext.types';
import { IUserProfileRead } from '../../Models/UserProfile/IUserProfileRead';
import AuthentificationContext from '../../Contexts/Authentication/authenticationContext';
import { IAuthentificationContext } from '../../Contexts/Authentication/authenticationContext.types';
import { UserType } from '../../Enums/UserType';

export const MovieCardsContainer = (props: IMovieCardsContainerProps): JSX.Element => {
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const userContext: IUserContext = useContext(UserContext);
    const [pageChangeHelper, setPageChangeHelper] = useState<boolean>(false);

    useEffect(() => {
        setPageChangeHelper(true);
    }, [props.moviesToDisplayInPage]);

    const isAdmin = (): boolean => {
        return authenticationContext.User.role === UserType.Administrator;
    };

    const currentUserHasProfile = (): boolean => {
        return userContext.users.filter((u: IUserProfileRead) => u.userUid === authenticationContext.User.uid!)[0] != null || isAdmin();;
    };

    return <div style={!currentUserHasProfile() ? { pointerEvents: 'none' } : {}}
        className={containerClassName}>
        {props.moviesToDisplayInPage.map((movie: IMovie, i: number) => {
            return <MovieCard key={i}
                pageChangeHelper={pageChangeHelper}
                movieUid={movie.uid!}
                name={movie.title}
                genres={movie.genres} />
        })}
    </div>
};