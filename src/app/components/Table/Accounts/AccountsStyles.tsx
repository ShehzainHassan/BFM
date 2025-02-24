"use client";
import { BFMPalette } from "@/Theme";
import { BodyText, H3, H3Secondary, H4 } from "@/Typography";
import { AccountData } from "./accounts";
import styled from "styled-components";
import { CURRENCY, HKD_EQUIVALANT } from "@/constants";
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
      {formatCurrency(`${CURRENCY}${row.balance}`)}
    </BodyText>
  ),
  AMOUNT: (row: AccountData) => (
    <>
      {row.amount.currency === HKD_EQUIVALANT ? (
        <H3Secondary color={BFMPalette.purple375}>
          {formatCurrency(`${CURRENCY}${row.amount.HKDEquivalent}`)}
        </H3Secondary>
      ) : (
        <AmountText>
          <H3Secondary color={BFMPalette.purple375}>
            {formatCurrency(`${row.amount.currency}${row.amount.value}`, 2)}
          </H3Secondary>
          <H3Secondary color={BFMPalette.purple375}>
            {formatCurrency(`${CURRENCY}${row.amount.HKDEquivalent}`, 2)}
          </H3Secondary>
        </AmountText>
      )}
    </>
  ),
};
