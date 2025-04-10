import { BFMPalette } from "@/Theme";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import {
  CustomTooltipContainer,
  CustomTooltipLabel,
  CustomTooltipValue,
} from "../BalanceOverTime/BalanceTime";
import { ChartProps, CustomLabelProps } from "../../../../../Interfaces";

const LabelContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid ${BFMPalette.purple200};
  padding: 2px 8px;
  background-color: ${BFMPalette.purple250};
`;
const LabelText = styled("p")`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: ${BFMPalette.purple600};
`;

const CustomTick = (props: {
  x: number;
  y: number;
  payload: { value: string };
}) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y + 15}
      textAnchor="middle"
      fontSize={12}
      fontWeight={500}
      fill={BFMPalette.black100}>
      {payload.value}
    </text>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipContainer>
        <CustomTooltipLabel>{label}</CustomTooltipLabel>
        <CustomTooltipValue>Amount: {payload[0].value}</CustomTooltipValue>
      </CustomTooltipContainer>
    );
  }

  return null;
};

const CustomLabel = ({ x = 0, y = 0, value }: CustomLabelProps) => {
  const parsedX = typeof x === "string" ? parseFloat(x) : x;
  const parsedY = typeof y === "string" ? parseFloat(y) : y;

  return (
    <foreignObject x={parsedX} y={parsedY - 30} width={50} height={30}>
      <LabelContainer>
        <LabelText>{value}</LabelText>
      </LabelContainer>
    </foreignObject>
  );
};

export default function BarGraph({
  data,
  color,
  barSize = 48,
  selectedBarColor,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        barSize={barSize}
        data={data}
        margin={{
          top: 25,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid
          stroke={BFMPalette.gray100}
          strokeWidth={1.5}
          strokeDasharray="0"
          vertical={false}
        />
        <XAxis
          dataKey="monthYear"
          axisLine={false}
          tickLine={false}
          interval={0}
          tick={
            <CustomTick
              x={0}
              y={0}
              payload={{
                value: "",
              }}
            />
          }
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
          tickCount={6}
          tick={
            <CustomTick
              x={0}
              y={0}
              payload={{
                value: "",
              }}
            />
          }
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="value"
          fill={color}
          activeBar={
            <Rectangle fill={selectedBarColor ?? BFMPalette.purple1000} />
          }>
          <LabelList dataKey="value" position="top" content={CustomLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
