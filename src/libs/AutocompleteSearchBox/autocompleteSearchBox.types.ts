import { ISearchBoxProps } from '@fluentui/react';
import { ISearchBoxStyles } from 'office-ui-fabric-react';

export interface ISuggestionItem {
    getSuggestionItem: (query?: string) => JSX.Element;
    getSearchText: () => string;
};
export interface IAutocompleteSearchBoxProps extends ISearchBoxProps {
    suggestions?: string[] | ISuggestionItem[];
    styles?: ISearchBoxStyles,
    inProgress?: boolean;
    debounceTime?: number;
    mapClickedSuggestion?: (suggestion: string) => void;
};