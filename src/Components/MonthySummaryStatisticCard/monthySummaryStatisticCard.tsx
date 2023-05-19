import { listItemClassName, statisticsCardContainerClassName, unorderedListClassName } from './monthySummaryStatisticCard.styles';
import { IMonthySummaryStatisticCardProps } from './monthySummaryStatisticCard.types';

export const MonthySummaryStatisticCard = (props: IMonthySummaryStatisticCardProps): JSX.Element => {
    return <div className={statisticsCardContainerClassName}>
        <ul className={unorderedListClassName}>
            {Object.entries(props.summaryStatistic).map((element: any, i: number) => {
                return <li key={i}
                    className={listItemClassName}>{element[0].toString().toUpperCase()} {'->'} {element[1].toString()}</li>
            })}
        </ul>
    </div>
};  