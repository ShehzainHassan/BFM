import styled from "styled-components";
import TextComponent from "../TextComponent/TextComponent";
import { BFMPalette } from "@/Theme";

export default function InvoiceContainer() {
  const Container = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: 4fr 4fr 4fr;
    gap: 16px;
    max-width: 1300px;
    width: 100%;
  `;

  const invoiceData = [
    {
      title: "Invoice Pending",
      timePeriod: "since last month",
      percentage: 8,
      value: 1300000.0,
    },
    {
      title: "Invoice Overdue",
      timePeriod: "since last month",
      percentage: 2,
      value: 240000.0,
      valueColor: BFMPalette.red500,
    },
    {
      title: "Invoice Paid",
      timePeriod: "since last month",
      percentage: 8,
      value: 0,
    },
  ];

  return (
    <Container>
      {invoiceData.map((invoice, index) => (
        <TextComponent key={index} {...invoice} />
      ))}
    </Container>
  );
}
