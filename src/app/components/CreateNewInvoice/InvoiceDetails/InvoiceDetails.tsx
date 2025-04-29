import { useInvoice } from "@/InvoiceContext";
import useTranslation from "@/translations";
import { formatCurrency } from "@/utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Checkbox from "../../Checkbox/Checkbox";
import InputCurrency from "../../InputCurrency/InputCurrency";
import InputDate from "../../InputDate/InputDate";
import InputWithLabel from "../../InputWithLabel/Input";
import InvoiceItem from "../InvoiceItem/InvoiceItem";
import { useInvoiceItem } from "@/InvoiceItemContext";
import { useInvoiceBankDetails } from "@/InvoiceBankDetailsContext";
import { H3 } from "@/Typography";
import { BFMPalette } from "@/Theme";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const CurrencyDateContainer = styled("div")`
  display: grid;
  grid-template-columns: 6fr 6fr;
  gap: 20px;
`;
const LabelContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const PaymentsContainer = styled("div")`
  display: flex;
  gap: 6px;
`;
export default function InvoiceDetails() {
  const { t } = useTranslation();
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
    subTotal,
    setSubTotal,
    dueDate,
    setDueDate,
  } = useInvoice();
  const { items, currency, handleCurrencyChange } = useInvoiceItem();
  const { bankDetails, setBankDetails } = useInvoiceBankDetails();
  const [localDetails, setLocalDetails] = useState(invoiceDetails);
  const [localDate, setLocalDate] = useState(dueDate);
  const [localBankDetails, setLocalBankDetails] = useState(bankDetails);
  const [localDiscount, setLocalDiscount] = useState(discount);
  const [invoiceSubjectInteracted, setInvoiceSubjectInteracted] =
    useState(false);
  const [invoiceDetailInteracted, setInvoiceDetailInteracted] = useState(false);
  const [invoiceDateInteracted, setInvoiceDateInteracted] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      setSubTotal(formatCurrency(`${currency} ${0.0}`, 2));
    }
  }, [items, currency, setSubTotal]);
  return (
    <Container>
      <LabelContainer>
        <InputWithLabel
          value={invoiceSubject}
          onChange={(e) => setInvoiceSubject(e.target.value)}
          label={t("invoice_creation.subject.label")}
          onBlur={() => setInvoiceSubjectInteracted(true)}
          placeholder={t("invoice_creation.subject.placeholder")}
        />
        {invoiceSubjectInteracted && !invoiceSubject.trim() && (
          <H3 color={BFMPalette.red600}>
            Please enter a subject for the invoice
          </H3>
        )}
      </LabelContainer>
      <LabelContainer>
        <InputWithLabel
          value={localDetails}
          onChange={(e) => setLocalDetails(e.target.value)}
          onBlur={() => {
            setInvoiceDetailInteracted(true);
            setInvoiceDetails(localDetails);
          }}
          label={t("invoice_creation.invoice_detail.label")}
          placeholder={t("invoice_creation.invoice_detail.placeholder")}
        />
        {invoiceDetailInteracted && !localDetails.trim() && (
          <H3 color={BFMPalette.red600}>Please enter invoice details</H3>
        )}
      </LabelContainer>
      <CurrencyDateContainer>
        <LabelContainer>
          <InputCurrency
            currency={currency}
            value={Number(subTotal?.split(" ")[1]?.replace(/,/g, "")) ?? 0}
            onChangeCurrency={(newCurrency) =>
              handleCurrencyChange(newCurrency)
            }
            label="Currency"
            readonly={true}
          />
        </LabelContainer>

        <LabelContainer>
          <InputDate
            label="Invoice Due"
            dueDate={localDate}
            onChange={(e) => setLocalDate(e.target.value)}
            onBlur={() => {
              setInvoiceDateInteracted(true);
              setDueDate(localDate);
            }}
          />
          {invoiceDateInteracted && !localDate.trim() && (
            <H3 color={BFMPalette.red600}>Please enter invoice due date</H3>
          )}
        </LabelContainer>
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
            value={localBankDetails.bankName || ""}
            onChange={(e) =>
              setLocalBankDetails({
                ...localBankDetails,
                bankName: e.target.value,
              })
            }
            onBlur={() =>
              setBankDetails({
                ...bankDetails,
                bankName: localBankDetails.bankName,
              })
            }
            label="Bank Name"
            placeholder="Enter bank name"
          />
          <InputWithLabel
            value={localBankDetails.name}
            onChange={(e) =>
              setLocalBankDetails({
                ...localBankDetails,
                name: e.target.value,
              })
            }
            onBlur={() =>
              setBankDetails({
                ...bankDetails,
                name: localBankDetails.name,
              })
            }
            label="Name"
            placeholder="Enter name"
          />
          <InputWithLabel
            value={localBankDetails.accountNumber}
            onChange={(e) =>
              setLocalBankDetails({
                ...localBankDetails,
                accountNumber: e.target.value,
              })
            }
            onBlur={() =>
              setBankDetails({
                ...bankDetails,
                accountNumber: localBankDetails.accountNumber,
              })
            }
            label="Account No."
            placeholder="XXX-XXX-XXX"
          />
          <InputWithLabel
            value={localBankDetails.SWIFTCode}
            onChange={(e) =>
              setLocalBankDetails({
                ...localBankDetails,
                SWIFTCode: e.target.value,
              })
            }
            onBlur={() =>
              setBankDetails({
                ...bankDetails,
                SWIFTCode: localBankDetails.SWIFTCode,
              })
            }
            label="SWIFT Code"
            placeholder="Enter SWIFT Code"
          />
          <InputWithLabel
            value={localBankDetails.bankAddress}
            onChange={(e) =>
              setLocalBankDetails({
                ...localBankDetails,
                bankAddress: e.target.value,
              })
            }
            onBlur={() =>
              setBankDetails({
                ...bankDetails,
                bankAddress: localBankDetails.bankAddress,
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
          value={localDiscount}
          onChange={(e) => {
            const inputValue = Number(e.target.value);
            const safeValue = Math.min(Math.max(inputValue, 0), 100);
            setLocalDiscount(safeValue);
          }}
          onBlur={() => setDiscount(localDiscount)}
          label="Discount"
          placeholder="Enter discount"
        />
      )}
    </Container>
  );
}
