import { useContext, useEffect, useState } from 'react';
import {
    ServiceContext,
    ServiceContextInstance
} from '../../../Core/serviceContext';
import { ISummaryMonthlyStatistics } from '../../../Models/ISummaryMonthlyStatistics';
import { useFetch } from '../../../Hooks/useFetch';
import { IFetchResult } from '../../../Hooks/useFetch.types';
import { contentContainerClassName, titleClassName } from './statisticsSummaryView.styles';
import { MonthySummaryStatisticCard } from '../../MonthySummaryStatisticCard/monthySummaryStatisticCard';

export const StatisticsSummaryView = (): JSX.Element => {
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [summaryStatistics, setSummaryStatistics] = useState<ISummaryMonthlyStatistics[]>([]);
    const [areSummaryStatisticsLoaded, setAreSummaryStatisticsLoaded] = useState<boolean>(false);
    const summaryStatisticsData: IFetchResult<ISummaryMonthlyStatistics[]> =
        useFetch<ISummaryMonthlyStatistics[]>(() => services.RecommendationService.GetMonthlySummaries());

    useEffect(() => {
        if (summaryStatisticsData.isLoading) {
            return;
        }
        if (summaryStatisticsData.errors !== "" ||
            summaryStatisticsData.data?.Error !== undefined ||
            summaryStatisticsData.data == null ||
            summaryStatisticsData.data.Data === undefined) {
            return;
        }
        setSummaryStatistics(summaryStatisticsData.data.Data);
        setAreSummaryStatisticsLoaded(true);
    }, [summaryStatisticsData]);


    return <>
        {areSummaryStatisticsLoaded && <>
            <h1 className={titleClassName}>General Statistics</h1>
            <div className={contentContainerClassName}>
                {summaryStatistics.map((summaryStatistic: ISummaryMonthlyStatistics, i: number) => {
                    return <MonthySummaryStatisticCard key={i} summaryStatistic={summaryStatistic} />
                })}
            </div>
        </>}
    </>
};