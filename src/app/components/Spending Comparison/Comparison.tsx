import styled from "styled-components";
import Card from "../Card/Card";
import { BFMPalette } from "@/Theme";
import { H5 } from "@/Typography";
import { CURRENCY } from "@/constants";
import { formatCurrency } from "@/utils";
import { Payload } from "../../../../Interfaces";
const BarsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BarUI = styled("div")`
  position: relative;
  width: 100%;
  height: 25px;
  background-color: ${BFMPalette.purple125};
  border-radius: 8px;
`;

const Filled = styled.div<{ $filledValue?: number; $filledColor?: string }>`
  height: 100%;
  width: ${({ $filledValue }) => ($filledValue ? `${$filledValue}%` : "0%")};
  background-color: ${({ $filledColor }) => $filledColor || "purple"};
  border-radius: ${({ $filledValue }) =>
    $filledValue === 100 ? "8px" : "8px 0 0 8px"};
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
  padding: 2px 6px;
  color: ${BFMPalette.purple800};
  background-color: ${BFMPalette.white25};
  border: 1px solid ${BFMPalette.white25};
  border-radius: 16px;
`;

type ComparisonProps = {
  spendingData: Payload;
};
export default function Comparison({ spendingData }: ComparisonProps) {
  const currentValue = Number(spendingData.current.value);
  const previousValue = Number(spendingData.previous.value);
  const maxValue = Math.max(currentValue, previousValue);
  const getFillPercentage = (value: number) => {
    return (value / maxValue) * 100;
  };
  return (
    <Card
      image="/images/spend.png"
      title="Your advertising / marketing spend is less than last month">
      <BarsContainer>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <H5 color={BFMPalette.black800}>{spendingData.current.month}</H5>
          <BarUI>
            <Filled
              $filledColor={BFMPalette.purple600}
              $filledValue={getFillPercentage(currentValue)}
            />
            <Badge>
              {formatCurrency(`${CURRENCY}${spendingData.current.value}`)}
            </Badge>
          </BarUI>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <H5 color={BFMPalette.black800}>{spendingData.previous.month}</H5>
          <BarUI>
            <Filled
              $filledColor={BFMPalette.purple300}
              $filledValue={getFillPercentage(previousValue)}
            />
            <Badge>
              {formatCurrency(`${CURRENCY}${spendingData.previous.value}`)}
            </Badge>
          </BarUI>
        </div>
      </BarsContainer>
    </Card>
  );
}
