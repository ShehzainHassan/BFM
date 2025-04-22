import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import { BodyText, H5 } from "@/Typography";
import { formatDate, parseInvoices, updateInvoiceStatus } from "@/utils";
import { useState } from "react";
import styled from "styled-components";
import { InvoiceSummary } from "../../../../../Interfaces";
import DetailsModal from "../../Modal/Modal";
import SavedModalContent from "../../SavedModalContent/SavedModalContent";
import {
  ActionContainer,
  AttachmentIcon,
  DetailsIcon,
} from "../Transactions/TransactionsColumnsStyles";
const backgroundColor = {
  PENDING: BFMPalette.white90,
  OVERDUE: BFMPalette.skin200,
  PAID: BFMPalette.green0,
};

const borderColor = {
  PENDING: BFMPalette.yellow200,
  OVERDUE: BFMPalette.skin300,
  PAID: BFMPalette.green600,
};
const StatusBadge = styled.div<{ $status: "PENDING" | "OVERDUE" | "PAID" }>`
  border-radius: 16px;
  padding: 2px 8px;
  border: 1px solid ${({ $status }) => borderColor[$status]};
  background-color: ${({ $status }) => backgroundColor[$status]};
`;
const InvoiceActions = ({ row }: { row: InvoiceSummary }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setInvoicesSummary } = useData();
  const toggleInvoiceCategory = () => {
    const updatedInvoices = updateInvoiceStatus(row.invoiceNo);
    setInvoicesSummary(parseInvoices(updatedInvoices));
  };
  return (
    <ActionContainer>
      <AttachmentIcon
        src="/images/Download-Invoice.png"
        alt="icon"
        width={32}
        height={32}
        onClick={() => setIsModalOpen(true)}
      />

      <DetailsIcon
        src="/images/Button.png"
        alt="icon"
        width={32}
        height={32}
        onClick={() => toggleInvoiceCategory()}
      />
      {isModalOpen && (
        <DetailsModal
          headerText=""
          width="400px"
          height="375px"
          modalIsOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}>
          <SavedModalContent invoiceNo={row.invoiceNo} />
        </DetailsModal>
      )}
    </ActionContainer>
  );
};
export const InvoiceSummaryStyles = {
  INVOICE_NO: (row: InvoiceSummary) => (
    <BodyText color={BFMPalette.black800}>{row.invoiceNo}</BodyText>
  ),
  CLIENT_NAME: (row: InvoiceSummary) => (
    <BodyText color={BFMPalette.black800}>{row.clientName}</BodyText>
  ),
  ISSUE_DATE: (row: InvoiceSummary) => (
    <BodyText color={BFMPalette.black800}>{row.issueDate}</BodyText>
  ),
  DUE_DATE: (row: InvoiceSummary) => (
    <BodyText color={BFMPalette.black800}>{formatDate(row.dueDate)}</BodyText>
  ),
  INVOICE_AMOUNT: (row: InvoiceSummary) => (
    <BodyText color={BFMPalette.black800}>{row.invoiceAmount}</BodyText>
  ),
  CATEGORY: (row: InvoiceSummary) => {
    let badgeColor;
    let $status: "OVERDUE" | "PENDING" | "PAID";

    if (row.category === "OVERDUE") {
      badgeColor = BFMPalette.red700;
      $status = "OVERDUE";
    } else if (row.category === "PENDING") {
      badgeColor = BFMPalette.red550;
      $status = "PENDING";
    } else {
      badgeColor = BFMPalette.green800;
      $status = "PAID";
    }

    return (
      <BodyText color={BFMPalette.black800}>
        <StatusBadge $status={$status}>
          <H5 color={badgeColor}>{row.category}</H5>
        </StatusBadge>
      </BodyText>
    );
  },

  ACTIONS: (row: InvoiceSummary) => <InvoiceActions row={row} />,
};
