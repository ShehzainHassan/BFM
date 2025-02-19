import styled from "styled-components";
import TextComponent from "../TextComponent/TextComponent";
import { BFMPalette } from "@/Theme";

export default function InvoiceContainer() {
  const Container = styled("div")`
    display: flex;
    gap: 16px;
  `;
  return (
    <Container>
      <TextComponent
        title="Invoice Pending"
        timePeriod="since last month"
        percentage={8}
        value="HKD 1,300,000.00"
      />
      <TextComponent
        title="Invoice Overdue"
        timePeriod="since last month"
        percentage={2}
        value="HKD 240,000.00"
        valueColor={BFMPalette.red500}
      />
      <TextComponent
        title="Invoice Paid"
        timePeriod="since last month"
        percentage={8}
        value="HKD 00,000.00"
      />
    </Container>
  );
}
