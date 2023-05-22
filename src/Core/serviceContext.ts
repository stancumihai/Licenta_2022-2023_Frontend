import React from 'react'
import {
    SURVEY_ANSWERS_ENDPONT,
    USER_ENDPOINT,
    SURVEY_QUESTIONS_ENDPONT,
    MOVIE_ENDPOINT,
    MOVIE_RATING_ENDPOINT,
    PERSON_ENDPOINT,
    KNOWN_FOR_ENDPOINT,
    LIKED_MOVIE_ENDPOINT,
    MOVIE_SUBSCRIPTIONS_ENDPOINT,
    SEEN_MOVIE_ENDPOINT,
    USER_MOVIE_RATING_ENDPOINT,
    SURVEY_USER_ANSWER_ENDPOINT,
    USER_PROFILE_ENDPOINT,
    RECOMMENDATIONS_ENDPOINT,
    ALGORITHM_CHANGES_ENDPOINT,
    USER_MOVIES_SEARCHES_ENDPOINT,
    PREDICTED_GENRES_ENDPOINT,
    PREDICTED_MOVIES_COUNT_ENDPOINT,
    PREDICTED_MOVIES_RUNTIME_ENDPOINT
} from '../Library/constants';
import AuthenticationService from '../Services/authenticationService';
import KnownForService from '../Services/knownForService';
import MovieRatingsService from '../Services/movieRatingsService';
import MoviesService from '../Services/moviesService';
import PersonsService from '../Services/personsService';
import SurveyAnswersService from '../Services/surveyAnswersService';
import SurveyQuestionsService from '../Services/surveyQuestionsService';
import SurveyUserAnswerService from '../Services/surveyUserAnswerService';
import UsersService from '../Services/userService';
import LikedMoviesService from '../Services/likedMoviesService';
import MovieSubscriptionsService from '../Services/movieSubscriptionsService';
import SeenMoviesService from '../Services/seenMovieService';
import UserMovieRatingsService from '../Services/userMovieRatings';
import UserProfilesService from '../Services/userProfilesService';
import RecommendationService from '../Services/recommendationsService';
import AlgorithmChangesService from '../Services/algorithmChangesService';
import UserMovieSearchesService from '../Services/userMovieSearchesService';
import PredictedGenresService from '../Services/predictedGenresService';
import PredictedMoviesCountService from '../Services/predictedMoviesCountService';
import PredictedMoviesRuntimeService from '../Services/predictedMoviesRuntimeService';

export class ServiceContext {
    private _surveyQuestionsService?: SurveyQuestionsService;
    private _surveyAnswersService?: SurveyAnswersService;
    private _authenticationService?: AuthenticationService;
    private _surveyUserAnswerService?: SurveyUserAnswerService;
    private _userService?: UsersService;
    private _moviesService?: MoviesService;
    private _moviesRatingService?: MovieRatingsService;
    private _personsService?: PersonsService;
    private _knownForService?: KnownForService;
    private _likedMoviesService?: LikedMoviesService;
    private _movieSubscriptionsService?: MovieSubscriptionsService;
    private _seenMoviesService?: SeenMoviesService;
    private _userMovieRatingsService?: UserMovieRatingsService;
    private _userProfilesService?: UserProfilesService;
    private _recommendationService?: RecommendationService;
    private _algorithmChangesService?: AlgorithmChangesService;
    private _userMovieSearchesService?: UserMovieSearchesService;
    private _predictedGenresService?: PredictedGenresService;
    private _predictedMoviesCountService?: PredictedMoviesCountService;
    private _predictedMoviesRuntimeService?: PredictedMoviesRuntimeService;

    get SurveyUserAnswerService(): SurveyUserAnswerService {
        if (this._surveyUserAnswerService == null) {
            this._surveyUserAnswerService = new SurveyUserAnswerService(SURVEY_USER_ANSWER_ENDPOINT);
        }
        return this._surveyUserAnswerService;
    };


    get SurveyQuestionsService(): SurveyQuestionsService {
        if (this._surveyQuestionsService == null) {
            this._surveyQuestionsService = new SurveyQuestionsService(SURVEY_QUESTIONS_ENDPONT);
        }
        return this._surveyQuestionsService;
    };

    get SurveyAnswersService(): SurveyAnswersService {
        if (this._surveyAnswersService == null) {
            this._surveyAnswersService = new SurveyAnswersService(SURVEY_ANSWERS_ENDPONT);
        }
        return this._surveyAnswersService;
    };

    get AuthenticationService(): AuthenticationService {
        if (this._authenticationService == null) {
            this._authenticationService = new AuthenticationService();
        }
        return this._authenticationService;
    };

    get UserService(): UsersService {
        if (this._userService == null) {
            this._userService = new UsersService(USER_ENDPOINT);
        }
        return this._userService;
    }

    get MovieService(): MoviesService {
        if (this._moviesService == null) {
            this._moviesService = new MoviesService(MOVIE_ENDPOINT);

        }
        return this._moviesService;
    };

    get MovieRatingsService(): MovieRatingsService {
        if (this._moviesRatingService == null) {
            this._moviesRatingService = new MovieRatingsService(MOVIE_RATING_ENDPOINT);
        }
        return this._moviesRatingService;
    };

    get PersonsService(): PersonsService {
        if (this._personsService == null) {
            this._personsService = new PersonsService(PERSON_ENDPOINT);
        }
        return this._personsService;
    };

    get KnownForService(): KnownForService {
        if (this._knownForService == null) {
            this._knownForService = new KnownForService(KNOWN_FOR_ENDPOINT);
        }
        return this._knownForService;
    };

    get LikedMoviesService(): LikedMoviesService {
        if (this._likedMoviesService == null) {
            this._likedMoviesService = new LikedMoviesService(LIKED_MOVIE_ENDPOINT);
        }
        return this._likedMoviesService;
    };

    get MovieSubscriptionsService(): MovieSubscriptionsService {
        if (this._movieSubscriptionsService == null) {
            this._movieSubscriptionsService = new MovieSubscriptionsService(MOVIE_SUBSCRIPTIONS_ENDPOINT);
        }
        return this._movieSubscriptionsService;
    };

    get SeenMoviesService(): SeenMoviesService {
        if (this._seenMoviesService == null) {
            this._seenMoviesService = new SeenMoviesService(SEEN_MOVIE_ENDPOINT);
        }
        return this._seenMoviesService;
    };

    get UserMovieRatingsService(): UserMovieRatingsService {
        if (this._userMovieRatingsService == null) {
            this._userMovieRatingsService = new UserMovieRatingsService(USER_MOVIE_RATING_ENDPOINT);
        }
        return this._userMovieRatingsService;
    };

    get UserProfilesService(): UserProfilesService {
        if (this._userProfilesService == null) {
            this._userProfilesService = new UserProfilesService(USER_PROFILE_ENDPOINT);
        }
        return this._userProfilesService;
    };

    get RecommendationService(): RecommendationService {
        if (this._recommendationService == null) {
            this._recommendationService = new RecommendationService(RECOMMENDATIONS_ENDPOINT);
        }
        return this._recommendationService;
    };

    get AlgorithmChangesService(): AlgorithmChangesService {
        if (this._algorithmChangesService == null) {
            this._algorithmChangesService = new AlgorithmChangesService(ALGORITHM_CHANGES_ENDPOINT);
        }
        return this._algorithmChangesService;
    };

    get UserMovieSearchesService(): UserMovieSearchesService {
        if (this._userMovieSearchesService == null) {
            this._userMovieSearchesService = new UserMovieSearchesService(USER_MOVIES_SEARCHES_ENDPOINT);
        }
        return this._userMovieSearchesService;
    };
    get PredictedGenresService(): PredictedGenresService {
        if (this._predictedGenresService == null) {
            this._predictedGenresService = new PredictedGenresService(PREDICTED_GENRES_ENDPOINT);
        }
        return this._predictedGenresService;
    };
    get PredictedMoviesCountService(): PredictedMoviesCountService {
        if (this._predictedMoviesCountService == null) {
            this._predictedMoviesCountService = new PredictedMoviesCountService(PREDICTED_MOVIES_COUNT_ENDPOINT);
        }
        return this._predictedMoviesCountService;
    };
    get PredictedMoviesRuntimeService(): PredictedMoviesRuntimeService {
        if (this._predictedMoviesRuntimeService == null) {
            this._predictedMoviesRuntimeService = new PredictedMoviesRuntimeService(PREDICTED_MOVIES_RUNTIME_ENDPOINT);
        }
        return this._predictedMoviesRuntimeService;
    };
};

export const ServiceContextInstance = React.createContext(new ServiceContext());