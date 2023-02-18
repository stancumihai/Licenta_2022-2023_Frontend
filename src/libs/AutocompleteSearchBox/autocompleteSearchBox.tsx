import {
    Callout,
    DirectionalHint,
    FocusZone,
    ProgressIndicator,
    SearchBox,
    IFocusZone,
    FocusZoneDirection,
    FocusZoneTabbableElements,
    Link,
    KeyCodes,
} from "@fluentui/react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { HighlightTextView } from '../Utils/HighlightTextView';
import { RenderIf } from '../Utils/RenderIf';
import { defaultSuggestionItem, ProgressIndicatorStyle, searchBoxStyle, searchContainer, typeAheadCalloutStyle } from './autocompleteSearchBox.styles';
import { IAutocompleteSearchBoxProps, ISuggestionItem } from './autocompleteSearchBox.types';

export const AutocompleteSearchBox = (props: IAutocompleteSearchBoxProps): JSX.Element => {
    const textInput = useRef<HTMLDivElement>(null);
    const [isCalloutFocussed, setCalloutFocussed] = useState(false);
    const [isCallOutVisible, setIsCallOutVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const focusZoneRef = useRef<IFocusZone>(null);
    const [suggestions, setSuggestions] = useState<string[] | ISuggestionItem[]>();
    const [suggestionClicked, setSuggestionClicked] = useState(false);

    useEffect(() => {
        setSuggestions(props.suggestions);
        setIsCallOutVisible(props.suggestions !== undefined);
    }, [props.suggestions]);

    useEffect(() => {
        setIsLoading(props.inProgress === true ? true : false);
    }, [props.inProgress]);

    useEffect(() => {
        if (props.onChange) {
            const timeOutId = setTimeout(async () => {
                if (props.onChange && !suggestionClicked) {
                    props.onChange(undefined, query)
                }
            }, props.debounceTime || 0);
            return () => {
                clearTimeout(timeOutId);
            };
        }
    }, [query]);

    const onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setSuggestionClicked(false);
        setIsCallOutVisible(false);
        if (props.onFocus) {
            props.onFocus(event);
        }
    };

    const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        switch (ev.which) {
            case KeyCodes.down: {
                setCalloutFocussed(true);
                focusZoneRef.current?.focus();
                ev.preventDefault();
                break;
            }
            default: setCalloutFocussed(false);
        }
    };

    const renderProgressIndicator = () => {
        if (isLoading) {
            return <ProgressIndicator styles={ProgressIndicatorStyle} />;
        }
        return null;
    };

    const onSuggestionClicked = (suggestion: string | ISuggestionItem) => {
        let query = typeof suggestion === "string" ? suggestion : suggestion.getSearchText();
        setSuggestionClicked(true);
        setQuery(query);
        hideSuggestions();
    };

    const hideSuggestions = () => {
        setIsCallOutVisible(false);
    };

    const onSuggestionKeyDown = (event: React.KeyboardEvent<any>, suggestion: ISuggestionItem) => {
        if (event.which === KeyCodes.enter) onSuggestionClicked(suggestion);
    };

    const renderSuggestions = (uid: string) => {
        let views: JSX.Element[] = [];
        if (!suggestions) return <></>;
        suggestions.forEach((suggestion: string | ISuggestionItem, i: number) => {
            if (typeof suggestion === "string") {
                views.push(getDefaultListItem(suggestion, i));
            } else {
                views.push(
                    <Link style={{ margin: "2px", width: "95%" }}
                        key={i}
                        onKeyPress={(e) => onSuggestionKeyDown(e, suggestion)}
                        onClick={(e) => onSuggestionClicked(suggestion)}
                        className="oneSuggestion"
                        role="listitem" >
                        {suggestion.getSuggestionItem(query)}
                    </Link>
                );
            }
        });

        return views;
    };

    const getDefaultListItem = (suggestion: string, key: any) => {

        return (
            <div className="oneSuggestion" role="listitem" key={key}>
                <Link onClick={(e) => onSuggestionClicked(suggestion)}
                    style={defaultSuggestionItem} >
                    <HighlightTextView text={suggestion} filter={query}></HighlightTextView>
                </Link>
            </div>
        );
    };

    const onCallOutDismiss = () => {
        setIsCallOutVisible(false);
    };

    const onChange = (event?: ChangeEvent<HTMLInputElement> | undefined, newValue?: string | undefined) => {
        setSuggestionClicked(false);
        setQuery(newValue || "");
    };

    return (
        <div style={searchContainer}>
            <div ref={textInput} className={props.className}>
                <SearchBox {...props}
                    styles={searchBoxStyle}
                    autoComplete="off"
                    onChange={onChange}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    value={query}></SearchBox>
            </div>
            <RenderIf condition={isLoading || (suggestions !== undefined && isCallOutVisible)} >
                <Callout styles={typeAheadCalloutStyle}
                    isBeakVisible={false}
                    target={textInput.current}
                    onDismiss={onCallOutDismiss}
                    directionalHint={DirectionalHint.bottomLeftEdge}
                    directionalHintForRTL={DirectionalHint.bottomRightEdge}
                    setInitialFocus={isCalloutFocussed}
                    doNotLayer={true} >
                    {renderProgressIndicator()}
                    <FocusZone
                        direction={FocusZoneDirection.bidirectional}
                        handleTabKey={FocusZoneTabbableElements.all}
                        id="focusZoneSuggestions"
                        componentRef={focusZoneRef}>
                        {renderSuggestions('bcfbb764-cafe-4b99-9461-2be7ecea193e')}
                    </FocusZone>
                </Callout>
            </RenderIf>
        </div>
    );
};