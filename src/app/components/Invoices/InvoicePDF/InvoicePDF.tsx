import { fromAddress, toAddress } from "@/constants";
import { DetailedInvoiceSummary } from "@/Interfaces/Interfaces";
import { BFMPalette } from "@/Theme";
import useTranslation from "@/translations";
import { formatDate, getFirstDayOfMonth } from "@/utils";
import Image from "next/image";
import styled from "styled-components";
import Address from "../../Address/Address";
import Notes from "../../Notes/Notes";
import PaymentsTable from "../../PaymentsTable/PaymentsTable";
import InvoiceTable from "../../PreviewDetails/InvoiceTable/InvoiceTable";

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
type InvoicePDFProps = {
  invoice: DetailedInvoiceSummary;
};
export default function InvoicePDF({ invoice }: InvoicePDFProps) {
  const { t } = useTranslation();
  return (
    <Container>
      <Notes title="Invoice number" value={invoice.invoiceNumber} />
      <SubContainer>
        <Address
          title="From"
          company={fromAddress.name}
          address={fromAddress.address}
        />
        <Address
          title="To"
          company={t(`invoice_creation.dropdown.options.${invoice.address}`)}
          address={toAddress}
        />
      </SubContainer>
      <SubContainer>
        <Notes
          title="Invoice date"
          value={formatDate(getFirstDayOfMonth(invoice.dueDate))}
        />
        <Notes title="Invoice due date" value={formatDate(invoice.dueDate)} />
      </SubContainer>
      <Notes title="Invoice detail" value={invoice.invoiceDetail} />
      <InvoiceTable
        rows={invoice.items}
        invoice={invoice}
        isDownloading={true}
      />
      <TableContainer>
        <Image
          src="/images/qr-code 1.png"
          alt="QR-Code"
          width={40}
          height={40}
        />
        <PaymentsTable data={invoice.bankDetails} />
      </TableContainer>
    </Container>
  );
}
