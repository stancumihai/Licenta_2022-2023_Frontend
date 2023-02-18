import React from 'react'
import { SURVEY_QUESTIONS_ENDPONT, SURVEY_ANSWERS_ENDPONT } from '../Library/constants';
import SurveyAnswersService from '../Services/surveyAnswersService';
import SurveyQuestionsService from '../Services/surveyQuestionsService';


export class ServiceContext {
    private _surveyQuestionsService?: SurveyQuestionsService;
    private _surveyAnswersService?: SurveyAnswersService;


    get SurveyQuestionsService(): SurveyQuestionsService {
        if (this._surveyQuestionsService == null) {
            this._surveyQuestionsService = new SurveyQuestionsService(SURVEY_QUESTIONS_ENDPONT);
        }
        return this._surveyQuestionsService;
    }

    get SurveyAnswersService(): SurveyAnswersService {
        if (this._surveyAnswersService == null) {
            this._surveyAnswersService = new SurveyAnswersService(SURVEY_ANSWERS_ENDPONT);
        }
        return this._surveyAnswersService;
    }

    // get AssignmentsService(): AssignmentsService {
    //     if (this._assignmentsService == null) {
    //         this._assignmentsService = new AssignmentsService(ASSIGNMENTS_ENDPOINT);
    //     }
    //     return this._assignmentsService;
    // }

    // get AuthentificationService(): AuthentificationService {
    //     if (this._authentificationService == null) {
    //         this._authentificationService = new AuthentificationService();
    //     }
    //     return this._authentificationService;
    // }
};

export const ServiceContextInstance = React.createContext(new ServiceContext());