import { useEffect, useState } from 'react';
import {
    IChartDashboardProps,
    IChartData,
    mapChart
} from './chart.types';
import { containerClassName } from './charts.styles';

export const Chart = (props: IChartDashboardProps): JSX.Element => {
    const [charts, setCharts] = useState<JSX.Element[] | null>([]);

    useEffect(() => {
        setCharts(null);
        const chartArray: JSX.Element[] = [];
        props.chartData.forEach((chartData: IChartData) => {
            chartArray.push(mapChart(chartData));
        });
        setCharts(chartArray);
    }, [props.isButtonClicked]);

    return <div className={containerClassName}>
        {charts !== null && charts}
    </div>
};