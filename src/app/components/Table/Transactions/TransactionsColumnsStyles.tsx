"use client";
import { BFMPalette } from "@/Theme";
import { BodyText, H3, H3Secondary, H4 } from "@/Typography";
import { Transaction } from "./transactions";
import styled from "styled-components";
import Image from "next/image";
import { AmountText } from "../Accounts/AccountsStyles";
import { AccountText } from "@/app/page";

const ImageContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 200px;
  background-color: ${BFMPalette.purple100};
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DescriptionText = styled.div`
  display: flex;
  flex-direction: column;
`;
export const TransactionStyles = {
  DATE: (row: Transaction) => (
    <BodyText color={BFMPalette.black800}>{row.date}</BodyText>
  ),
  DESCRIPTION: (row: Transaction) => (
    <DescriptionWrapper>
      <ImageContainer>
        <Image src={row.description.imgSrc} alt="icon" width={20} height={20} />
      </ImageContainer>
      <DescriptionText>
        <H4 color={BFMPalette.black800}>{row.description.title}</H4>
        <BodyText>{row.description.subtitle}</BodyText>
      </DescriptionText>
    </DescriptionWrapper>
  ),
  AMOUNT: (row: Transaction) => (
    <AmountText>
      <H3Secondary color={BFMPalette.purple375}>
        {row.amount.currency} {row.amount.value}
      </H3Secondary>
      <H3Secondary color={BFMPalette.purple375}>
        HKD {row.amount.HKDEquivalent}
      </H3Secondary>
    </AmountText>
  ),
  BANK: (row: Transaction) => (
    <BodyText color={BFMPalette.black800}>{row.bank}</BodyText>
  ),
  ACCOUNT: (row: Transaction) => (
    <AccountText>
      <H4 color={BFMPalette.black800}>{row.account.type}</H4>
      <BodyText>{row.account.number}</BodyText>
    </AccountText>
  ),
  ACTION: (row: Transaction) => (
    <Image
      src="/images/Button utility.png"
      alt="icon"
      width={32}
      height={32}
      style={{ cursor: "pointer" }}
    />
  ),
};
