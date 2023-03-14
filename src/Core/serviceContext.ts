import React from 'react'
import { SURVEY_USER_ANSWER_ENDPOINT, SURVEY_ANSWERS_ENDPONT, USER_ENDPOINT, SURVEY_QUESTIONS_ENDPONT } from '../Library/constants';
import AuthenticationService from '../Services/authenticationService';
import SurveyAnswersService from '../Services/surveyAnswersService';
import SurveyQuestionsService from '../Services/surveyQuestionsService';
import SurveyUserAnswerService from '../Services/surveyUserAnswerService';
import UsersService from '../Services/userService';

export class ServiceContext {
    private _surveyQuestionsService?: SurveyQuestionsService;
    private _surveyAnswersService?: SurveyAnswersService;
    private _authenticationService?: AuthenticationService;
    private _surveyUserAnswerService?: SurveyUserAnswerService;
    private _userService?: UsersService;

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
};

export const ServiceContextInstance = React.createContext(new ServiceContext());