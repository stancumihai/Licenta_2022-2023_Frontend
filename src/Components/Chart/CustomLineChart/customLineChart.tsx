import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Line,
    Tooltip,
} from 'recharts';
import {
    ICustomChartProps,
    NAME_PROPERTY
} from '../chart.types';
import { COLOR2 } from '../../../Library/constants';
import { chartSubTitleClassName } from '../charts.styles';

export const CustomLineChart = (props: ICustomChartProps): JSX.Element => {

    return <div style={{ marginTop: '5vh' }}>
        <>
            <p className={chartSubTitleClassName}>{props.title}</p>
            <ResponsiveContainer
                width={520}
                height={520}
                aspect={2}>
                <LineChart width={500}
                    height={500}
                    data={props.data} >
                    <CartesianGrid strokeDasharray="#243240" />
                    <XAxis dataKey={NAME_PROPERTY}
                        tick={{ fill: "#fff" }} />
                    <YAxis tick={{ fill: "#fff" }} />
                    <Tooltip contentStyle={{ backgroundColor: COLOR2, color: "#fff" }}
                        itemStyle={{ color: "#fff" }}
                        cursor={false} />
                    <Line type="monotone"
                        dataKey="value"
                        stroke={COLOR2}
                        strokeWidth="5"
                        dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }}
                        activeDot={{ fill: "#2e4355", stroke: COLOR2, strokeWidth: 5, r: 10 }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    </div>
};