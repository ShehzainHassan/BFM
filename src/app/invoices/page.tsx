"use client";
import styled from "styled-components";
import InvoiceContainer from "../components/InvoicesContainer/InvoiceContainer";
import InvoiceOverview from "../components/InvoiceOverview/InvoiceOverview";
import InvoiceSummary from "../components/InvoiceSummary/InvoiceSummary";
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`;
export default function Invoices() {
  return (
    <Container>
      <InvoiceContainer />
      <InvoiceOverview />
      <InvoiceSummary />
    </Container>
  );
}
