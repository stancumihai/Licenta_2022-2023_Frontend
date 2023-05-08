import {
    ChoiceGroup,
    Dropdown,
    IChoiceGroupOption,
    IDropdownOption,
    ITooltipProps,
    IconButton,
    Label,
    Modal,
    SpinButton,
    TooltipHost,
} from '@fluentui/react';
import { IAdvancedSearchProps } from './advancedSearch.types';
import {
    buttonContainerClassName,
    cancelIcon,
    choiceGroupIconButtonStyles,
    choiceGroupStyles,
    contentStyles,
    dropdownStyles,
    iconButtonStyles,
    labelClassName,
    modalStyles,
    pressForMoreIconButtonStyles,
    releaseDateSpinButtonsContainerClassName,
    buttonStyles,
    spinButtonStyles,
    searchBoxStyle,
    calloutTootltipStyles,
    orderByOptionsRootClassName
} from './advancedSearch.styles';
import { AutocompleteSearchBox } from '../../libs/AutocompleteSearchBox/autocompleteSearchBox';
import { useContext, useEffect, useState } from 'react';
import { DefaultButton, DirectionalHint } from 'office-ui-fabric-react';
import { useId } from '@fluentui/react-hooks';
import { ServiceContext, ServiceContextInstance } from '../../Core/serviceContext';
import { IPerson } from '../../Models/IPerson';
import { IFetchResult } from '../../Hooks/useFetch.types';
import { useFetch } from '../../Hooks/useFetch';
import $ from 'jquery';
import { ISearchModel } from '../../UiModels/ISearchModel';
import { IMovie } from '../../Models/IMovie';
import { IResponse } from '../../Models/IResponse';

export const AdvancedSearch = (props: IAdvancedSearchProps): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [director, setDirector] = useState<string>('');
    const [actor, setActor] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [minDateSpinButton, setMinDateSpinButton] = useState<number>(1900);
    const [maxDateSpinButton, setMaxDateSpinButton] = useState<number>(new Date().getFullYear());
    const [choiceGroupOrdering, setChoiceGroupOrdering] = useState<string>('A');
    const [itemsPerPage, setItemsPerPage] = useState<number>(1);
    const tooltipId = useId('tooltip');

    const [actorsSearchPageNumber, setActorsSearchPageNumber] = useState<number>(1);
    const [areActorsLoaded, setAreActorsLoaded] = useState<boolean>(false);
    const actorsData: IFetchResult<IPerson[]> = useFetch<IPerson[]>(() =>
        services.PersonsService.GetPaginatedPersonsByProfession('actor', actorsSearchPageNumber));
    const [actorsSuggestions, setActorSuggestions] = useState<string[] | undefined>([]);

    const [directorsSearchPageNumber, setDirectorsSearchPageNumber] = useState<number>(1);
    const [areDirectorsLoaded, setAreDirectorsLoaded] = useState<boolean>(false);
    const directorsData: IFetchResult<IPerson[]> = useFetch<IPerson[]>(() =>
        services.PersonsService.GetPaginatedPersonsByProfession('director', directorsSearchPageNumber));
    const [directorSuggestions, setDirectorSuggestions] = useState<string[] | undefined>([]);

    const [genresSearchPageNumber, setGenresSearchPageNumber] = useState<number>(1);
    const [genres, setGenres] = useState<string[]>([]);
    const [areGenresLoaded, setAreGenresLoaded] = useState<boolean>(false);
    const genresData: IFetchResult<string[]> = useFetch<string[]>(() => services.MovieService.GetMovieGenres());
    const [genresSuggestions, setGenresSuggestions] = useState<string[] | undefined>([]);

    const personsData: IFetchResult<IPerson[]> = useFetch<IPerson[]>(() => services.PersonsService.GetAll());
    const [persons, setPersons] = useState<IPerson[]>([]);
    const [arePersonsLoaded, setArePersonsLoaded] = useState<boolean>(false);

    const [firstPageDirectors, setFirstPageDirectors] = useState<IPerson[]>([]);
    const [firstPageActors, setFirstPageActors] = useState<IPerson[]>([]);

    const orderByDropdownOptions: IDropdownOption[] = [
        { key: 'releaseDate', text: 'Release Date' },
        { key: 'rating', text: 'Rating' },
    ];
    const [selectedOrderByDropdownOption, setSelectedOrderByDropdownOption] = useState<IDropdownOption>(orderByDropdownOptions[0]);
    const orderByOptions: IChoiceGroupOption[] = [
        {
            key: 'A',
            text: '',
            ariaLabel: '',
            onRenderField: (props, render) => {
                return (
                    <div className={orderByOptionsRootClassName}>
                        {render!(props)}
                        <IconButton iconProps={{ iconName: "Ascending" }}
                            styles={choiceGroupIconButtonStyles} />
                    </div>
                );
            },
        },
        {
            key: 'B',
            text: '',
            ariaLabel: '',
            onRenderField: (props, render) => {
                return (
                    <div className={orderByOptionsRootClassName}>
                        {render!(props)}
                        <IconButton iconProps={{ iconName: "Descending" }}
                            styles={choiceGroupIconButtonStyles} />
                    </div>
                );
            },
        }
    ];
    const tooltipProps: ITooltipProps = {
        onRenderContent: () => (
            <p>Load Others</p>
        ),
    };
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
        setAreActorsLoaded(true);
        setFirstPageActors(actorsData.data.Data.slice(0, 5));
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
        setAreDirectorsLoaded(true);
        setFirstPageDirectors(directorsData.data.Data!.slice(0, 5));
    }, [directorsData]);

    useEffect(() => {
        if (genresData.isLoading) {
            return;
        }
        if (genresData.errors !== "" ||
            genresData.data?.Error !== undefined ||
            genresData.data == null ||
            genresData.data.Data === undefined) {
            return;
        }
        setGenres(genresData.data!.Data!);
        setAreGenresLoaded(true);
    }, [genresData]);

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

    const handleOrderBySelection = (event: React.FormEvent<HTMLDivElement>, newOption?: IDropdownOption): void => {
        setSelectedOrderByDropdownOption(newOption!);
    };
    const handleChoiceGroupOrderingClick = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, newOption?: IChoiceGroupOption | undefined): void => {
        setChoiceGroupOrdering(newOption!.key.toString());
    };
    const handleMinReleaseDateSpinButtonChange = (event: React.SyntheticEvent<HTMLElement, Event>, newValue?: string | undefined): void => {
        setMinDateSpinButton(Number.parseInt(newValue!));
    };
    const handleMaxReleaseDateSpinButtonChange = (event: React.SyntheticEvent<HTMLElement, Event>, newValue?: string | undefined): void => {
        setMaxDateSpinButton(Number.parseInt(newValue!));
    };
    const handleItemsPerPageChange = (event: React.SyntheticEvent<HTMLElement, Event>, newItemsPerPage?: string | undefined): void => {
        setItemsPerPage(Number.parseInt(newItemsPerPage!));
    };

    const handleResetClick = (): void => {
        setSelectedOrderByDropdownOption(orderByDropdownOptions[0]);
        setDirector('');
        setActor('');
        setGenre('');
        setMinDateSpinButton(1900);
        setMaxDateSpinButton(2023);
        setItemsPerPage(1);
        setDirectorsSearchPageNumber(0);
        setActorsSearchPageNumber(0);
        setGenresSearchPageNumber(0);
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

    const handleLoadMoreGenres = (): void => {
        let nextPageNumber: number = genresSearchPageNumber + 1;
        setGenresSuggestions(genres.slice(5 * (genresSearchPageNumber - 1), 5 * (nextPageNumber - 1)));
        setGenresSearchPageNumber(nextPageNumber);
        if (nextPageNumber === 4) {
            setGenresSearchPageNumber(1);
            nextPageNumber = 2;
        }
    };

    const handleCloseDialog = (): void => {
        props.handleCloseDialog();
        setActorsSearchPageNumber(0);
        setDirectorsSearchPageNumber(0);
    };

    const mapClickedSuggestion = (suggestion: string, e: any): void => {
        const personId: string | undefined = $(e.target)
            .closest('[id]')
            .parent()
            .closest('[id]')
            .attr('id');
        if (personId !== undefined) {
            if (personId === 'actor') {
                setActor(suggestion);
                return;
            }
            if (personId === 'director') {
                setDirector(suggestion);
                return;
            }
            setGenre(suggestion);
        }
    };

    const handleDropDownMouseEnter = (event: any): void => {
        $(event.target).css('color', 'white');
    };

    const handleSearchClick = (): void => {
        const searchModel: ISearchModel = {
            minYear: minDateSpinButton,
            maxYear: maxDateSpinButton,
            ordering: choiceGroupOrdering,
            genre: genre === "" ? "" : genre,
            director: director === "" ? "" : director,
            actor: actor === "" ? "" : actor,
            orderBy: selectedOrderByDropdownOption.text,
            itemsPerPage: itemsPerPage,
        };
        props.collectAdvancedSearchedMovies(null);
        services.MovieService.GetAdvancedSearchMovieData(searchModel).then((data: IResponse<IMovie[]>) => {
            if (data.Status === 200) {
                props.collectAdvancedSearchedMovies(data.Data!);
                handleCloseDialog();
                handleResetClick();
                return;
            }
            props.collectAdvancedSearchedMovies(null);
        });
    };

    const handleDirectorSearch = (newDirector?: string): void => {
        if (newDirector !== "") {
            const suggestions: string[] = persons.filter(d => d.name.toLowerCase().includes(newDirector!)).map(d => d.name).slice(0, 5);
            setDirectorSuggestions(suggestions);
        }
    };

    const handleActorSearch = (newActor?: string): void => {
        if (newActor !== '') {
            const suggestions: string[] = persons.filter(d => d.name.toLowerCase().includes(newActor!)).map(d => d.name).slice(0, 5);
            setActorSuggestions(suggestions);
        }
    };
    return <Modal isOpen={props.isOpen}
        onDismiss={handleCloseDialog}
        isBlocking={true}
        styles={modalStyles}>
        <div className={contentStyles.header}>
            <h2 className={contentStyles.heading} >
                Advanced Search
            </h2>
            <IconButton styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Close popup modal"
                onClick={props.handleCloseDialog}
            />
        </div>
        <div className={contentStyles.body}>
            <Label className={labelClassName}>Order by</Label>
            <Dropdown selectedKey={selectedOrderByDropdownOption ? selectedOrderByDropdownOption.key : undefined}
                onChange={handleOrderBySelection}
                options={orderByDropdownOptions}
                onMouseEnter={handleDropDownMouseEnter}
                styles={dropdownStyles}
            />
            <ChoiceGroup onChange={handleChoiceGroupOrderingClick}
                defaultSelectedKey={orderByOptions[0].key.toString()}
                styles={choiceGroupStyles}
                options={orderByOptions} />
            <Label className={labelClassName}>Director</Label>
            <div id='director' onClick={() => {
                setActorsSearchPageNumber(1);
                setDirectorSuggestions(firstPageDirectors.map((d: IPerson) => d.name));
                setActorSuggestions(undefined);
            }}
                style={{ display: 'flex' }}>
                {areDirectorsLoaded && arePersonsLoaded && < AutocompleteSearchBox
                    suggestions={directorSuggestions}
                    styles={searchBoxStyle}
                    mapClickedSuggestion={mapClickedSuggestion}
                    onChange={(_, newValue) => {
                        handleDirectorSearch(newValue)
                    }}
                />}
                <TooltipHost id={tooltipId}
                    calloutProps={{ styles: calloutTootltipStyles }}
                    tooltipProps={tooltipProps}
                    directionalHint={DirectionalHint.rightCenter}>
                    <IconButton onClick={handleLoadMoreDirectors}
                        styles={pressForMoreIconButtonStyles}
                        iconProps={{ iconName: "More" }} />
                </TooltipHost>
            </div>
            <Label className={labelClassName}>Actor</Label>
            <div id='actor' onClick={() => {
                setDirectorsSearchPageNumber(1);
                setActorSuggestions(firstPageActors.map((d: IPerson) => d.name));
                setDirectorSuggestions(undefined);
            }}
                style={{ display: 'flex' }}>
                {areActorsLoaded && arePersonsLoaded && <AutocompleteSearchBox
                    suggestions={actorsSuggestions}
                    styles={searchBoxStyle}
                    mapClickedSuggestion={mapClickedSuggestion}
                    onChange={(_, newValue) => {
                        handleActorSearch(newValue)
                    }}
                />}
                <TooltipHost
                    id={tooltipId}
                    calloutProps={{ styles: calloutTootltipStyles }}
                    tooltipProps={tooltipProps}
                    directionalHint={DirectionalHint.rightCenter}>
                    <IconButton onClick={handleLoadMoreActors}
                        styles={pressForMoreIconButtonStyles}
                        iconProps={{ iconName: "More" }} />
                </TooltipHost>
            </div>
            <Label className={labelClassName}>Genre</Label>
            <div id='genres' onClick={() => { }} style={{ display: 'flex' }}>
                {areGenresLoaded && <AutocompleteSearchBox
                    suggestions={genresSuggestions}
                    styles={searchBoxStyle}
                    mapClickedSuggestion={mapClickedSuggestion}
                />}
                <TooltipHost id={tooltipId}
                    calloutProps={{ styles: calloutTootltipStyles }}
                    tooltipProps={tooltipProps}
                    directionalHint={DirectionalHint.rightCenter}>
                    <IconButton onClick={handleLoadMoreGenres}
                        styles={pressForMoreIconButtonStyles}
                        iconProps={{ iconName: "More" }} />
                </TooltipHost>
            </div>
            <Label className={labelClassName}>Release Date (Min. - Max.)</Label>
            <div className={releaseDateSpinButtonsContainerClassName}>
                <SpinButton styles={spinButtonStyles}
                    onChange={handleMinReleaseDateSpinButtonChange}
                    step={1}
                    value={minDateSpinButton.toString()}
                    min={1900}
                    max={maxDateSpinButton} />
                <SpinButton styles={spinButtonStyles}
                    onChange={handleMaxReleaseDateSpinButtonChange}
                    step={1}
                    value={maxDateSpinButton.toString()}
                    min={minDateSpinButton}
                    max={new Date().getFullYear()} />
            </div>
            <Label className={labelClassName}>Items Per Page</Label>
            <div className={releaseDateSpinButtonsContainerClassName}>
                <SpinButton min={1}
                    onChange={handleItemsPerPageChange}
                    max={8}
                    value={itemsPerPage.toString()}
                    step={1}
                    styles={spinButtonStyles} />
            </div>
            <div className={buttonContainerClassName}>
                <DefaultButton style={{ background: '#769bce' }}
                    onClick={handleSearchClick}
                    styles={buttonStyles}
                    text='Search' />
                <DefaultButton style={{ background: '#888', }}
                    onClick={handleResetClick}
                    styles={buttonStyles}
                    text='Reset' />
            </div>
        </div>
    </Modal>
};