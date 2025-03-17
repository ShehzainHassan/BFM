import useTranslation from "@/translations";
import InputWithLabel from "../InputWithLabel/Input";
import styled from "styled-components";
import InputCurrency from "../InputCurrency/InputCurrency";
import InputDate from "../InputDate/InputDate";
import Checkbox from "../Checkbox/Checkbox";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const CurrencyDateContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export default function InvoiceDetails() {
  const { t } = useTranslation();
  return (
    <Container>
      <InputWithLabel
        label={t("invoice_creation.subject.label")}
        placeholder={t("invoice_creation.subject.placeholder")}
      />
      <InputWithLabel
        label={t("invoice_creation.invoice_detail.label")}
        placeholder={t("invoice_creation.invoice_detail.placeholder")}
      />
      <CurrencyDateContainer>
        <InputCurrency label="Currency" />
        <InputDate label="Invoice Due" />
      </CurrencyDateContainer>
      <Checkbox label="Add payment method" />
      <Checkbox label="Add discount" />
    </Container>
  );
}
