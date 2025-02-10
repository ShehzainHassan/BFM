import styled from "styled-components";
import Card from "../Card/Card";
import { BFMPalette } from "@/Theme";

export default function Comparison() {
  const Heading2 = styled("h2")`
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    margin: 0;
  `;
  const BarsContainer = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `;
  const BarUI = styled("div")`
    position: relative;
    background-color: ${BFMPalette.purple125};
    width: 100%;
    height: 25px;
    border-radius: 8px;
  `;
  const Filled = styled.div<{ $filledValue?: number; $filledColor?: string }>`
    height: 100%;
    width: ${({ $filledValue }) => ($filledValue ? `${$filledValue}%` : "0%")};
    background-color: ${({ $filledColor }) => $filledColor || "purple"};
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  `;

  const Badge = styled("div")`
    display: flex;
    align-items: center;
    font-size: 10px;
    line-height: 12px;
    font-weight: 600;
    position: absolute;
    top: 15%;
    right: 4px;
    padding: 2px 6px 2px 6px;
    color: ${BFMPalette.purple800};
    background-color: ${BFMPalette.white25};
    border: 1px solid ${BFMPalette.white25};
    border-radius: 16px;
  `;
  return (
    <Card
      image="/images/Frame 1.png"
      title="Your advertising / marketing spend is less than last month">
      <BarsContainer>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Heading2>MAR 2024</Heading2>
          <BarUI>
            <Filled $filledColor={BFMPalette.purple600} $filledValue={80} />
            <Badge>HKD 20,000</Badge>
          </BarUI>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Heading2>MAR 2024</Heading2>
          <BarUI>
            <Filled $filledColor={BFMPalette.purple300} $filledValue={90} />
            <Badge>HKD 20,000</Badge>
          </BarUI>
        </div>
      </BarsContainer>
    </Card>
  );
}
