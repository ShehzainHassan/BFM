import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import styled from "styled-components";
import TextComponent from "../../components/TextComponent/TextComponent";

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 4fr 4fr 4fr;
  gap: 16px;
  max-width: 1300px;
  width: 100%;
`;

export default function InvoiceContainer() {
  const { invoicesSummary } = useData();
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
    <Container>
      {summaryData.map((invoice, index) => (
        <TextComponent key={index} {...invoice} />
      ))}
    </Container>
  );
}
