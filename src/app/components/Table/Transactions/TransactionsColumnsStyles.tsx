"use client";
import { HKD_EQUIVALANT } from "@/constants";
import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import { BodyText, H3Secondary, H4 } from "@/Typography";
import { formatCurrency, formatDate, formatString } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Transaction } from "../../../../../Interfaces";
import TransactionDetailsModal from "../../Modal/TransactionModal/TransactionModal";
import { AmountText } from "../Accounts/AccountsStyles";

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DescriptionText = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 72px;
`;

export const AttachmentIcon = styled(Image)`
  position: absolute;
  left: 0;
  cursor: pointer;
`;

export const DetailsIcon = styled(Image)`
  position: absolute;
  right: 0;
  cursor: pointer;
`;
const TransactionActions = ({ row }: { row: Transaction }) => {
  const [selected, setSelected] = useState("Details");
  const [hasAttachments, setHasAttachments] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const { attachments } = useData();
  useEffect(() => {
    const checkAttachments = () => {
      setHasAttachments(
        attachments.some((attachment) => attachment.txnId === row.id)
      );
    };

    checkAttachments();
  }, [row.id]);
  const handleOpenModal = (type: string) => {
    setSelected(type);
    setSelectedTransaction(row);
  };

  return (
    <ActionContainer>
      {hasAttachments && (
        <AttachmentIcon
          src="/images/Button utility.png"
          alt="icon"
          width={32}
          height={32}
          onClick={() => handleOpenModal("Attachments")}
        />
      )}

      <DetailsIcon
        src="/images/Button.png"
        alt="icon"
        width={32}
        height={32}
        onClick={() => handleOpenModal("Details")}
      />
      <TransactionDetailsModal
        selected={selected}
        selectedTransaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </ActionContainer>
  );
};
export const TransactionStyles = {
  DATE: (row: Transaction) => (
    <BodyText color={BFMPalette.black800}>{formatDate(row.date)}</BodyText>
  ),
  DESCRIPTION: (row: Transaction) => (
    <DescriptionWrapper>
      <Image src={row.description.imgSrc} alt="icon" width={40} height={40} />
      <DescriptionText>
        <H4 color={BFMPalette.black800}>{row.description.title}</H4>
        <BodyText>{formatString(row.description.subtitle, true)}</BodyText>
      </DescriptionText>
    </DescriptionWrapper>
  ),
  AMOUNT: (row: Transaction) => (
    <>
      {row.amount.currency === HKD_EQUIVALANT ? (
        <H3Secondary color={BFMPalette.purple375}>
          {formatCurrency(`${HKD_EQUIVALANT}${row.amount.HKDEquivalent}`, 2)}
        </H3Secondary>
      ) : (
        <AmountText>
          <H3Secondary color={BFMPalette.purple375}>
            {formatCurrency(`${row.amount.currency}${row.amount.value}`)}
          </H3Secondary>
          <H3Secondary color={BFMPalette.purple375}>
            {formatCurrency(`${HKD_EQUIVALANT}${row.amount.HKDEquivalent}`, 2)}
          </H3Secondary>
        </AmountText>
      )}
    </>
  ),
  BANK: (row: Transaction) => (
    <BodyText color={BFMPalette.black800}>{row.bank}</BodyText>
  ),
  ACCOUNT: (row: Transaction) => (
    <H4 color={BFMPalette.black800}>{row.account}</H4>
  ),
  ACTION: (row: Transaction) => <TransactionActions row={row} />,
};
