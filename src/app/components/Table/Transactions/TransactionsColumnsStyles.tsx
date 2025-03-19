"use client";
import { HKD_EQUIVALANT, LOCAL_STORAGE_KEY } from "@/constants";
import { BFMPalette } from "@/Theme";
import { BodyText, H3Secondary, H4 } from "@/Typography";
import { formatCurrency, formatDate, formatString } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import DetailsModal from "../../Modal/Modal";
import TransactionDetails from "../../TransactionDetails/TransactionDetails";
import { AmountText } from "../Accounts/AccountsStyles";
import { Transaction } from "./transactions";
import axios from "axios";

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DescriptionText = styled.div`
  display: flex;
  flex-direction: column;
`;
const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 72px;
`;

const AttachmentIcon = styled(Image)`
  position: absolute;
  left: 0;
  cursor: pointer;
`;

const DetailsIcon = styled(Image)`
  position: absolute;
  right: 0;
  cursor: pointer;
`;
const TransactionActions = ({ row }: { row: Transaction }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState("Details");
  const [hasAttachments, setHasAttachments] = useState(false);
  const checkAttachments = async () => {
    const response = await axios.get(
      `https://c167-59-103-34-73.ngrok-free.app/v1/businessFinancialManagement/attachments/${row.id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );
    if (response.data.data.length > 0) {
      setHasAttachments(true);
    } else {
      setHasAttachments(false);
    }
  };

  useEffect(() => {
    checkAttachments();
  }, [row]);

  const handleOpenModal = (type: string) => {
    setSelected(type);
    setOpenModal(true);
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

      <DetailsModal
        position="right"
        headerText="Transaction Details"
        modalIsOpen={openModal}
        closeModal={() => setOpenModal(false)}>
        <TransactionDetails selected={selected} selectedRow={row} />
      </DetailsModal>
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
