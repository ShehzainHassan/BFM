import { HKD_EQUIVALANT } from "@/constants";
import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import { H3, H3Primary, H5 } from "@/Typography";
import useIsMobile from "@/useIsMobile";
import { formatCurrency, getDynamicScale } from "@/utils";
import { BarCustomLayerProps, BarTooltipProps, ResponsiveBar } from "@nivo/bar";
import { JSX } from "react";
import styled from "styled-components";
import { CashFlowData } from "../../../../Interfaces/Interfaces";

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 500px;
  padding: 24px 24px 40px 24px;
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${BFMPalette.black50};
`;

const ColorBox = styled.div<{ $bgColor: string }>`
  width: 16px;
  height: 8px;
  border-radius: 100px;
  background-color: ${(props) => props.$bgColor};
`;

const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: ${BFMPalette.white25};
  padding: 8px 10px;
  border: 1px solid ${BFMPalette.gray100};
  border-radius: 12px;
`;
const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const CustomTooltip = ({ data }: BarTooltipProps<CashFlowData>) => {
  return (
    <TooltipContainer>
      <LabelContainer>
        <H3 color={BFMPalette.black800}>{data.category}</H3>
      </LabelContainer>

      <LabelContainer>
        <H5 color={BFMPalette.gray700}>Deposits</H5>
        <H3Primary color={BFMPalette.purple375}>
          {formatCurrency(`${HKD_EQUIVALANT}${data.positive}`, 2)}
        </H3Primary>
      </LabelContainer>
      <LabelContainer>
        <H5 color={BFMPalette.gray700}>Withdrawals</H5>
        <H3Primary color={BFMPalette.red500}>
          {formatCurrency(`${HKD_EQUIVALANT}${data.negative}`, 2)}
        </H3Primary>
      </LabelContainer>
      <LabelContainer>
        <H5 color={BFMPalette.gray700}>Net</H5>
        <H3Primary color={BFMPalette.black800}>
          {formatCurrency(
            `${HKD_EQUIVALANT}${data.positive + data.negative}`,
            2
          )}
        </H3Primary>
      </LabelContainer>
    </TooltipContainer>
  );
};
export default function CashflowChart(): JSX.Element {
  const { cashflowData } = useData();
  const isMobile = useIsMobile(768);
  const maxValue = Math.max(
    ...cashflowData.flatMap((item) => [
      Math.abs(item.positive),
      Math.abs(item.negative),
    ])
  );

  const scaleMax = getDynamicScale(maxValue);
  const scaleMultiplier = isMobile ? 1.2 : 1;
  const graphScale = scaleMax * scaleMultiplier;

  const CustomLineLayer = ({
    bars,
    yScale,
  }: BarCustomLayerProps<CashFlowData>) => {
    const { lineChartData } = useData();
    const circleRadius = 6;

    const points = lineChartData
      .map((point) => {
        const matchingBar = bars.find((bar) => bar.index === point.index);
        if (!matchingBar) return null;

        return {
          x: matchingBar.x + matchingBar.width / 2,
          y: yScale(point.value),
        };
      })
      .filter(Boolean);
    return (
      <g>
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point?.x}
            cy={point?.y}
            r={6}
            fill={BFMPalette.white}
            stroke={BFMPalette.red500}
            strokeWidth={2}
          />
        ))}
        {points.slice(1).map((point, index) => {
          const prevPoint = points[index];
          if (!point || !prevPoint) return null;
          const angle = Math.atan2(
            point.y - prevPoint.y,
            point.x - prevPoint.x
          );

          const x1 = prevPoint.x + circleRadius * Math.cos(angle);
          const y1 = prevPoint.y + circleRadius * Math.sin(angle);
          const x2 = point.x - circleRadius * Math.cos(angle);
          const y2 = point.y - circleRadius * Math.sin(angle);
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={BFMPalette.red500}
              strokeWidth={1}
            />
          );
        })}
      </g>
    );
  };

  const CustomLabels = ({ bars }: BarCustomLayerProps<CashFlowData>) => {
    const isMobile = useIsMobile(768);
    return (
      <>
        {bars.map((bar) => {
          const { id, formattedValue } = bar.data;
          const isNegative = id === "negative";
          const textX = bar.x + bar.width / 2;
          const textY = isNegative ? bar.y + bar.height + 20 : bar.y - 20;
          const bgColor = isNegative
            ? BFMPalette.skin200
            : BFMPalette.purple250;
          const borderColor = isNegative
            ? BFMPalette.skin300
            : BFMPalette.purple200;
          const textColor = isNegative
            ? BFMPalette.red700
            : BFMPalette.purple600;

          return (
            <g key={bar.key} transform={`translate(${textX}, ${textY})`}>
              <rect
                x={-45}
                y={-10}
                width={!isMobile ? 100 : 80}
                height={!isMobile ? 20 : 15}
                fill={bgColor}
                stroke={borderColor}
                strokeWidth={1}
                rx={10}
                ry={10}
              />
              <text
                x={!isMobile ? 5 : -2}
                y={!isMobile ? 4 : 2}
                textAnchor="middle"
                fontSize={!isMobile ? 10 : 9}
                fontWeight={500}
                fill={textColor}>
                {formatCurrency(`${HKD_EQUIVALANT}${formattedValue}`, 2)}
              </text>
            </g>
          );
        })}
      </>
    );
  };

  return (
    <ChartContainer>
      <Legend>
        <LegendItem>
          <ColorBox $bgColor={BFMPalette.purple800} />
          <H5 color={BFMPalette.black50}>Total Deposit</H5>
        </LegendItem>
        <LegendItem>
          <ColorBox $bgColor={BFMPalette.purple925} />
          <H5 color={BFMPalette.black50}>Total Withdrawal</H5>
        </LegendItem>
        <LegendItem>
          <ColorBox $bgColor={BFMPalette.red500} />
          <H5 color={BFMPalette.black50}>Net Flow</H5>
        </LegendItem>
      </Legend>

      <ResponsiveBar
        data={cashflowData}
        keys={["positive", "negative"]}
        indexBy="category"
        margin={
          !isMobile
            ? { top: 20, right: 20, bottom: 40, left: 60 }
            : { top: 0, right: -20, bottom: 30, left: -26 }
        }
        padding={0.65}
        layout="vertical"
        colors={({ id }) =>
          id === "negative" ? BFMPalette.purple925 : BFMPalette.purple800
        }
        enableLabel={false}
        minValue={-graphScale}
        maxValue={graphScale}
        tooltip={CustomTooltip}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        layers={[
          "grid",
          "axes",
          "bars",
          "markers",
          "legends",
          CustomLabels,
          CustomLineLayer,
        ]}
      />
    </ChartContainer>
  );
}
