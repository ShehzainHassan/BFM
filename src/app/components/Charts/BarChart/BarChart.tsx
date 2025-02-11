import { BFMPalette } from "@/Theme";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DataItem = {
  name: string;
  value: number;
};
interface ChartProps {
  data: DataItem[];
  color: string;
  barSize?: number;
  selectedBarColor?: string;
}

export default function BarGraph({
  data,
  color,
  barSize,
  selectedBarColor,
}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        width={200}
        height={200}
        barSize={barSize ?? 48}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="value"
          fill={color}
          activeBar={
            <Rectangle fill={selectedBarColor ?? BFMPalette.purple1000} />
          }
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
