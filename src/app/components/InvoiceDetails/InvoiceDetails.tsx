import { useData } from "@/DataContext";
import useTranslation from "@/translations";
import { useState } from "react";
import styled from "styled-components";
import Checkbox from "../Checkbox/Checkbox";
import InputCurrency from "../InputCurrency/InputCurrency";
import InputDate from "../InputDate/InputDate";
import InputWithLabel from "../InputWithLabel/Input";
import InvoiceItem from "../InvoiceItem/InvoiceItem";

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
const PaymentsContainer = styled("div")`
  display: flex;
  gap: 6px;
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
    discount,
    setDiscount,
    hasDiscount,
    setHasDiscount,
    hasPaymentChecked,
    setHasPaymentChecked,
    bankDetails,
    setBankDetails,
    items,
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

      <Checkbox
        label="Add payment method"
        checked={hasPaymentChecked}
        setChecked={setHasPaymentChecked}
      />
      {hasPaymentChecked && (
        <PaymentsContainer>
          <InputWithLabel
            value={bankDetails.bankName}
            onChange={(e) =>
              setBankDetails({
                ...bankDetails,
                bankName: e.target.value,
                name: bankDetails.name || "",
                accountNumber: bankDetails.accountNumber || "",
                SWIFTCode: bankDetails.SWIFTCode || "",
                bankAddress: bankDetails.bankAddress || "",
              })
            }
            label="Bank Name"
            placeholder="Enter bank name"
          />
          <InputWithLabel
            value={bankDetails.name}
            onChange={(e) =>
              setBankDetails({
                ...bankDetails,
                bankName: bankDetails.bankName || "",
                name: e.target.value || "",
                accountNumber: bankDetails.accountNumber || "",
                SWIFTCode: bankDetails.SWIFTCode || "",
                bankAddress: bankDetails.bankAddress || "",
              })
            }
            label="Name"
            placeholder="Enter name"
          />
          <InputWithLabel
            value={bankDetails.accountNumber}
            onChange={(e) =>
              setBankDetails({
                ...bankDetails,
                bankName: bankDetails.bankName || "",
                name: bankDetails.name || "",
                accountNumber: e.target.value,
                SWIFTCode: bankDetails.SWIFTCode || "",
                bankAddress: bankDetails.bankAddress || "",
              })
            }
            label="Account No."
            placeholder="XXX-XXX-XXX"
          />
          <InputWithLabel
            value={bankDetails.SWIFTCode}
            onChange={(e) =>
              setBankDetails({
                ...bankDetails,
                bankName: bankDetails.bankName || "",
                name: bankDetails.name || "",
                accountNumber: bankDetails.accountNumber || "",
                SWIFTCode: e.target.value,
                bankAddress: bankDetails.bankAddress || "",
              })
            }
            label="SWIFT Code"
            placeholder="Enter SWIFT Code"
          />
          <InputWithLabel
            value={bankDetails.bankAddress}
            onChange={(e) =>
              setBankDetails({
                ...bankDetails,
                bankName: bankDetails.bankName || "",
                name: bankDetails.name || "",
                accountNumber: bankDetails.accountNumber || "",
                SWIFTCode: bankDetails.SWIFTCode || "",
                bankAddress: e.target.value,
              })
            }
            label="Bank Address"
            placeholder="Enter address"
          />
        </PaymentsContainer>
      )}
      {items.length > 0 && (
        <Checkbox
          label="Add discount"
          checked={hasDiscount}
          setChecked={setHasDiscount}
        />
      )}

      {hasDiscount && (
        <InputWithLabel
          showPercentage={true}
          type="number"
          isRequired={false}
          minimum={0}
          maximum={100}
          value={discount}
          onChange={(e) => {
            const inputValue = Number(e.target.value);
            if (inputValue > 100) {
              setDiscount(100);
            } else {
              setDiscount(inputValue);
            }
          }}
          label="Discount"
          placeholder="Enter discount"
        />
      )}
    </Container>
  );
}
