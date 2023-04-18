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
    buttonClassName,
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

export const AdvancedSearch = (props: IAdvancedSearchProps): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [orderBy, setOrderBy] = useState<string>('');
    const [director, setDirector] = useState<string>('');
    const [actor, setActor] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [minDateSpinButton, setMinDateSpinButton] = useState<number>(1900);
    const [maxDateSpinButton, setMaxDateSpinButton] = useState<number>(new Date().getFullYear());
    const [choiceGroupOrdering, setChoiceGroupOrdering] = useState<string>('');
    const [itemsPerPage, setItemsPerPage] = useState<number>(1);
    const tooltipId = useId('tooltip');

    const [actorsSearchPageNumber, setActorsSearchPageNumber] = useState<number>(1);
    const [actors, setActors] = useState<IPerson[]>([]);
    const [areActorsLoaded, setAreActorsLoaded] = useState<boolean>(false);
    const actorsData: IFetchResult<IPerson[]> = useFetch<IPerson[]>(() => services.PersonsService.GetPaginatedPersonsByProfession('actor', actorsSearchPageNumber));
    const [actorsSuggestions, setActorSuggestions] = useState<string[] | undefined>([]);

    const [directorsSearchPageNumber, setDirectorsSearchPageNumber] = useState<number>(1);
    const [directors, setDirectors] = useState<IPerson[]>([]);
    const [areDirectorsLoaded, setAreDirectorsLoaded] = useState<boolean>(false);
    const directorsData: IFetchResult<IPerson[]> = useFetch<IPerson[]>(() => services.PersonsService.GetPaginatedPersonsByProfession('director', directorsSearchPageNumber));
    const [directorSuggestions, setDirectorSuggestions] = useState<string[] | undefined>([]);

    const [genres, setGenres] = useState<string[]>([]);
    const [areGenresLoaded, setAreGenresLoaded] = useState<boolean>(false);
    const genresData: IFetchResult<string[]> = useFetch<string[]>(() => services.MovieService.GetMovieGenres());
    const [genresSuggestions, setGenresSuggestions] = useState<string[] | undefined>([]);

    const orderByDropdownOptions: IDropdownOption[] = [
        { key: 'releaseDate', text: 'Release Date' },
        { key: 'rating', text: 'Rating' },
    ];
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
        setActors(actorsData.data!.Data!);
        setAreActorsLoaded(true);
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

    const handleOrderBySelection = (event: React.FormEvent<HTMLDivElement>, newOption?: IDropdownOption): void => {
        setOrderBy(newOption!.key.toString());
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
    const handleDirectorSearch = (newDirector?: string): void => {
        setActorSuggestions(undefined);
        setGenresSuggestions(undefined);
        setDirector(newDirector!)
    };
    const handleActorSearch = (newActor?: string): void => {
        setDirectorSuggestions(undefined);
        setGenresSuggestions(undefined);
        setActor(newActor!)
    };
    const handleGenreSearch = (newGenre?: string): void => {
        setActorSuggestions(undefined);
        setDirectorSuggestions(undefined);
        setGenre(newGenre!)
    };
    const handleResetClick = (): void => {
        setOrderBy(orderByDropdownOptions[0].key.toString());
        setDirector('');
        setActor('');
        setGenre('');
        setMinDateSpinButton(1900);
        setMaxDateSpinButton(2023);
        setItemsPerPage(1);
    };
    const handleSearchClick = (): void => {

    };
    const handleLoadMoreDirectors = (): void => {
        const nextPageNumber: number = directorsSearchPageNumber + 1;
        fetch(`https://localhost:7145/api/Persons/profession/director/${nextPageNumber}`)
            .then((response) => response.json())
            .then((data: IPerson[]) => {
                setDirectors(data);
                setDirectorSuggestions(undefined);
            });
        setDirectorsSearchPageNumber(nextPageNumber);
    };
    const handleLoadMoreActors = (): void => {
        const nextPageNumber: number = actorsSearchPageNumber + 1;
        fetch(`https://localhost:7145/api/Persons/profession/actor/${nextPageNumber}`)
            .then((response) => response.json())
            .then((data: IPerson[]) => {
                setActors(data);
                setActorSuggestions(undefined);
            });
        setActorsSearchPageNumber(nextPageNumber);
    };
    const handleCloseDialog = (): void => {
        props.handleCloseDialog();
        setActorsSearchPageNumber(1);
        setDirectorsSearchPageNumber(1);
    };
    return <Modal isOpen={props.isOpen}
        onDismiss={handleCloseDialog}
        isBlocking={false}
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
            <Dropdown defaultSelectedKey={orderByDropdownOptions[0].key.toString()}
                onChange={handleOrderBySelection}
                options={orderByDropdownOptions}
                styles={dropdownStyles}
            />
            <ChoiceGroup onChange={handleChoiceGroupOrderingClick}
                defaultSelectedKey={orderByOptions[0].key.toString()}
                styles={choiceGroupStyles}
                options={orderByOptions} />
            <Label className={labelClassName}>Director</Label>
            <div onClick={() => setDirectorSuggestions(directorsData.data!.Data!.map(d => d.name))} style={{ display: 'flex' }}>
                {areDirectorsLoaded && < AutocompleteSearchBox
                    suggestions={directorSuggestions}
                    onChange={(_, newValue) => {
                        handleDirectorSearch(newValue)
                    }}
                    styles={searchBoxStyle}
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
            <div onClick={() => setActorSuggestions(actorsData.data!.Data!.map(d => d.name))} style={{ display: 'flex' }}>
                {areActorsLoaded && <AutocompleteSearchBox
                    suggestions={actorsSuggestions}
                    onChange={(_, newValue) => {
                        handleActorSearch(newValue)
                    }}
                    styles={searchBoxStyle}
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
            <div onClick={() => setGenresSuggestions(genresData.data!.Data!)}>
                {areGenresLoaded && <AutocompleteSearchBox
                    suggestions={genresSuggestions}
                    onChange={(_, newValue) => {
                        handleGenreSearch(newValue)
                    }}
                    styles={searchBoxStyle}
                />
                }
            </div>
            <Label className={labelClassName}>Release Date (Min. - Max.)</Label>
            <div className={releaseDateSpinButtonsContainerClassName}>
                <SpinButton styles={spinButtonStyles}
                    onChange={handleMinReleaseDateSpinButtonChange}
                    step={1}
                    defaultValue='1900'
                    value={minDateSpinButton.toString()}
                    min={1900}
                    max={maxDateSpinButton} />
                <SpinButton styles={spinButtonStyles}
                    onChange={handleMaxReleaseDateSpinButtonChange}
                    step={1}
                    value={maxDateSpinButton.toString()}
                    defaultValue={new Date().getFullYear().toString()}
                    min={minDateSpinButton}
                    max={new Date().getFullYear()} />
            </div>
            <Label className={labelClassName}>Items Per Page</Label>
            <div className={releaseDateSpinButtonsContainerClassName}>
                <SpinButton min={1}
                    onChange={handleItemsPerPageChange}
                    max={8}
                    defaultValue='1'
                    value={itemsPerPage.toString()}
                    step={1}
                    styles={spinButtonStyles} />
            </div>
            <div className={buttonClassName}>
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