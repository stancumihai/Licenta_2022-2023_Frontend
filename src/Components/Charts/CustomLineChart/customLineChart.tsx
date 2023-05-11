import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line, Tooltip } from 'recharts';
import { ICustomChartProps, NAME_PROPERTY } from '../chart.types';

export const CustomLineChart = (props: ICustomChartProps): JSX.Element => {

    return <>
        <ResponsiveContainer width="100%"
            aspect={3}>
            <LineChart
                width={500}
                height={500}
                data={props.data}
                margin={{
                    top: 15,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }} >
                <CartesianGrid strokeDasharray="#243240" />
                <XAxis dataKey={NAME_PROPERTY}
                    tick={{ fill: "#fff" }} />
                <YAxis tick={{ fill: "#fff" }} />
                <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                    cursor={false} />
                <Line type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth="5" dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }}
                    activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 5, r: 10 }} />
            </LineChart>
        </ResponsiveContainer>
    </>
};