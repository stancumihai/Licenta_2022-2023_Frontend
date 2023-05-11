import * as React from "react";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
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

const CONTAINER_HEIGHT: number = 200;

export const CustomBarChart = (props: ICustomChartProps): JSX.Element => {

    const isDataLoaded = () => {
        return props.data && props.data.length > 0;
    };

    return (
        <>
            {/* <Label className="chart-title"  >
                {props.label}
            </Label> */}
            {isDataLoaded() &&
                <ResponsiveContainer
                    width={500}
                    height={500}>
                    <BarChart
                        width={500}
                        height={CONTAINER_HEIGHT}
                        data={props.data} >
                        <CartesianGrid strokeDasharray="3 3" />
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
        </>
    );
};