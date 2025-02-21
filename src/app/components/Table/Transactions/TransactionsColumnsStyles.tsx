"use client";
import { BFMPalette } from "@/Theme";
import { BodyText, H3, H3Secondary, H4 } from "@/Typography";
import { Transaction } from "./transactions";
import styled from "styled-components";
import Image from "next/image";
import { AmountText } from "../Accounts/AccountsStyles";
import { AccountText } from "@/app/page";
import DetailsModal from "../../Modal/Modal";
import TransactionDetails from "../../TransactionDetails/TransactionDetails";
import { useEffect, useState } from "react";
import { CURRENCY, LOCAL_STORAGE_KEY } from "@/constants";
import { formatCurrency, formatDate } from "@/utils";

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
const ActionContainer = styled.div`
  display: flex;
  gap: 8px;
`;
const TransactionActions = ({ row }: { row: Transaction }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState("Details");
  const [hasAttachments, setHasAttachments] = useState(false);

  const checkAttachments = () => {
    const storedFiles = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
    );
    setHasAttachments(!!storedFiles[row.id]?.files?.length);
  };

  useEffect(() => {
    checkAttachments();
    const handleStorageChange = () => {
      checkAttachments();
    };

    document.addEventListener("localStorageUpdate", handleStorageChange);

    return () => {
      document.removeEventListener("localStorageUpdate", handleStorageChange);
    };
  }, [row.id]);

  const handleOpenModal = (type: string) => {
    setSelected(type);
    setOpenModal(true);
  };
  return (
    <ActionContainer>
      {hasAttachments && (
        <Image
          src="/images/Button utility.png"
          alt="icon"
          width={32}
          height={32}
          style={{ cursor: "pointer" }}
          onClick={() => handleOpenModal("Attachments")}
        />
      )}
      <Image
        src="/images/Button.png"
        alt="icon"
        width={32}
        height={32}
        style={{ cursor: "pointer" }}
        onClick={() => handleOpenModal("Details")}
      />
      <DetailsModal
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
        {formatCurrency(`${row.amount.currency}${row.amount.value}`)}
      </H3Secondary>
      <H3Secondary color={BFMPalette.purple375}>
        {formatCurrency(`${row.amount.currency}${row.amount.HKDEquivalent}`, 2)}
      </H3Secondary>
    </AmountText>
  ),
  BANK: (row: Transaction) => (
    <BodyText color={BFMPalette.black800}>{row.bank}</BodyText>
  ),
  ACCOUNT: (row: Transaction) => (
    <H4 color={BFMPalette.black800}>{row.account}</H4>
  ),
  ACTION: (row: Transaction) => <TransactionActions row={row} />,
};
