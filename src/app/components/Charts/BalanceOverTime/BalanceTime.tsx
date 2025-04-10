"use client";
import { HKD_EQUIVALANT } from "@/constants";
import { BFMPalette } from "@/Theme";
import { formatCurrency, formatNumberWithCommas } from "@/utils";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import {
  AreaChartProps,
  CustomActiveDotProps,
} from "../../../../../Interfaces";

const GraphContainer = styled("div")`
  width: 100%;
  padding: 14px 16px;
  height: 300px;
`;
export const CustomTooltipContainer = styled("div")`
  background-color: ${BFMPalette.purple925};
  padding: 8px 10px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CustomTooltipLabel = styled("p")`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: ${BFMPalette.gray200};
`;

export const CustomTooltipValue = styled("p")`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${BFMPalette.white};
`;

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipContainer>
        <CustomTooltipLabel>{label}</CustomTooltipLabel>
        <CustomTooltipValue>
          {formatCurrency(`${HKD_EQUIVALANT}${payload[0].value}`)}
        </CustomTooltipValue>
      </CustomTooltipContainer>
    );
  }

  return null;
};

const CustomYAxisTick = (props: {
  x: number;
  y: number;
  payload: { value: string };
}) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y}
      dx={-30}
      dy={4}
      textAnchor="start"
      fontSize={12}
      fontWeight={400}
      fill={BFMPalette.black100}>
      {formatNumberWithCommas(Number(payload.value))}
    </text>
  );
};

const CustomActiveDot = ({
  cx = 0,
  cy = 0,
  color = BFMPalette.purple600,
}: CustomActiveDotProps) => {
  return (
    <g>
      <line x1={cx} y1={cy} x2={cx} y2={cy} stroke={color} strokeWidth={2} />
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="white"
        stroke={color}
        strokeWidth={2}
      />
    </g>
  );
};

export default function AreaChartGraph({ data }: AreaChartProps) {
  return (
    <GraphContainer>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}>
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                stopColor={BFMPalette.purple120}
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor={BFMPalette.purple120}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            stroke={BFMPalette.gray100}
            strokeWidth={1.5}
            strokeDasharray="0"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            interval={0}
            tickFormatter={(value, index) => (index % 15 === 0 ? value : "")}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={
              <CustomYAxisTick
                x={0}
                y={0}
                payload={{
                  value: "",
                }}
              />
            }
            tickFormatter={(value) => formatNumberWithCommas(value)}
            tickMargin={20}
          />

          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="HKDValue"
            stroke={BFMPalette.purple500}
            strokeWidth={3}
            fill="url(#gradient1)"
            activeDot={<CustomActiveDot color={BFMPalette.purple600} />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
}
