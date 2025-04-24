"use client";
import { BFMPalette } from "@/Theme";
import { BodyText, H4 } from "@/Typography";
import { formatCurrency, formatDate } from "@/utils";
import Image from "next/image";
import styled from "styled-components";
import { RecurringTransaction } from "../../../../Interfaces/Interfaces";

const DescriptionContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const RecurringTransactionStyles = {
  DESCRIPTION: (row: RecurringTransaction) => (
    <DescriptionContainer>
      <Image
        src={row.description.icon}
        alt="chevron-right"
        width={20}
        height={20}
      />
      <BodyText color={BFMPalette.black800}>{row.description.text}</BodyText>
    </DescriptionContainer>
  ),
  DATE: (row: RecurringTransaction) => (
    <H4 color={BFMPalette.black800}>{formatDate(row.date)}</H4>
  ),
  TRANSACTION_AMOUNT: (row: RecurringTransaction) => (
    <BodyText color={BFMPalette.black800}>
      {formatCurrency(row.transactionAmount, 2)}
    </BodyText>
  ),
  ACCOUNT: (row: RecurringTransaction) => (
    <H4 color={BFMPalette.black800}>{row.account}</H4>
  ),
  TOTAL_AMOUNT: (row: RecurringTransaction) => (
    <BodyText color={BFMPalette.purple375}>
      {formatCurrency(row.totalAmount, 2)}
    </BodyText>
  ),
  OCCURRENCES: (row: RecurringTransaction) => (
    <H4 color={BFMPalette.black800}>{row.noOfOccurences}</H4>
  ),
};
