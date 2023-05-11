import { useEffect, useState } from 'react';
import {
    IChartDashboardProps,
    IChartData,
    mapChart
} from './chart.types';

export const Charts = (props: IChartDashboardProps): JSX.Element => {
    const [charts, setCharts] = useState<JSX.Element[] | null>([]);

    useEffect(() => {
        setCharts(null);
        const chartArray: JSX.Element[] = [];
        props.chartData.forEach((chartData: IChartData) => {
            chartArray.push(mapChart(chartData));
        });
        setCharts(chartArray);
    }, [props.isButtonClicked]);

    return <div style={{ width: '100vw', height: '100vh' }}>
        <div>
            {charts !== null && charts}
        </div>
    </div>
};