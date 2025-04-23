import { Transaction } from "../../../../../Interfaces";
import {
  ActionContainer,
  AttachmentIcon,
  DetailsIcon,
} from "./TransactionsColumnsStyles";

type TransactionActionsProps = {
  row: Transaction;
  onOpenDetails: (data: Transaction) => void;
  onSelectType: (type: string) => void;
};
export default function TransactionActions({
  row,
  onOpenDetails,
  onSelectType,
}: TransactionActionsProps) {
  return (
    <ActionContainer>
      {row.attachments.length > 0 && (
        <AttachmentIcon
          src="/images/Button utility.png"
          alt="icon"
          width={32}
          height={32}
          onClick={() => {
            onOpenDetails(row);
            onSelectType("Attachment");
          }}
        />
      )}

      <DetailsIcon
        src="/images/Button.png"
        alt="icon"
        width={32}
        height={32}
        onClick={() => {
          onOpenDetails(row);
          onSelectType("Details");
        }}
      />
    </ActionContainer>
  );
}
