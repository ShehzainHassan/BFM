import { BFMPalette } from "@/Theme";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  XAxisProps,
  YAxisProps,
} from "recharts";
import { InvoiceChartProps } from "../../../../../Interfaces";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import {
  CustomTooltipContainer,
  CustomTooltipLabel,
  CustomTooltipValue,
} from "../BalanceOverTime/BalanceTime";

type TickProps = {
  x: number;
  y: number;
  payload: {
    value: string | number;
    coordinate: number;
  };
};

export default function InvoiceChart({ invoiceData }: InvoiceChartProps) {
  const CustomXAxisTick = ({ x, y, payload }: TickProps) => (
    <text
      x={x}
      y={y + 10}
      textAnchor="middle"
      fontSize={12}
      fontWeight={500}
      fill={BFMPalette.black100}>
      {payload.value}
    </text>
  );
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltipContainer>
          <CustomTooltipLabel>{label}</CustomTooltipLabel>
          {payload.map((entry: any, index: number) => (
            <CustomTooltipValue key={index}>
              {entry.name}: {Number(entry.value).toLocaleString()}
            </CustomTooltipValue>
          ))}
        </CustomTooltipContainer>
      );
    }

    return null;
  };
  const CustomYAxisTick = ({ x, y, payload }: TickProps) => (
    <text
      x={x - 10}
      y={y + 4}
      textAnchor="end"
      fontSize={12}
      fontWeight={400}
      fill={BFMPalette.black100}>
      {Number(payload.value).toLocaleString()}
    </text>
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={invoiceData}
        margin={{ top: 40, right: 24, left: 40, bottom: 40 }}>
        <CartesianGrid
          stroke={BFMPalette.gray100}
          strokeWidth={1}
          horizontal
          vertical={false}
        />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={(props) => <CustomXAxisTick {...props} />}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={(props) => <CustomYAxisTick {...props} />}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="value1"
          fill={BFMPalette.purple200}
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="value2"
          fill={BFMPalette.skin600}
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
        <Bar
          dataKey="value3"
          fill={BFMPalette.purple800}
          activeBar={<Rectangle fill="cyan" stroke="red" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
