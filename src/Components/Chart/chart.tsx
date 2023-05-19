import { useEffect, useState } from 'react';
import {
    IChartDashboardProps,
    IChartData,
    mapChart
} from './chart.types';
import { containerClassName } from './charts.styles';

export const Chart = (props: IChartDashboardProps): JSX.Element => {
    const [charts, setCharts] = useState<JSX.Element[] | null>([]);

    const waitForChartData = () => {
        if (props.chartData === undefined) {
            setTimeout(() => {
                waitForChartData();
                return;
            }, 200);
        }
    };

    useEffect(() => {
        waitForChartData();
        setCharts(null);
        const chartArray: JSX.Element[] = [];
        props.chartData.forEach((chartData: IChartData) => {
            chartArray.push(mapChart(chartData));
        });
        setCharts(chartArray);
    }, [props.isButtonClicked]);

    return <div id='charts' className={containerClassName}>
        {charts !== null && charts}
    </div>
};