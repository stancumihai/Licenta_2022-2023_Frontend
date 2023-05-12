import {
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  Tooltip
} from 'recharts';
import {
  ICustomChartProps,
  CustomTooltip,
  COLORS_PALLETE,
  VALUE_PROPERTY
} from '../chart.types';
import { CustomPieLabelData } from './customPieChart.types';
import { RADIAN } from '../../../Library/constants';

export const CustomPieChart = (props: ICustomChartProps): JSX.Element => {

  const renderCustomizedLabel2 = (customPieLabelData: CustomPieLabelData): JSX.Element => {
    const radius: number = customPieLabelData.innerRadius + (customPieLabelData.outerRadius - customPieLabelData.innerRadius) * 0.5;
    const x: number = customPieLabelData.cx + radius * Math.cos(-customPieLabelData.midAngle * RADIAN);
    const y: number = customPieLabelData.cy + radius * Math.sin(-customPieLabelData.midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > customPieLabelData.cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(customPieLabelData.percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return <div style={{ width: '100%', height: '100%' }}>
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
        <Pie
          isAnimationActive={true}
          data={props.data}
          cx={"50%"}
          cy={"50%"}
          labelLine={false}
          label={renderCustomizedLabel2}
          outerRadius={150}
          fill="#8884d8"
          dataKey={VALUE_PROPERTY}
        >
          {props.data?.map(
            (entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS_PALLETE[index % COLORS_PALLETE.length]}
              />
            )
          )}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
};