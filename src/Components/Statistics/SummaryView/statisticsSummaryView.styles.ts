import { mergeStyles } from 'office-ui-fabric-react';
import { COLOR1, FONT_FAMILY } from '../../../Library/constants';

export const contentContainerClassName: string = mergeStyles({
    display: "grid",
    gridTemplateColumns: "auto auto auto"
});

export const titleClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: COLOR1,
    marginBottom: "6%"
});