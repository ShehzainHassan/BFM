import { invoiceData } from "@/constants";
import styled from "styled-components";
import TextComponent from "../../components/TextComponent/TextComponent";

export default function InvoiceContainer() {
  const Container = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: 4fr 4fr 4fr;
    gap: 16px;
    max-width: 1300px;
    width: 100%;
  `;

  return (
    <Container>
      {invoiceData.map((invoice, index) => (
        <TextComponent key={index} {...invoice} />
      ))}
    </Container>
  );
}
