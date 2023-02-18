import { ISearchBoxProps } from '@fluentui/react';

export interface ISuggestionItem {
    getSuggestionItem: (query?: string) => JSX.Element;
    getSearchText: () => string;
};
export interface IAutocompleteSearchBoxProps extends ISearchBoxProps {
    suggestions?: string[] | ISuggestionItem[];
    inProgress?: boolean;
    debounceTime?: number;
};