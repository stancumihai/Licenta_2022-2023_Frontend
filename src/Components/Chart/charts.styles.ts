import { mergeStyles } from 'office-ui-fabric-react';
import { CSSProperties } from 'react';
import { COLOR1, FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    display: 'grid',
    gridTemplateColumns: "auto auto",
    justifyContent: 'center',
});

export const customTooltipClassName: string = mergeStyles({
    backgroundColor: 'rgb(244, 244, 244)'
});

export const chartTitleClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    color: COLOR1,
    position: 'relative',
    fontSize: '30px',
    marginTop: '5vh',
});

export const chartSubTitleClassName: string = mergeStyles(({
    fontFamily: FONT_FAMILY,
    color: COLOR1,
    fontSize: '20px',
    top: '0',
    margin: 0,
    marginBottom: '2%'
}));

export const legendWrapperStyle: CSSProperties = {
    height: '30%',
    width: '30%',
    bottom: '25vh',
    right: '25vw'
};
