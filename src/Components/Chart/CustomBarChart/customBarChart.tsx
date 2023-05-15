import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    COLORS_PALLETE,
    CustomTooltip,
    ICustomChartProps,
    NAME_PROPERTY,
    VALUE_PROPERTY
} from '../chart.types';
import './customBarChart.css';

const CONTAINER_HEIGHT: number = 200;

export const CustomBarChart = (props: ICustomChartProps): JSX.Element => {

    const isDataLoaded = () => {
        return props.data && props.data.length > 0;
    };

    const getLegendData = (): any[] => {
        const legendData: any[] = [];
        props.data!.forEach(data => {
            legendData.push(
                {
                    value: data.name,
                    color: data.color,
                    type: "square"
                })
        });
        return legendData;
    };

    return <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        {isDataLoaded() &&
            <ResponsiveContainer
                width={520}
                height={520}>
                <BarChart
                    width={500}
                    height={CONTAINER_HEIGHT}
                    data={props.data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <Legend payload={getLegendData()!} />
                    <XAxis dataKey={NAME_PROPERTY} />
                    <YAxis allowDecimals={false} />
                    <Tooltip content={<CustomTooltip data={props.data} />} />
                    <Bar dataKey={VALUE_PROPERTY}
                        barSize={50}
                        label={{ width: 50 }}>
                        {props.data!.map((entry, index: number) => (
                            <Cell key={`bar-${index}`}
                                fill={COLORS_PALLETE[index % COLORS_PALLETE.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        }
    </div>
};