import useTranslation from "@/translations";
import InputWithLabel from "../InputWithLabel/Input";
import styled from "styled-components";
import InputCurrency from "../InputCurrency/InputCurrency";
import InputDate from "../InputDate/InputDate";
import Checkbox from "../Checkbox/Checkbox";
import { BFMPalette } from "@/Theme";
import Image from "next/image";
import InvoiceItem from "../InvoiceItem/InvoiceItem";
import { useData } from "@/DataContext";
import { useState } from "react";

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
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const {
    invoiceSubject,
    setInvoiceSubject,
    invoiceDetails,
    setInvoiceDetails,
  } = useData();
  return (
    <Container>
      <InputWithLabel
        value={invoiceSubject}
        onChange={(e) => setInvoiceSubject(e.target.value)}
        label={t("invoice_creation.subject.label")}
        placeholder={t("invoice_creation.subject.placeholder")}
      />
      <InputWithLabel
        value={invoiceDetails}
        onChange={(e) => setInvoiceDetails(e.target.value)}
        label={t("invoice_creation.invoice_detail.label")}
        placeholder={t("invoice_creation.invoice_detail.placeholder")}
      />
      <CurrencyDateContainer>
        <InputCurrency
          currency={currency}
          price={amount}
          onChangeCurrency={setCurrency}
          onChangeAmount={(e) => setAmount(Number(e.target.value))}
          label="Currency"
        />
        <InputDate label="Invoice Due" />
      </CurrencyDateContainer>
      <InvoiceItem />

      <Checkbox label="Add payment method" />
      <Checkbox label="Add discount" />
    </Container>
  );
}
