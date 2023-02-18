export interface Props {
    text: any;
    filter: string;
};

export const HighlightTextView = (props: Props) => {
    return getHighlightedText(props.text + "", props.filter);
};

export const getHighlightedText = (text: string, highlight: string) => {
    if (highlight === "") return <>{text}</>;
    try {
        const parts = text.split(new RegExp(`(${highlight})`, "gi"));
        return (
            <span>
                {" "}
                {parts.map((part, i) => (
                    <span
                        key={i}
                        style={
                            part.toLowerCase() === highlight.toLowerCase()
                                ? { fontWeight: "bold" }
                                : {}
                        }
                    >
                        {part}
                    </span>
                ))}{" "}
            </span>
        );
    } catch (error) {
        return <>{text}</>;
    }
};