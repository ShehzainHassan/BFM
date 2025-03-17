import { BFMPalette } from "@/Theme";
import styled from "styled-components";
import InvoiceDetails from "../InvoiceDetails/InvoiceDetails";
import SelectDropDown from "../SelectDropDown/SelectDropDown";

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
  background-color: ${BFMPalette.white};
`;
const Preview = styled("div")`
  padding: 24px;
  background-color: ${BFMPalette.black800};
`;
export default function CreateNewInvoice() {
  return (
    <Container>
      <Inputs>
        <SelectDropDown />
        <InvoiceDetails />
      </Inputs>
      <Preview />
    </Container>
  );
}
