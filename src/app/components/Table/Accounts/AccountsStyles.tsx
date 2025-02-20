"use client";
import { BFMPalette } from "@/Theme";
import { BodyText, H3, H3Secondary, H4 } from "@/Typography";
import { AccountData } from "./accounts";
import styled from "styled-components";
import { CURRENCY } from "@/constants";
import { formatCurrency } from "@/utils";

export const AmountText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const AccountsStyles = {
  BANK: (row: AccountData) => (
    <BodyText color={BFMPalette.black800}>{row.bank}</BodyText>
  ),
  ACCOUNT: (row: AccountData) => (
    <H4 color={BFMPalette.black800}>{row.account}</H4>
  ),
  ACCOUNT_TYPE: (row: AccountData) => (
    <BodyText color={BFMPalette.black800}>{row.accountType}</BodyText>
  ),
  BALANCE: (row: AccountData) => (
    <BodyText color={BFMPalette.black800}>
      {CURRENCY} {formatCurrency(row.balance)}
    </BodyText>
  ),
  AMOUNT: (row: AccountData) => (
    <AmountText>
      <H3Secondary color={BFMPalette.purple375}>
        {row.amount.currency} {formatCurrency(row.amount.value)}
      </H3Secondary>
      <H3Secondary color={BFMPalette.purple375}>
        {CURRENCY} {formatCurrency(row.amount.HKDEquivalent)}
      </H3Secondary>
    </AmountText>
  ),
};
