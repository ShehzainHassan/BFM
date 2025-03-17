import Image from "next/image";
import InputWithLabel from "../InputWithLabel/Input";
import InputCurrency from "../InputCurrency/InputCurrency";
import styled from "styled-components";
import { BFMPalette } from "@/Theme";
const AdditionalInfoContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const AddItems = styled("div")`
  padding: 20px 16px 16px 16px;
  border-radius: 12px;
  border: 1px solid ${BFMPalette.gray100};
  background-color: ${BFMPalette.white25};
`;

export default function InvoiceItem() {
  return (
    <AddItems>
      <AdditionalInfoContainer>
        <Image
          src="/images/dots-grid.png"
          alt="delete"
          width={24}
          height={24}
        />
        <InputWithLabel
          isRequired={false}
          showLabel={false}
          placeholder="Enter item descriptions"
        />
        <InputWithLabel
          isRequired={false}
          showLabel={false}
          placeholder="Qty"
        />
        <InputCurrency showLabel={false} isRequired={false} />
        <Image
          style={{ cursor: "pointer" }}
          src="/images/delete.png"
          alt="delete"
          width={20}
          height={20}
        />
      </AdditionalInfoContainer>
    </AddItems>
  );
}
