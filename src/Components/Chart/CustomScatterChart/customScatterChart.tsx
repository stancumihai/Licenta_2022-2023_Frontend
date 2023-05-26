import { useEffect } from 'react';
import {
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
    ZAxis
} from 'recharts';
import { COLORS_PALLETE, ICustomChartProps } from '../chart.types';

export const CustomScatterChart = (props: ICustomChartProps): JSX.Element => {

    const buildData = (date: any, data: Array<any>): Array<any> => {
        const resultedData: any = [];
        data.forEach(d => {
            resultedData.push({ x: date, y: d.genre, z: d.count });
        });
        return resultedData;
    };

    const getScatters = (): JSX.Element[] => {
        const scatters: JSX.Element[] = [];
        props.data!.forEach((d: any, i: number) => {
            const data = buildData(d.date, d.dataCount);
            scatters.push(<Scatter
                key={i}
                name="A" data={data}
                fill={COLORS_PALLETE[0]}
                shape={'star'} />)
        });
        return scatters;
    };

    return (
        <ResponsiveContainer width={500} height={400}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid />
                <XAxis type="category" dataKey="x" name="date" />
                <YAxis type="category" dataKey="y" name="genre" />
                <ZAxis type="number" dataKey="z" range={[50, 600]} name="count" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                {getScatters()}
            </ScatterChart>
        </ResponsiveContainer>
    );
}