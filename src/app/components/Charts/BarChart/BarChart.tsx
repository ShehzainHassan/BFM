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
  ButtonContainer,
  CustomTooltipContainer,
  CustomTooltipLabel,
  CustomTooltipValue,
  MobileContainer,
  ValueContainer,
} from "../BalanceOverTime/BalanceTime";
import { ChartProps, CustomLabelProps } from "../../../../../Interfaces";
import useIsMobile from "@/useIsMobile";
import Image from "next/image";
import { H5, Header } from "@/Typography";
import React, { useMemo, useState } from "react";

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
    <foreignObject
      key={`label-${value}`}
      x={parsedX - 6}
      y={parsedY - 30}
      width={60}
      height={30}>
      <LabelContainer>
        <LabelText>{value}</LabelText>
      </LabelContainer>
    </foreignObject>
  );
};

CustomLabel.displayName = "CustomLabel";

export default function BarGraph({
  data,
  color,
  barSize = 48,
  selectedBarColor,
}: ChartProps) {
  const isMobile = useIsMobile(768);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => setSelectedIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setSelectedIndex((prev) => Math.min(prev + 1, data.length - 1));

  const coloredData = useMemo(() => {
    return data.map((entry, index) => ({
      ...entry,
      fill:
        index === selectedIndex
          ? selectedBarColor ?? BFMPalette.purple600
          : `${BFMPalette.purple200}80`,
    }));
  }, [data, selectedIndex, selectedBarColor]);

  const selectedData = data[selectedIndex];
  return (
    <>
      {isMobile && data.length > 0 && (
        <MobileContainer>
          <ButtonContainer>
            <Image
              onClick={handlePrev}
              src="/images/prev.png"
              alt="prev"
              width={10}
              height={10}
            />
          </ButtonContainer>
          <ValueContainer>
            <H5 color={BFMPalette.black800}>
              {selectedData.monthYear ?? "--"}
            </H5>
            <Header color={BFMPalette.black800}>
              {selectedData.value?.toLocaleString() ?? "--"}
            </Header>
          </ValueContainer>

          <ButtonContainer>
            <Image
              onClick={handleNext}
              src="/images/next.png"
              alt="next"
              width={10}
              height={10}
            />
          </ButtonContainer>
        </MobileContainer>
      )}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          barSize={barSize}
          data={coloredData}
          margin={{
            top: 25,
            right: isMobile ? 0 : 30,
            left: isMobile ? -60 : 20,
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
              !isMobile ? (
                <CustomTick
                  x={0}
                  y={0}
                  payload={{
                    value: "",
                  }}
                />
              ) : (
                ({ x, y, payload }) => (
                  <text
                    x={x}
                    y={y - 10}
                    fontSize={12}
                    fontWeight={500}
                    fill={BFMPalette.black100}>
                    {payload.value}
                  </text>
                )
              )
            }
          />
          {!isMobile && <Tooltip content={<CustomTooltip />} />}
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
    </>
  );
}
