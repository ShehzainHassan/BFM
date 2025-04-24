"use client";
import { BFMPalette } from "@/Theme";
import { BodyText, H3Secondary, H5 } from "@/Typography";
import styled from "styled-components";
import { formatCurrency, formatDate, formatString } from "@/utils";
import { TransitionHighlight } from "../../../../Interfaces/Interfaces";

const ReasonContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 2px 8px;
  border: 1px solid ${BFMPalette.skin300};
`;
export const TransitionCellStyles = {
  DATE: (row: TransitionHighlight) => (
    <BodyText color={BFMPalette.black800}>{formatDate(row.date)}</BodyText>
  ),
  BANK: (row: TransitionHighlight) => (
    <BodyText color={BFMPalette.black800}>{row.bank}</BodyText>
  ),
  ACCOUNT: (row: TransitionHighlight) => (
    <BodyText color={BFMPalette.black800}>{row.account}</BodyText>
  ),
  DESCRIPTION: (row: TransitionHighlight) => (
    <BodyText color={BFMPalette.black800}>{row.description}</BodyText>
  ),
  CATEGORY: (row: TransitionHighlight) => (
    <BodyText color={BFMPalette.black800}>
      {formatString(row.category, true)}
    </BodyText>
  ),
  PAYEE_MERCHANT: (row: TransitionHighlight) => (
    <BodyText color={BFMPalette.black800}>{row.payeeORMerchant}</BodyText>
  ),
  AMOUNT: (row: TransitionHighlight) => (
    <H3Secondary color={BFMPalette.purple375}>
      {formatCurrency(row.amount, 2)}
    </H3Secondary>
  ),
  REASON: (row: TransitionHighlight) => (
    <ReasonContainer>
      <H5 color={BFMPalette.red700}>{row.reason}</H5>
    </ReasonContainer>
  ),
};
