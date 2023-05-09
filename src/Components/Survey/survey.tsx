import {
    Checkbox,
    ChoiceGroup,
    DefaultButton,
    DirectionalHint,
    IChoiceGroupOption,
    ITooltipProps,
    IconButton,
    Label,
    Spinner,
    TooltipHost
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
    SPINNER_LOADING_SURVEY_MESSAGE,
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
    choiceGroupOptionStyle,
    pressForMoreIconButtonStyles,
    calloutTootltipStyles
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
import { IMovie } from '../../Models/IMovie';
import { IPerson } from '../../Models/IPerson';
import { useId } from '@fluentui/react-hooks';
import { ISurveyUserAnswerBatch } from '../../Models/ISurveyUserAnswerBatch';

export const Survey = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [surveyQuestions, setSurveyQuestions] = useState<ISurveyQuestion[]>([]);
    const [areSurveyQuestionsLoaded, setAreSurveyQuestionsLoaded] = useState(false);
    const surveyQuestionsData: IFetchResult<ISurveyQuestion[]> = useFetch<ISurveyQuestion[]>(() => services.SurveyQuestionsService.GetAll());
    const [multiselectMessage, setMultiselectMessage] = useState<string>('');
    const [surveyCreatedMessage, setSurveyCreatedMessage] = useState<string>('');
    const [checkedCheckboxes, setCheckedCheckboxes] = useState<string[]>([]);
    const [movieSuggestions, setMovieSuggestions] = useState<string[] | undefined>([]);
    const [actorSuggestions, setActorSuggestions] = useState<string[] | undefined>([]);
    const [directorSuggestions, setDirectorSuggestions] = useState<string[] | undefined>([]);
    const [mappedSuggestions, setMappedSuggestions] = useState<string[]>([]);
    const [surveyErrorMessage, setSurveyErrorMessage] = useState<string>('');
    const [collectedData, setCollectedData] = useState<ISurveyUserRowResponse[]>([]);
    const authenticationContext: IAuthentificationContext = useContext(AuthentificationContext);
    const navigate: NavigateFunction = useNavigate();

    const [movieSearchPageNumber, setMoviePageSearchNumber] = useState<number>(1);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [areMoviesLoaded, setAreMoviesLoaded] = useState<boolean>(false);
    const moviesPaginatedDataData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetPaginatedMovies(movieSearchPageNumber, 5));

    const [actorsSearchPageNumber, setActorsSearchPageNumber] = useState<number>(1);
    const [actors, setActors] = useState<IPerson[]>([]);
    const [areActorsLoaded, setAreActorsLoaded] = useState<boolean>(false);
    const actorsData: IFetchResult<IPerson[]> = useFetch<IPerson[]>(() =>
        services.PersonsService.GetPaginatedPersonsByProfession('actor', actorsSearchPageNumber));

    const [directorsSearchPageNumber, setDirectorsSearchPageNumber] = useState<number>(1);
    const [directors, setDirectors] = useState<IPerson[]>([]);
    const [areDirectorsLoaded, setAreDirectorsLoaded] = useState<boolean>(false);
    const directorsData: IFetchResult<IPerson[]> = useFetch<IPerson[]>(() =>
        services.PersonsService.GetPaginatedPersonsByProfession('director', directorsSearchPageNumber));

    const personsData: IFetchResult<IPerson[]> = useFetch<IPerson[]>(() => services.PersonsService.GetAll());
    const [persons, setPersons] = useState<IPerson[]>([]);
    const [arePersonsLoaded, setArePersonsLoaded] = useState<boolean>(false);

    const [allMovies, setAllMovies] = useState<IMovie[]>([]);
    const [areAllMoviesLoaded, setAreAllMoviesLoaded] = useState<boolean>(false);
    const allMovieData: IFetchResult<IMovie[]> = useFetch<IMovie[]>(() => services.MovieService.GetAll());

    const [firstPageDirectors, setFirstPageDirectors] = useState<IPerson[]>([]);
    const [firstPageActors, setFirstPageActors] = useState<IPerson[]>([]);
    const [firstPageMovies, setFirstPageMovies] = useState<IMovie[]>([]);

    const tooltipId = useId('tooltip');
    const tooltipProps: ITooltipProps = {
        onRenderContent: () => (
            <p>Load Others</p>
        ),
    };

    useEffect(() => {
        if (moviesPaginatedDataData.isLoading) {
            return;
        }
        if (moviesPaginatedDataData.errors !== "" ||
            moviesPaginatedDataData.data?.Error !== undefined ||
            moviesPaginatedDataData.data == null ||
            moviesPaginatedDataData.data.Data === undefined) {
            return;
        }
        setMovies(moviesPaginatedDataData.data!.Data!);
        setAreMoviesLoaded(true);
        setFirstPageMovies(moviesPaginatedDataData.data.Data!.slice(0, 5));
    }, [moviesPaginatedDataData]);

    useEffect(() => {
        if (actorsData.isLoading) {
            return;
        }
        if (actorsData.errors !== "" ||
            actorsData.data?.Error !== undefined ||
            actorsData.data == null ||
            actorsData.data.Data === undefined) {
            return;
        }
        setActors(actorsData.data!.Data!);
        setAreActorsLoaded(true);
        setFirstPageActors(actorsData.data.Data!.slice(0, 5));
    }, [actorsData]);

    useEffect(() => {
        if (directorsData.isLoading) {
            return;
        }
        if (directorsData.errors !== "" ||
            directorsData.data?.Error !== undefined ||
            directorsData.data == null ||
            directorsData.data.Data === undefined) {
            return;
        }
        setDirectors(directorsData.data!.Data!);
        setAreDirectorsLoaded(true);
        setFirstPageDirectors(directorsData.data.Data!.slice(0, 5));
    }, [directorsData]);

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
        setTimeout(() => {
            setAreSurveyQuestionsLoaded(true);
        }, 2000);
    }, [surveyQuestionsData]);

    useEffect(() => {
        if (personsData.isLoading) {
            return;
        }
        if (personsData.errors !== "" ||
            personsData.data?.Error !== undefined ||
            personsData.data == null ||
            personsData.data.Data === undefined) {
            return;
        }
        setPersons(personsData.data!.Data!);
        setArePersonsLoaded(true);
    }, [personsData]);

    useEffect(() => {
        if (allMovieData.isLoading) {
            return;
        }
        if (allMovieData.errors !== "" ||
            allMovieData.data?.Error !== undefined ||
            allMovieData.data == null ||
            allMovieData.data.Data === undefined) {
            return;
        }
        setAllMovies(allMovieData.data!.Data!);
        setAreAllMoviesLoaded(true);
    }, [allMovieData]);

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

    const isSearchDataLoaded = (): boolean => {
        return areActorsLoaded &&
            areDirectorsLoaded &&
            areMoviesLoaded &&
            areAllMoviesLoaded &&
            arePersonsLoaded;
    };

    const handleDivClick = (event: any): void => {
        const surveyQuestionCategory = Number($($(event.currentTarget).find('input')).attr('id')!.split('/')[1]);
        if (surveyQuestionCategory === 0) {
            setActorsSearchPageNumber(1);
            setDirectorsSearchPageNumber(1);
            setMovieSuggestions(movies.map(m => m.title));
        }
        if (surveyQuestionCategory === 1) {
            setActorsSearchPageNumber(1);
            setMoviePageSearchNumber(1);
            setActorSuggestions(actors.map(a => a.name));
        }
        if (surveyQuestionCategory === 2) {
            setActorsSearchPageNumber(1);
            setMoviePageSearchNumber(1);
            setDirectorSuggestions(directors.map(d => d.name));
        }
    };

    const handleLoadMoreMovies = (): void => {
        const nextPageNumber: number = movieSearchPageNumber + 1;
        services.MovieService.GetPaginatedMovies(nextPageNumber, 5)
            .then((data: IResponse<IMovie[]>) => {
                setMovieSuggestions(data.Data!.map((d: IMovie) => {
                    return d.title
                }));
            });
        setMoviePageSearchNumber(nextPageNumber);
    };

    const handleLoadMoreDirectors = (): void => {
        const nextPageNumber: number = directorsSearchPageNumber + 1;
        fetch(`https://localhost:7145/api/Persons/profession/director/${nextPageNumber}`)
            .then((response) => response.json())
            .then((data: IPerson[]) => {
                setDirectorSuggestions(data.map((d: IPerson) => {
                    return d.name
                }));
            });
        setDirectorsSearchPageNumber(nextPageNumber);
    };

    const handleLoadMoreActors = (): void => {
        const nextPageNumber: number = actorsSearchPageNumber + 1;
        fetch(`https://localhost:7145/api/Persons/profession/actor/${nextPageNumber}`)
            .then((response) => response.json())
            .then((data: IPerson[]) => {
                setActorSuggestions(data.map((d: IPerson) => {
                    return d.name;
                }));
            });
        setActorsSearchPageNumber(nextPageNumber);
    };

    const handleLoadMoreData = (event: any): void => {
        const surveyCategoy: number = Number($($(event.currentTarget).parent()).parent().find('input').attr('id')!.split("/")[1]);
        if (surveyCategoy === 0) {
            handleLoadMoreMovies();
            setMovieSuggestions(firstPageMovies.map((d: IMovie) => d.title))
            setActorsSearchPageNumber(1);
            setDirectorsSearchPageNumber(1);
            setActorSuggestions(undefined);
            setDirectorSuggestions(undefined);
        }
        if (surveyCategoy === 1) {
            handleLoadMoreActors();
            setActorSuggestions(firstPageActors.map((d: IPerson) => d.name))
            setActorsSearchPageNumber(1);
            setDirectorsSearchPageNumber(1);
            setActorSuggestions(undefined);
            setDirectorSuggestions(undefined);
        }
        if (surveyCategoy === 2) {
            setDirectorSuggestions(firstPageDirectors.map((d: IPerson) => d.name));
            handleLoadMoreDirectors();
            setMoviePageSearchNumber(1);
            setActorsSearchPageNumber(1);
            setMovieSuggestions(undefined);
            setActorSuggestions(undefined);
        }
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
                    {isSearchDataLoaded() &&
                        <div style={{ display: 'inline-flex' }} onClick={handleDivClick}>
                            <AutocompleteSearchBox
                                id={surveyQuestion.uid! + "/" + surveyQuestion.category}
                                mapClickedSuggestion={mapClickedSuggestion}
                                key={surveyQuestion.uid! + "/" + surveyQuestion.category}
                                onChange={(_, newValue) => {
                                    handleSearchboxOnChange(surveyQuestion.category!, newValue);
                                }}
                                suggestions={mapCategoryToSuggestion(surveyQuestion.category!)}>
                            </AutocompleteSearchBox>
                            <TooltipHost id={tooltipId}
                                calloutProps={{ styles: calloutTootltipStyles }}
                                tooltipProps={tooltipProps}
                                directionalHint={DirectionalHint.rightCenter}>
                                <IconButton onClick={handleLoadMoreData}
                                    styles={pressForMoreIconButtonStyles}
                                    iconProps={{ iconName: "More" }} />
                            </TooltipHost>
                        </div>
                    }
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
            const suggestions: string[] = allMovies.filter(d => d.title.toLowerCase().includes(newText!)).map(d => d.title).slice(0, 5);
            setMovieSuggestions(suggestions);
            setActorsSearchPageNumber(1);
            setDirectorsSearchPageNumber(1);
            setActorSuggestions(undefined);
            setDirectorSuggestions(undefined);
            return;
        }
        if (surveyQuestionCategory === SurveyQuestionCategory.Actor) {
            const suggestions: string[] = persons.filter(d => d.name.toLowerCase().includes(newText!)).map(d => d.name).slice(0, 5);
            setActorSuggestions(suggestions);
            setMoviePageSearchNumber(1);
            setDirectorsSearchPageNumber(1);
            setMovieSuggestions(undefined);
            setDirectorSuggestions(undefined);
            return;
        }
        const suggestions: string[] = persons.filter(d => d.name.toLowerCase().includes(newText!)).map(d => d.name).slice(0, 5);
        setDirectorSuggestions(suggestions);
        setActorsSearchPageNumber(1);
        setMoviePageSearchNumber(1);
        setMovieSuggestions(undefined);
        setActorSuggestions(undefined);
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

    const isCheckboxLimitSurpassed = (): boolean => {
        const checkedboxes = $('div.ms-Checkbox.is-checked').length;
        return checkedboxes === MAX_CHECKBOX_CHECKED_NUMBER;
    };

    const checkForCheckboxNumberError = (): void => {
        if (isCheckboxLimitSurpassed()) {
            setMultiselectMessage(MAX_CHECKBOX_CHECKED_NUMBER_ERROR);
            setTimeout(() => {
            }, 200)
            return;
        }
        setMultiselectMessage('');
        setTimeout(() => {
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
            const surveyQuestionId = $(input).attr('id')!.split('/')[0];
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
        const surveyUserAnswers: ISurveyUserAnswer[] = [];
        textFieldData.forEach((data: ISurveyUserRowResponse) => {
            const surveyUserAnswer: ISurveyUserAnswer = {
                surveyAnswerUid: data.surveyAnswerUid!,
                surveyQuestionUid: data.surveyQuestionUid,
                userUid: authenticationContext.User.uid!,
                value: data.value
            };
            surveyUserAnswers.push(surveyUserAnswer);
        });
        const surveyUserAnswerBatch: ISurveyUserAnswerBatch = {
            surveyUserAnswers: surveyUserAnswers
        };
        services.SurveyUserAnswerService.AddInSuperBatches(surveyUserAnswerBatch).then((data: IResponse<ISurveyUserAnswerBatch>) => {
        });
        setMultiselectMessage('');
        setSurveyErrorMessage('');
        setSurveyCreatedMessage('User survey created');
        setTimeout(() => {
            navigate(HOME_PATH);
        }, 1000);
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
                        label={SPINNER_LOADING_SURVEY_MESSAGE}
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
                    {areSurveyQuestionsLoaded && isSearchDataLoaded() && mapAnswersToQuestions()}
                    <DefaultButton onClick={handleSendClick}
                        styles={sendButtonStyles}
                        text='Send' />
                </div>}
        </div>
    )
};