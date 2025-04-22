import { useState } from "react";
import { Transaction } from "../../../../../Interfaces";
import TransactionDetailsModal from "../../Modal/TransactionModal/TransactionModal";
import {
  ActionContainer,
  AttachmentIcon,
  DetailsIcon,
} from "./TransactionsColumnsStyles";

type TransactionActionsProps = {
  row: Transaction;
};
export default function TransactionActions({ row }: TransactionActionsProps) {
  const [selectedTab, setSelectedTab] = useState("Details");
  const [openModal, setOpenModal] = useState(false);
  const handleModal = (tab: string) => {
    setSelectedTab(tab);
    setOpenModal(true);
  };

  return (
    <ActionContainer>
      {row.attachments.length > 0 && (
        <AttachmentIcon
          src="/images/Button utility.png"
          alt="icon"
          width={32}
          height={32}
          onClick={() => handleModal("Attachments")}
        />
      )}

      <DetailsIcon
        src="/images/Button.png"
        alt="icon"
        width={32}
        height={32}
        onClick={() => handleModal("Details")}
      />
      {openModal && (
        <TransactionDetailsModal
          selected={selectedTab}
          selectedTransaction={row}
          onClose={() => setOpenModal(false)}
        />
      )}
    </ActionContainer>
  );
}
