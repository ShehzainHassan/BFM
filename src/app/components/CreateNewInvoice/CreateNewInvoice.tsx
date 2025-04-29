import { BFMPalette } from "@/Theme";
import { H2 } from "@/Typography";
import styled from "styled-components";
import PreviewDetails from "../PreviewDetails/PreviewDetails";
import SelectDropDown from "../SelectDropDown/SelectDropDown";
import InvoiceDetails from "./InvoiceDetails/InvoiceDetails";

const Container = styled("div")`
  display: grid;
  grid-template-columns: 6.46fr 5.54fr;
  width: 100%;
  background-color: ${BFMPalette.white};
  border-radius: 12px;
`;
const Inputs = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  max-width: 700px;
`;
const Preview = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background-color: ${BFMPalette.gray200};
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`;
export default function CreateNewInvoice() {
  return (
    <Container>
      <Inputs>
        <SelectDropDown />
        <InvoiceDetails />
      </Inputs>
      <Preview>
        <H2 color={BFMPalette.black800}>Invoice Preview</H2>
        <PreviewDetails />
      </Preview>
    </Container>
  );
}
