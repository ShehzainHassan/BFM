import { ResponsiveBar } from "@nivo/bar";
import { JSX } from "react";
import { useData } from "@/DataContext";
import styled from "styled-components";
import { BFMPalette } from "@/Theme";

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
  font-size: 14px;
  font-weight: bold;
  color: ${BFMPalette.black50};
`;

const ColorBox = styled.div<{ $bgColor: string }>`
  width: 16px;
  height: 8px;
  border-radius: 100px;
  background-color: ${(props) => props.$bgColor};
`;

export default function CashflowChart(): JSX.Element {
  const { cashflowData } = useData();
  return (
    <ChartContainer>
      <Legend>
        <LegendItem>
          <ColorBox $bgColor={BFMPalette.purple800} />
          Total Deposit
        </LegendItem>
        <LegendItem>
          <ColorBox $bgColor={BFMPalette.purple925} />
          Total Withdrawal
        </LegendItem>
      </Legend>

      <ResponsiveBar
        data={cashflowData}
        keys={["positive", "negative"]}
        indexBy="category"
        margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
        padding={0.65}
        layout="vertical"
        colors={({ id }) =>
          id === "negative" ? BFMPalette.purple925 : BFMPalette.purple800
        }
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      />
    </ChartContainer>
  );
}
