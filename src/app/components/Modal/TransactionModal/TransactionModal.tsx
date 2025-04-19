import { Transaction } from "../../../../../Interfaces";
import TransactionDetails from "../../TransactionDetails/TransactionDetails";
import DetailsModal from "../Modal";

type TransactionModalProps = {
  selectedTransaction: Transaction | null;
  onClose: () => void;
  marginTop?: string;
  width?: string;
  position?: "right" | "left" | "middle";
  selected?: string;
};

export default function TransactionDetailsModal({
  selectedTransaction,
  onClose,
  marginTop = "0",
  width = "600px",
  position = "right",
  selected = "Details",
}: TransactionModalProps) {
  return (
    <DetailsModal
      marginTop={marginTop}
      width={width}
      $position={position}
      headerText="Transaction Details"
      modalIsOpen={!!selectedTransaction}
      closeModal={onClose}>
      {selectedTransaction && (
        <TransactionDetails
          selected={selected}
          selectedRow={selectedTransaction}
        />
      )}
    </DetailsModal>
  );
}
