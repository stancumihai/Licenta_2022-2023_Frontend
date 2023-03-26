import {
    Checkbox,
    ChoiceGroup,
    DefaultButton,
    IChoiceGroupOption,
    Label,
    Spinner
} from '@fluentui/react';
import {
    useContext,
    useEffect,
    useState
} from 'react';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../Core/serviceContext';
import { SurveyQuestionType } from '../../Enums/SurveyQuestionType';
import { useFetch } from '../../Hooks/useFetch';
import { IFetchResult } from '../../Hooks/useFetch.types';
import {
    HOME_PATH,
    MAX_CHECKBOX_CHECKED_NUMBER,
    MAX_CHECKBOX_CHECKED_NUMBER_ERROR,
    MULTISELECT_ERROR_MESSAGE,
    REQUIRED_ASSET_LOCATION,
    SEARCHBOX_ERROR_MESSAGE,
    SPINNER_LOADING_MESSAGE,
    SURVEY_TITLE
} from '../../Library/constants';
import { ISurveyAnswer } from '../../Models/ISurveyAnswer';
import { ISurveyQuestion } from '../../Models/ISurveyQuestion';
import {
    checkboxContainerClassName,
    checkboxItemStyle,
    choiceGroupStyles,
    surveyContentClassName,
    informationClassName,
    labelStyles,
    loadingSpinnerStyle,
    requiredAssetClassName,
    requiredAssetContainerClassName,
    sendButtonStyles,
    surveyTitleClassName,
    containerClassName,
    mainLogoDivClassName,
    mainLogoClassName,
    mainTextClassName,
    choiceGroupOptionStyle
} from './survey.styles';
import $ from 'jquery';
import { AutocompleteSearchBox } from '../../libs/AutocompleteSearchBox/autocompleteSearchBox';
import { SurveyQuestionCategory } from '../../Enums/SurveyQuestionCategory';
import { NavigateFunction, useNavigate } from 'react-router';
import { ISurveyUserAnswer } from '../../Models/ISurveyUserAnswer';
import { ISurveyUserRowResponse } from '../../Models/ISurveyUserRowResponse';
import { IResponse } from '../../Models/IResponse';
import { IAuthentificationContext } from '../../Authentication/authenticationContext.types';
import AuthentificationContext from '../../Authentication/authenticationContext';
import { Logo } from '../Logo/logo';

export const Survey = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [surveyQuestions, setSurveyQuestions] = useState<ISurveyQuestion[]>([]);
    const [areSurveyQuestionsLoaded, setAreSurveyQuestionsLoaded] = useState(false);
    const surveyQuestionsData: IFetchResult<ISurveyQuestion[]> = useFetch<ISurveyQuestion[]>(() => services.SurveyQuestionsService.GetAll());
    const [multiselectMessage, setMultiselectMessage] = useState<string>('');
    const [surveyCreatedMessage, setSurveyCreatedMessage] = useState<string>('');
    const [checkedCheckboxes, setCheckedCheckboxes] = useState<string[]>([]);
    const [movieSuggestions, setMovieSuggestions] = useState<string[] | undefined>();
    const [actorSuggestions, setActorSuggestions] = useState<string[] | undefined>();
    const [directorSuggestions, setDirectorSuggestions] = useState<string[] | undefined>();
    const [mappedSuggestions, setMappedSuggestions] = useState<string[]>([]);
    const [surveyErrorMessage, setSurveyErrorMessage] = useState<string>('');
    const [collectedData, setCollectedData] = useState<ISurveyUserRowResponse[]>([]);
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);

    const navigate: NavigateFunction = useNavigate();

    const moviesData: string[] = [
        "Movie1",
        "Movie2",
        "Movie3",
        "Movie4",
        "Movie5",
    ];
    const actorsData: string[] = [
        "Actor1",
        "Actor2",
        "Actor3",
        "Actor4",
        "Actor5",
    ];
    const directorsData: string[] = [
        "Director1",
        "Director2",
        "Director3",
        "Director4",
        "Director5",
    ];

    useEffect(() => {
        if (surveyQuestionsData.isLoading) {
            return;
        }
        if (surveyQuestionsData.errors !== "" ||
            surveyQuestionsData.data?.Error !== undefined ||
            surveyQuestionsData.data == null ||
            surveyQuestionsData.data.Data === undefined) {
            return;
        }
        surveyQuestionsData.data.Data!.sort((a: ISurveyQuestion, b: ISurveyQuestion) => {
            if (a.value < b.value)
                return -1;
            else if (a.value === b.value) {
                return 0;
            } return 1;
        })
        setSurveyQuestions(surveyQuestionsData.data.Data!);
        //setTimeout(() => {
        setAreSurveyQuestionsLoaded(true);
        //}, 2000);
    }, [surveyQuestionsData]);

    const mapAnswersToOptions = (surveyAnswers: ISurveyAnswer[]): IChoiceGroupOption[] => {
        const results = surveyAnswers.map((surveyAnswer: ISurveyAnswer) => {
            const choiceGroupOption: IChoiceGroupOption = {
                id: surveyAnswer.uid!, key: surveyAnswer.uid!,
                text: surveyAnswer.value,
                styles: choiceGroupOptionStyle
            }
            return choiceGroupOption;
        });
        return results;
    };

    const mapQuestionToType = (surveyQuestions: ISurveyQuestion[]): ISurveyQuestion[] => {
        return surveyQuestions.map((surveyQuestion: ISurveyQuestion) => {
            if (surveyQuestion.surveyAnswers!.length === 1) {
                surveyQuestion.Type! = SurveyQuestionType.SINGLELINE;
                return surveyQuestion;
            }
            else if (surveyQuestion.value.includes('frequently')) {
                surveyQuestion.Type! = SurveyQuestionType.SINGLECHOICE;
                return surveyQuestion;
            }
            surveyQuestion.Type! = SurveyQuestionType.MULTICHOICE;
            return surveyQuestion;
        });
    };

    const mapAnswersToCheckboxes = (surveyAnswers: ISurveyAnswer[]): JSX.Element => {
        return <div className={checkboxContainerClassName}>
            {surveyAnswers?.map((surveyAnswer: ISurveyAnswer) => {
                return <Checkbox id={surveyAnswer.uid}
                    key={surveyAnswer.uid!}
                    styles={checkboxItemStyle}
                    disabled={!checkedCheckboxes.includes(surveyAnswer.value)
                        && checkedCheckboxes.length >= MAX_CHECKBOX_CHECKED_NUMBER}
                    onChange={handleCheckboxCheck}
                    label={surveyAnswer.value} />
            })}
        </div>
    };

    const mapCategoryToSuggestion = (surveyQuestionCategory: SurveyQuestionCategory) => {
        if (surveyQuestionCategory === SurveyQuestionCategory.Movie) {
            return movieSuggestions;
        } else if (surveyQuestionCategory === SurveyQuestionCategory.Actor) {
            return actorSuggestions;
        }
        return directorSuggestions;
    };

    const mapClickedSuggestion = (suggestion: string) => {
        setMappedSuggestions(current => [...current, suggestion]);
    };

    const mapAnswersToQuestions = (): JSX.Element[] => {
        return mapQuestionToType(surveyQuestions).map((surveyQuestion: ISurveyQuestion): JSX.Element => {
            if (surveyQuestion.Type! === SurveyQuestionType.SINGLELINE) {
                return <div key={surveyQuestion.uid!}>
                    <div className={requiredAssetContainerClassName}>
                        <Label styles={labelStyles}>{surveyQuestion.value}</Label>
                        <img className={requiredAssetClassName}
                            src={REQUIRED_ASSET_LOCATION}
                            alt='Loading...'></img>
                    </div>
                    <AutocompleteSearchBox
                        id={surveyQuestion.uid!}
                        mapClickedSuggestion={mapClickedSuggestion}
                        key={surveyQuestion.uid!}
                        onChange={(_, newValue) => {
                            handleSearchboxOnChange(surveyQuestion.category!, newValue);
                        }}
                        suggestions={mapCategoryToSuggestion(surveyQuestion.category!)}>
                    </AutocompleteSearchBox>
                </div>
            }
            if (surveyQuestion.Type! === SurveyQuestionType.MULTICHOICE) {
                return <div>
                    <div className={requiredAssetContainerClassName}>
                        <Label styles={labelStyles}>{surveyQuestion.value}</Label>
                        <img className={requiredAssetClassName}
                            src={REQUIRED_ASSET_LOCATION}
                            alt='Loading...'></img>
                    </div>
                    {mapAnswersToCheckboxes(surveyQuestion.surveyAnswers!)}
                </div>
            }
            return <ChoiceGroup id={surveyQuestion.uid!}
                key={surveyQuestion.uid!}
                styles={choiceGroupStyles}
                onChange={handleChoiceGroupChange}
                options={mapAnswersToOptions(surveyQuestion.surveyAnswers!)}
                defaultSelectedKey={surveyQuestion.surveyAnswers![0].uid!}
                label={surveyQuestion.value}
                required={true} />;
        });
    };

    const handleChoiceGroupChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption | undefined) => {
        services.SurveyQuestionsService.GetGuidBySurveyAnswerGuid(option!.key).then((data: IResponse<any>) => {
            const surveyUserRowResponse: ISurveyUserRowResponse = {
                surveyAnswerUid: option!.key,
                surveyQuestionUid: data.Data!,
                value: option!.text,
                type: 'Choice'
            };
            const filteredArray = collectedData.filter(data => {
                return data.type !== 'Choice'
            });
            filteredArray.push(surveyUserRowResponse);
            setCollectedData(filteredArray);
        })
    };

    const handleSearchboxOnChange = (surveyQuestionCategory: SurveyQuestionCategory, newText?: string) => {
        if (!newText || newText.trim() === "") {
            setMovieSuggestions(undefined);
            setActorSuggestions(undefined);
            setDirectorSuggestions(undefined);
            return;
        }
        if (surveyQuestionCategory === SurveyQuestionCategory.Movie) {
            setMovieSuggestions(moviesData);
            setActorSuggestions(undefined);
            setDirectorSuggestions(undefined);
        } else if (surveyQuestionCategory === SurveyQuestionCategory.Actor) {
            setMovieSuggestions(undefined);
            setActorSuggestions(actorsData);
            setDirectorSuggestions(undefined);
        } else {
            setMovieSuggestions(undefined);
            setActorSuggestions(undefined);
            setDirectorSuggestions(directorsData);
        }
    };

    const handleCheckboxCheck = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked?: boolean | undefined): void => {
        setTimeout(() => {
            checkForCheckboxNumberError();
            if (checked! === true) {
                const surveyAnswerUid = $(ev!.target).attr('id');
                const surveyAnswerValue = $(ev!.target).parent().find('span').text();
                services.SurveyQuestionsService.GetGuidBySurveyAnswerGuid(surveyAnswerUid!).then((data: IResponse<any>) => {
                    const surveyUserRowResponse: ISurveyUserRowResponse = {
                        surveyAnswerUid: surveyAnswerUid!,
                        surveyQuestionUid: data.Data!,
                        value: surveyAnswerValue,
                        type: 'MultiChoice'
                    };
                    setCollectedData(prev => [...prev, surveyUserRowResponse]);
                })
                addGenreToState(ev);
                checkForCheckboxNumberError();
                return;
            }
            removeGenreFromState(ev);
            checkForCheckboxNumberError();
        }, 300)
    };

    const addGenreToState = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined) => {
        $(ev!.target).parent().children().each((i: number, el: HTMLElement) => {
            if (i === 1) {
                let checkboxLabel: string = $(el).text().trim().substring(1);
                setCheckedCheckboxes(current => [...current, checkboxLabel]);
            }
        });
    };

    const removeGenreFromState = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined) => {
        $(ev!.target).parent().children().each((i: number, el: HTMLElement) => {
            if (i === 1) {
                let checkboxLabel: string = $(el).text().trim().substring(1);
                setCheckedCheckboxes(current => current.filter(c => c !== checkboxLabel));
            }
        });
    };

    // const resetCheckboxColors = (): void => {
    //     $('.ms-Checkbox-checkbox').each((i, el) => {
    //         var checkedParent: JQuery<HTMLElement> = $(el).parents().eq(1);
    //         var classes: string | undefined = $(checkedParent).attr('class');
    //         if (!classes!.includes('is-checked')) {
    //             $(el).css('background', initialCheckboxColor);
    //         }
    //     });
    // };

    // const changeCheckboxColor = (): void => {
    //     $('.ms-Checkbox-checkbox').each((i, el) => {
    //         var checkedParent: JQuery<HTMLElement> = $(el).parents().eq(1);
    //         var classes: string | undefined = $(checkedParent).attr('class');
    //         if (!classes!.includes('is-checked')) {
    //             setInitialCheckboxColor($(el).css('background'));
    //             //$(el).css('background', '#49494D');
    //             return;
    //         }
    //         // $(el).css('background', '#005a9e');
    //     });
    // };

    const isCheckboxLimitSurpassed = (): boolean => {
        const checkedboxes = $('div.ms-Checkbox.is-checked').length;
        return checkedboxes === MAX_CHECKBOX_CHECKED_NUMBER;
    };

    const checkForCheckboxNumberError = (): void => {
        if (isCheckboxLimitSurpassed()) {
            setMultiselectMessage(MAX_CHECKBOX_CHECKED_NUMBER_ERROR);
            setTimeout(() => {
                //changeCheckboxColor();
            }, 200)
            return;
        }
        setMultiselectMessage('');
        setTimeout(() => {
            // resetCheckboxColors();
        }, 200)
    };

    const handleSurveyError = (message: string): void => {
        setSurveyErrorMessage(message);
        setTimeout(() => {
            setSurveyErrorMessage('');
        }, 2000)
    };

    const isReadyToSend = (): boolean => {
        setMultiselectMessage('');
        if (mappedSuggestions.length !== 3) {
            handleSurveyError(SEARCHBOX_ERROR_MESSAGE);
            return false;
        }
        if (multiselectMessage === '') {
            handleSurveyError(MULTISELECT_ERROR_MESSAGE);
            return false;
        }
        return true;
    }

    const getTextfieldData = (): ISurveyUserRowResponse[] => {
        const textData: ISurveyUserRowResponse[] = [];
        $('.ms-SearchBox').each((i, el) => {
            const input = $(el).find('input');
            const surveyQuestionId = $(input).attr('id');
            const surveyAnswerValue = $(input).attr('value');
            const surveyUserRowResponse: ISurveyUserRowResponse = {
                surveyAnswerUid: "00000000-0000-0000-0000-000000000000",
                surveyQuestionUid: surveyQuestionId!,
                value: surveyAnswerValue!,
                type: 'Text'
            };
            textData.push(surveyUserRowResponse);
        });
        return textData;
    };

    const handleSendClick = () => {
        setMappedSuggestions([]);
        if (!isReadyToSend()) {
            return;
        }
        let textFieldData: ISurveyUserRowResponse[] = getTextfieldData();
        textFieldData = textFieldData.concat(collectedData);
        textFieldData.forEach((data: ISurveyUserRowResponse) => {
            const surveyUserAnswer: ISurveyUserAnswer = {
                surveyAnswerUid: data.surveyAnswerUid!,
                surveyQuestionUid: data.surveyQuestionUid,
                userUid: authenticationContext.User.uid!,
                value: data.value
            };
            services.SurveyUserAnswerService.Add(surveyUserAnswer);
        });
        setMultiselectMessage('');
        setSurveyErrorMessage('');
        setSurveyCreatedMessage('User survey created');
        navigate(HOME_PATH);
    };

    return (
        <div className={containerClassName}>
            <div className={mainLogoDivClassName}>
                <Logo mainLogoClassName={mainLogoClassName}
                    mainTextClassName={mainTextClassName} />
            </div>
            {!areSurveyQuestionsLoaded ?
                <div>
                    <Spinner styles={loadingSpinnerStyle}
                        label={SPINNER_LOADING_MESSAGE}
                        ariaLive="assertive"
                        labelPosition="top" />
                </div> :

                <div className={surveyContentClassName}>
                    <h1 className={surveyTitleClassName}>{SURVEY_TITLE}</h1>
                    <div>
                        <p className={informationClassName}>{multiselectMessage}</p>
                        <p className={informationClassName}>{surveyErrorMessage}</p>
                        <p className={informationClassName}>{surveyCreatedMessage}</p>
                    </div>
                    {areSurveyQuestionsLoaded && mapAnswersToQuestions()}
                    <DefaultButton onClick={handleSendClick}
                        styles={sendButtonStyles}
                        text='Send' />
                </div>}
        </div>
    )
};