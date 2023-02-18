import { PropsWithChildren } from "react";

export interface RenderIfProps {
    condition: boolean;
};

export const RenderIf = (props: PropsWithChildren<RenderIfProps>): JSX.Element => {
    if (props.condition) {
        return <>{props.children}</>;
    }
    return <></>;
};