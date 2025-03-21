import { BFMPalette } from "@/Theme";
import { BodyText, H5 } from "@/Typography";
import {
  formatDate,
  getInvoiceFromLocalStorage,
  handleDownloadPDF,
} from "@/utils";
import {
  ActionContainer,
  AttachmentIcon,
  DetailsIcon,
} from "../Transactions/TransactionsColumnsStyles";
import styled from "styled-components";
import { InvoiceSummary } from "../../../../../Interfaces";
import DetailsModal from "../../Modal/Modal";
import { useState } from "react";
import SavedModalContent from "../../SavedModalContent/SavedModalContent";
const StatusBadge = styled.div<{ status: "PENDING" | "OVERDUE" }>`
  border-radius: 16px;
  padding: 2px 8px;
  border: 1px solid
    ${({ status }) =>
      status === "PENDING" ? BFMPalette.yellow200 : BFMPalette.skin300};
  background-color: ${({ status }) =>
    status === "PENDING" ? BFMPalette.white90 : BFMPalette.skin200};
`;
const InvoiceActions = ({ row }: { row: InvoiceSummary }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <ActionContainer>
      <AttachmentIcon
        src="/images/Download-Invoice.png"
        alt="icon"
        width={32}
        height={32}
        onClick={() => setIsModalOpen(true)}
      />

      <DetailsIcon src="/images/Button.png" alt="icon" width={32} height={32} />
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
  CATEGORY: (row: InvoiceSummary) => (
    <BodyText color={BFMPalette.black800}>
      {row.category === "OVERDUE" ? (
        <StatusBadge status="OVERDUE">
          <H5 color={BFMPalette.red700}>{row.category}</H5>
        </StatusBadge>
      ) : (
        <StatusBadge status="PENDING">
          <span>
            <H5 color={BFMPalette.red550}>{row.category}</H5>
          </span>
        </StatusBadge>
      )}
    </BodyText>
  ),
  ACTIONS: (row: InvoiceSummary) => <InvoiceActions row={row} />,
};
