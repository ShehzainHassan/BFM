import { fromAddress, toAddress } from "@/constants";
import { useInvoice } from "@/InvoiceContext";
import { BFMPalette } from "@/Theme";
import useTranslation from "@/translations";
import { formatDate, getFirstDayOfMonth } from "@/utils";
import Image from "next/image";
import styled from "styled-components";
import Address from "../Address/Address";
import Notes from "../Notes/Notes";
import InfoTable from "../PaymentsTable/PaymentsTable";
import InvoiceTable from "./InvoiceTable/InvoiceTable";
import { useInvoiceItem } from "@/InvoiceItemContext";
import { useInvoiceBankDetails } from "@/InvoiceBankDetailsContext";

const Container = styled("div")`
  background-color: ${BFMPalette.white25};
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;
const SubContainer = styled("div")`
  display: grid;
  grid-template-columns: 6fr 6fr;
  gap: 24px;
`;
const TableContainer = styled("div")`
  display: grid;
  grid-template-columns: 1.57fr 10.43fr;
`;

export default function PreviewDetails() {
  const { t } = useTranslation();
  const {
    companyAddress,
    invoiceDetails,
    dueDate,
    hasPaymentChecked,
    invoiceNumber,
  } = useInvoice();
  const { items } = useInvoiceItem();
  const { bankDetails } = useInvoiceBankDetails();
  return (
    <Container>
      <Notes title="Invoice number" value={invoiceNumber} />
      <SubContainer>
        <Address
          title="From"
          company={fromAddress.name}
          address={fromAddress.address}
        />
        <Address
          title="To"
          company={t(`invoice_creation.dropdown.options.${companyAddress}`)}
          address={toAddress}
        />
      </SubContainer>
      <SubContainer>
        {dueDate && (
          <Notes
            title="Invoice date"
            value={formatDate(getFirstDayOfMonth(dueDate))}
          />
        )}
        {dueDate && (
          <Notes title="Invoice due date" value={formatDate(dueDate)} />
        )}
      </SubContainer>
      {invoiceDetails ? (
        <Notes title="Invoice Detail" value={invoiceDetails} />
      ) : (
        <Notes title="Invoice Detail" value="" />
      )}
      <InvoiceTable rows={items} />
      {hasPaymentChecked && (
        <TableContainer>
          <Image
            src="/images/qr-code 1.png"
            alt="QR-Code"
            width={56}
            height={56}
          />
          <InfoTable data={bankDetails} />
        </TableContainer>
      )}
    </Container>
  );
}
