import { BFMPalette } from "@/Theme";
import { InvoiceSummary } from "./InvoiceSummary";
import { BodyText, H5 } from "@/Typography";
import { formatDate } from "@/utils";
import {
  ActionContainer,
  AttachmentIcon,
  DetailsIcon,
} from "../Transactions/TransactionsColumnsStyles";
import styled from "styled-components";
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
  return (
    <ActionContainer>
      <AttachmentIcon
        src="/images/Download-Invoice.png"
        alt="icon"
        width={32}
        height={32}
      />

      <DetailsIcon src="/images/Button.png" alt="icon" width={32} height={32} />
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
          <H5 color={BFMPalette.red550}>{row.category}</H5>
        </StatusBadge>
      )}
    </BodyText>
  ),
  ACTIONS: (row: InvoiceSummary) => <InvoiceActions row={row} />,
};
