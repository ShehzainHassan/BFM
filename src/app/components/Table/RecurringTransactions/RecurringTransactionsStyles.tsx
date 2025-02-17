"use client";
import { BFMPalette } from "@/Theme";
import { BodyText, H3, H4 } from "@/Typography";
import { RecurringTransaction } from "./recurringTransactions";
import styled from "styled-components";
import Image from "next/image";
import { AccountText } from "@/app/page";

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
    <H4 color={BFMPalette.black800}>{row.date}</H4>
  ),
  TRANSACTION_AMOUNT: (row: RecurringTransaction) => (
    <BodyText color={BFMPalette.black800}>{row.transactionAmount}</BodyText>
  ),
  ACCOUNT: (row: RecurringTransaction) => (
    <AccountText>
      <H4 color={BFMPalette.black800}>{row.account.type}</H4>
      <BodyText>{row.account.number}</BodyText>
    </AccountText>
  ),
  TOTAL_AMOUNT: (row: RecurringTransaction) => (
    <BodyText color={BFMPalette.purple375}>{row.totalAmount}</BodyText>
  ),
  OCCURRENCES: (row: RecurringTransaction) => (
    <H4 color={BFMPalette.black800}>{row.noOfOccurences}</H4>
  ),
};
