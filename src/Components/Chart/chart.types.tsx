import { CurveType } from 'recharts/types/shape/Curve';
import { customTooltipClassName } from './charts.styles';
import { Label } from 'office-ui-fabric-react';
import { GraphTypes } from '../../Enums/graphTypes';
import { CustomLineChart } from './CustomLineChart/customLineChart';
import { CustomBarChart } from './CustomBarChart/customBarChart';
import { CustomPieChart } from './CustomPieChart/customPieChart';

export interface IChart {
    name: string;
    value: any;
    color?: string;
};

export interface ICustomChartProps {
    data?: IChart[];
    label?: string;
    width?: number;
    height?: number;
    type?: CurveType;
};

export interface ICustomChartTooltipProps {
    data?: IChart[];
    active?: boolean;
    payload?: any[];
};

export interface IChartData {
    graphType: GraphTypes;
    data: Array<any>;
}

export interface IChartDashboardProps {
    chartData: IChartData[];
    isButtonClicked: boolean;
};

export const NAME_PROPERTY: string = "name";
export const VALUE_PROPERTY: string = "value";
export const COLORS_PALLETE: string[] = ["#4a8ddc", "#4c5d8a", "#f3c911", "#dc5b57",
    "#33ae81", "#94c6f0", "#e37d78", "#9a64a0"];

export const getChartData = (data: Array<any>, isPieChart?: boolean): Array<IChart> => {
    const result: Array<IChart> = new Array<IChart>();
    data.forEach((entry: any): void => {
        if (isPieChart !== undefined) {
            result.push({
                name: entry[Object.keys(entry)[0]],
                value: entry[Object.keys(entry)[1]].length
            });
            return;
        }
        result.push({
            name: entry[Object.keys(entry)[0]],
            value: entry[Object.keys(entry)[1]]
        });
    });
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
        {props.payload!.map((entry: any) => (
            <Label>{`${entry["name"]}: ${formatMessage(entry.value)}`}</Label>
        ))}
        {props.payload!.length > 0 && (
            <Label>
                {`Percentage: ${getPercentage(props.payload![0].value).toFixed(2)}%`}
            </Label>
        )}
    </div>
};


export const mapChart = (chartData: IChartData) => {
    switch (chartData.graphType) {
        case GraphTypes.SIMPLE_LINE_CHART: {
            return <div>
                <CustomLineChart
                    key={"linesChart"}
                    data={getChartData(chartData.data)}
                    label={"Requests By Areas Impacted"}
                    width={500}
                    height={500}
                />
            </div>
        }
        case GraphTypes.BAR_CHART: {
            return <div>
                <CustomBarChart
                    key={"areasImapactedChart"}
                    data={getChartData(chartData.data)}
                    label={"Requests By Areas Impacted"}
                    width={500}
                    height={500}
                />
            </div>
        }
        default: {
            return <div>
                <CustomPieChart
                    key={"statusChart"}
                    data={getChartData(chartData.data, true)}
                    label={"Requests By Type"}
                    width={500}
                    height={500}
                />
            </div>
        }
    }
};