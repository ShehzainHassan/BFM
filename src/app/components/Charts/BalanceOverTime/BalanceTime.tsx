"use client";
import { HKD_EQUIVALANT } from "@/constants";
import { BFMPalette } from "@/Theme";
import { H5, Header } from "@/Typography";
import useIsMobile from "@/useIsMobile";
import { formatCurrency, formatNumberWithCommas } from "@/utils";
import Image from "next/image";
import { useState } from "react";
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
`;
const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  min-width: 300px;
  min-height: 300px;
  position: relative;
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
      dx={0}
      dy={4}
      textAnchor="end"
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

export const MobileContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ButtonContainer = styled("div")`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 6px;
  border: 1px solid ${BFMPalette.gray100};
`;
export const ValueContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default function AreaChartGraph({ data }: AreaChartProps) {
  const isMobile = useIsMobile(768);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, data.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <GraphContainer>
      {isMobile && data.length > 0 && (
        <MobileContainer>
          <ButtonContainer>
            <Image
              onClick={handlePrev}
              src="/images/prev.png"
              alt="prev"
              width={5}
              height={10}
            />
          </ButtonContainer>
          <ValueContainer>
            <H5 color={BFMPalette.black800}>{data[activeIndex].name}</H5>
            <Header color={BFMPalette.black800}>
              {formatCurrency(`${HKD_EQUIVALANT}${data[activeIndex].HKDValue}`)}
            </Header>
          </ValueContainer>

          <ButtonContainer>
            <Image
              onClick={handleNext}
              src="/images/next.png"
              alt="next"
              width={5}
              height={10}
            />
          </ButtonContainer>
        </MobileContainer>
      )}

      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: isMobile ? 0 : 40,
              bottom: 0,
            }}>
            <defs>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%">
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
              dx={!isMobile ? 30 : 45}
              tick={{
                fontSize: 12,
                fontWeight: 400,
                fill: BFMPalette.black100,
              }}
              tickFormatter={(value, index) => {
                const step = isMobile ? 30 : 15;
                return index % step === 0 ? value : "";
              }}
              tickMargin={10}
            />

            {!isMobile && (
              <YAxis
                axisLine={false}
                tickLine={false}
                interval={0}
                tick={<CustomYAxisTick x={0} y={0} payload={{ value: "" }} />}
                tickFormatter={(value) => formatNumberWithCommas(value)}
                tickMargin={20}
              />
            )}

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
      </ChartWrapper>
    </GraphContainer>
  );
}
