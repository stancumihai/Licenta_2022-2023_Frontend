import { CurveType } from 'recharts/types/shape/Curve';
import { customTooltipClassName } from './charts.styles';
import { Label } from 'office-ui-fabric-react';
import { GraphTypes } from '../../Enums/graphTypes';
import { CustomLineChart } from './CustomLineChart/customLineChart';
import { CustomBarChart } from './CustomBarChart/customBarChart';
import { CustomPieChart } from './CustomPieChart/customPieChart';
import { CustomScatterChart } from './CustomScatterChart/customScatterChart';

export interface IChart {
    name: string;
    value: any;
    color?: string;
};

export interface ICustomChartProps {
    data?: any;
    width?: number;
    height?: number;
    type?: CurveType;
    maxY?: number;
    maxX?: number;
    title?: string;
};

export interface ICustomChartTooltipProps {
    data?: IChart[];
    active?: boolean;
    payload?: any[];
};

export interface IChartData {
    graphType: GraphTypes;
    data: Array<any>;
    maxY?: number;
    maxX?: number;
    title?: string;
}

export interface IChartDashboardProps {
    chartData: IChartData[];
    chartChangeIsMadeFlag: boolean;
};

export const NAME_PROPERTY: string = "name";
export const VALUE_PROPERTY: string = "value";
export const COLORS_PALLETE: string[] = ['#9B3CB5', '#FF5E78', "#FF915D", "#FFC654",
    "#F9F871", "#E33C99", "#008DDB", "#009F94"];

export const getChartData = (data: Array<any>, isPieChart?: boolean): Array<IChart> => {
    let result: Array<IChart> = new Array<IChart>();
    data.forEach((entry: any, i: number): void => {
        let value = entry[Object.keys(entry)[1]].length;
        if (value === undefined) {
            value = entry[Object.keys(entry)[1]];
        }
        if (value !== 0) {
            if (isPieChart !== undefined) {
                result.push({
                    name: entry[Object.keys(entry)[0]],
                    value: value,
                    color: COLORS_PALLETE[i]
                });
                return;
            }

            result.push({
                name: entry[Object.keys(entry)[0]],
                value: entry[Object.keys(entry)[1]],
                color: COLORS_PALLETE[i]
            });
        }
    });
    if (isPieChart !== undefined) {
        result = result.sort((a, b) => b.value - a.value);
    }
    return result;
};

export const CustomTooltip = (props: ICustomChartTooltipProps) => {

    const formatMessage = (value: string): string => {
        return `${Number(value).toLocaleString()}`;
    };

    const getPercentage = (value: number): number => {
        let total: number = 0;
        props.data!.forEach((cd: any) => (total += Number(cd.value)));
        return total > 0 ? Number(((value * 100) / total).toFixed(2)) : 0;
    };

    return <div className={customTooltipClassName}>
        {props.payload!.map((entry: any, i: number) => (
            <Label key={i}>{`${entry["name"]}: ${formatMessage(entry.value)}`}</Label>
        ))}
        {props.payload!.length > 0 && (
            <Label>
                {`Percentage: ${getPercentage(props.payload![0].value).toFixed(2)}%`}
            </Label>
        )}
    </div>
};


export const mapChart = (chartData: IChartData, i: number) => {
    switch (chartData.graphType) {
        case GraphTypes.SIMPLE_LINE_CHART: {
            return <CustomLineChart key={i}
                data={getChartData(chartData.data)}
                width={500}
                height={500}
                title={chartData.title} />
        }
        case GraphTypes.BAR_CHART: {
            return <CustomBarChart key={i}
                data={getChartData(chartData.data)}
                width={500}
                height={500}
                maxX={chartData.maxX}
                maxY={chartData.maxY}
                title={chartData.title} />
        }
        case GraphTypes.SCATTER_CHART: {
            return <CustomScatterChart data={chartData.data}
                title={chartData.title}
                key={i} />
        }
        default: {
            return <CustomPieChart key={i}
                data={getChartData(chartData.data, true)}
                width={500}
                height={500}
                title={chartData.title} />
        }
    }
};