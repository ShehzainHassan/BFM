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
        value={1300000.0}
      />
      <TextComponent
        title="Invoice Overdue"
        timePeriod="since last month"
        percentage={2}
        value={240000.0}
        valueColor={BFMPalette.red500}
      />
      <TextComponent
        title="Invoice Paid"
        timePeriod="since last month"
        percentage={8}
        value={0}
      />
    </Container>
  );
}
