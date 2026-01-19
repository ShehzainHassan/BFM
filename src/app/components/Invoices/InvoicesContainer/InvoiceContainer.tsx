import { useInvoice } from "@/InvoiceContext";
import { BFMPalette } from "@/Theme";
import styled from "styled-components";
import TextComponent from "../../TextComponent/TextComponent";

const ScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(260px, 1fr));
  gap: 16px;
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 85%);
  }
`;

const CardWrapper = styled.div`
  scroll-snap-align: start;
`;

export default function InvoiceContainer() {
  const { invoicesSummary } = useInvoice();

  const parseAmount = (amount: string) => {
    const parts = amount.split(" ");
    return parseFloat(parts[1] || "0");
  };

  const summaryData = [
    {
      title: "Invoice Pending",
      timePeriod: "since last month",
      percentage: 8,
      value: invoicesSummary
        .filter((inv) => inv.category === "PENDING")
        .reduce((sum, inv) => sum + parseAmount(inv.invoiceAmount), 0),
    },
    {
      title: "Invoice Overdue",
      timePeriod: "since last month",
      percentage: 2,
      value: invoicesSummary
        .filter((inv) => inv.category === "OVERDUE")
        .reduce((sum, inv) => sum + parseAmount(inv.invoiceAmount), 0),
      valueColor: BFMPalette.red500,
    },
    {
      title: "Invoice Paid",
      timePeriod: "since last month",
      percentage: 8,
      value: invoicesSummary
        .filter((inv) => inv.category === "PAID")
        .reduce((sum, inv) => sum + parseAmount(inv.invoiceAmount), 0),
    },
  ];

  return (
    <ScrollWrapper>
      <Container>
        {summaryData.map((invoice, index) => (
          <CardWrapper key={index}>
            <TextComponent {...invoice} />
          </CardWrapper>
        ))}
      </Container>
    </ScrollWrapper>
  );
}
