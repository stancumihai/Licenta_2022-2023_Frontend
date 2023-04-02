import {
    ChoiceGroup,
    Dropdown,
    IChoiceGroupOption,
    IDropdownOption,
    IconButton,
    Label,
    Modal,
    SpinButton,
    mergeStyles
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
    releaseDateSpinButtonsContainerClassName,
    buttonStyles,
    spinButtonStyles,
    searchBoxStyle
} from './advancedSearch.styles';
import { AutocompleteSearchBox } from '../../libs/AutocompleteSearchBox/autocompleteSearchBox';
import { useState } from 'react';
import { DefaultButton } from 'office-ui-fabric-react';

export const AdvancedSearch = (props: IAdvancedSearchProps): JSX.Element => {
    const orderByDropdownOptions: IDropdownOption[] = [
        { key: 'releaseDate', text: 'Release Date' },
        { key: 'rating', text: 'Rating' },
    ];
    const [orderBy, setOrderBy] = useState<string>('');
    const [director, setDirector] = useState<string>('');
    const [actor, setActor] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [minDateSpinButton, setMinDateSpinButton] = useState<number>(1900);
    const [maxDateSpinButton, setMaxDateSpinButton] = useState<number>(new Date().getFullYear());
    const [choiceGroupOrdering, setChoiceGroupOrdering] = useState<string>('');
    const [itemsPerPage, setItemsPerPage] = useState<number>(1);

    const orderByOptionsRootClass: string = mergeStyles({ display: 'flex', alignItems: 'center' });
    const orderByOptions: IChoiceGroupOption[] = [
        {
            key: 'A',
            text: '',
            ariaLabel: '',
            onRenderField: (props, render) => {
                return (
                    <div className={orderByOptionsRootClass}>
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
                    <div className={orderByOptionsRootClass}>
                        {render!(props)}
                        <IconButton iconProps={{ iconName: "Descending" }}
                            styles={choiceGroupIconButtonStyles} />
                    </div>
                );
            },
        }
    ];
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
    const handleItemsPerPageChange = (event: React.SyntheticEvent<HTMLElement, Event>, newValue?: string | undefined): void => {
        setItemsPerPage(Number.parseInt(newValue!));
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
    return <Modal isOpen={props.isOpen}
        onDismiss={props.handleCloseDialog}
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
            <AutocompleteSearchBox styles={searchBoxStyle}
                mapClickedSuggestion={() => { }} />
            <Label className={labelClassName}>Actor</Label>
            <AutocompleteSearchBox styles={searchBoxStyle} mapClickedSuggestion={() => { }} />
            <Label className={labelClassName}>Genre</Label>
            <AutocompleteSearchBox styles={searchBoxStyle} mapClickedSuggestion={() => { }} />
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
                <DefaultButton styles={buttonStyles} text='Search' />
                <DefaultButton onClick={handleResetClick}
                    styles={buttonStyles}
                    text='Reset' />
            </div>
        </div>
    </Modal>
};