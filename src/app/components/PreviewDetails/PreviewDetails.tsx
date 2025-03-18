import { BFMPalette } from "@/Theme";
import styled from "styled-components";
import Notes from "../Notes/Notes";
import Address from "../Address/Address";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "../Table/Table";
import { bankDetails, fromAddress, invoiceData } from "@/constants";
import InfoTable from "../InfoTable/InfoTable";
import InvoiceTable from "../InvoiceTable/InvoiceTable";
import { useData } from "@/DataContext";
import { formatDate } from "@/utils";
import useTranslation from "@/translations";

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
  const { companyAddress, items, invoiceDetails, dueDate } = useData();

  return (
    <Container>
      <Notes title="Invoice number" value="INV000-00-0001" />
      <SubContainer>
        <Address
          title="From"
          company={fromAddress.name}
          address={fromAddress.address}
        />
        <Address
          title="To"
          company={t(`invoice_creation.dropdown.options.${companyAddress}`)}
          address="Flat A, 12/F, Block B, Mock Plaza, 88 Example Road, Central"
        />
      </SubContainer>
      <SubContainer>
        <Notes title="Invoice date" value="01 October 2024" />
        {dueDate && (
          <Notes title="Invoice due date" value={formatDate(dueDate)} />
        )}
      </SubContainer>
      {invoiceDetails && (
        <Notes title="Invoice detail" value={invoiceDetails} />
      )}
      <InvoiceTable rows={items} />
      <TableContainer>
        <Image
          src="/images/qr-code 1.png"
          alt="QR-Code"
          width={56}
          height={56}
        />
        <InfoTable data={bankDetails} />
      </TableContainer>
    </Container>
  );
}
