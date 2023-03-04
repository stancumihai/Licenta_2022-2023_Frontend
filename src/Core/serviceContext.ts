import React from 'react'
import { SURVEY_QUESTIONS_ENDPONT, SURVEY_ANSWERS_ENDPONT, USER_ENDPOINT } from '../Library/constants';
import AuthenticationService from '../Services/authenticationService';
import SurveyAnswersService from '../Services/surveyAnswersService';
import SurveyQuestionsService from '../Services/surveyQuestionsService';
import UsersService from '../Services/userService';


export class ServiceContext {
    private _surveyQuestionsService?: SurveyQuestionsService;
    private _surveyAnswersService?: SurveyAnswersService;
    private _authenticationService?: AuthenticationService;
    private _userService?: UsersService;

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
};

export const ServiceContextInstance = React.createContext(new ServiceContext());