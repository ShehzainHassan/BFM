import { BFMPalette } from "@/Theme";
import { ResponsivePie } from "@nivo/pie";
import styled from "styled-components";

type DataItem = {
  name: string;
  value: number;
  month: string;
};

type PieChartProps = {
  data: DataItem[];
  colors: string[];
  total?: string;
  totalCarbon?: number;
  unit?: string;
  supportingText?: string;
};

const PieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
`;

const PieGraph = ({
  data,
  colors,
  total,
  totalCarbon,
  unit,
  supportingText,
}: PieChartProps) => {
  const CenteredText = ({
    centerX,
    centerY,
  }: {
    centerX: number;
    centerY: number;
  }) => {
    if (total) {
      return (
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            fill: "#333",
          }}>
          {total}
        </text>
      );
    } else if (totalCarbon !== undefined && unit && supportingText) {
      return (
        <>
          <text
            x={centerX}
            y={centerY - 6}
            textAnchor="middle"
            dominantBaseline="central">
            <tspan
              style={{
                fontSize: "14px",
                fontWeight: 600,
                fill: BFMPalette.black800,
              }}>
              {totalCarbon}
            </tspan>
            <tspan
              dx="4"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                fill: BFMPalette.gray700,
              }}>
              {unit}
            </tspan>
          </text>

          <text
            x={centerX}
            y={centerY + 15}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              fill: BFMPalette.black100,
            }}>
            {supportingText}
          </text>
        </>
      );
    }
    return null;
  };
  const formattedData = data.map((item, index) => ({
    id: item.name,
    label: item.name,
    value: Math.abs(item.value),
    color: colors[index % colors.length],
  }));

  return (
    <PieContainer>
      <ResponsivePie
        data={formattedData}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        innerRadius={0.8}
        padAngle={0}
        cornerRadius={0}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLabels={false}
        arcLinkLabelsTextColor="transparent"
        arcLinkLabelsThickness={0}
        arcLinkLabelsColor="transparent"
        arcLabelsSkipAngle={360}
        colors={({ data }) => data.color}
        layers={["arcs", "arcLabels", "arcLinkLabels", "legends", CenteredText]}
      />
    </PieContainer>
  );
};

export default PieGraph;
