import {
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  Tooltip,
  Legend
} from 'recharts';
import {
  ICustomChartProps,
  CustomTooltip,
  COLORS_PALLETE,
  VALUE_PROPERTY
} from '../chart.types';
import { CustomPieLabelData } from './customPieChart.types';
import { RADIAN } from '../../../Library/constants';
import { chartSubTitleClassName, legendWrapperStyle } from '../charts.styles';
import './customPieChart.css';

export const CustomPieChart = (props: ICustomChartProps): JSX.Element => {



  const renderCustomizedLabel2 = (customPieLabelData: CustomPieLabelData): JSX.Element => {
    const radius: number = customPieLabelData.innerRadius + (customPieLabelData.outerRadius - customPieLabelData.innerRadius) * 0.5;
    const x: number = customPieLabelData.cx + radius * Math.cos(-customPieLabelData.midAngle * RADIAN);
    const y: number = customPieLabelData.cy + radius * Math.sin(-customPieLabelData.midAngle * RADIAN);

    const getPercent = (percent: number) => {
      if (percent >= 0.5) {
        return (Math.floor(percent * 100));
      }
      if (percent <= 0.01) {
        return 1;
      }
      return percent * 100;
    };

    return (
      <text x={x} y={y} fill="white" textAnchor={x > customPieLabelData.cx ? 'start' : 'end'} dominantBaseline="central">
        {`${getPercent(customPieLabelData.percent).toFixed(0)}%`}
      </text>
    );
  };

  return <div style={{ width: '100%', height: '100%', marginTop: '20px' }}>
    <>
      <p className={chartSubTitleClassName}>{props.title}</p>
      <ResponsiveContainer
        width={500}
        height={500} >
        <PieChart>
          <Tooltip
            content={
              <CustomTooltip
                data={props.data}
                active={true}
              />
            } />
          <Legend wrapperStyle={legendWrapperStyle} />
          <Pie isAnimationActive={true}
            data={props.data}
            cx={"50%"}
            cy={"50%"}
            labelLine={false}
            label={renderCustomizedLabel2}
            outerRadius={150}
            fill="#8884d8"
            dataKey={VALUE_PROPERTY} >
            {props.data!.map(
              (entry: any, index: number) => (
                <Cell key={`cell-${index}`}
                  fill={COLORS_PALLETE[index % COLORS_PALLETE.length]}
                />
              )
            )}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  </div>
};