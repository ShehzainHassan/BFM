import { ColumnDef } from "@tanstack/react-table";
import { RecurringTransaction } from "./recurringTransactions";
import { RecurringTransactionStyles } from "./RecurringTransactionsStyles";

export const RecurringTransactionColumns: ColumnDef<RecurringTransaction>[] = [
  {
    accessorKey: "TRANSACTION_DESCRIPTION",
    header: "TRANSACTION DESCRIPTION",
    cell: ({ row }) => RecurringTransactionStyles.DESCRIPTION(row.original),
  },
  {
    accessorKey: "DATE",
    header: "TRANSACTION DATE",
    cell: ({ row }) => RecurringTransactionStyles.DATE(row.original),
  },
  {
    accessorKey: "TRANSACTION_AMOUNT",
    header: "TRANSACTION AMOUNT",
    cell: ({ row }) =>
      RecurringTransactionStyles.TRANSACTION_AMOUNT(row.original),
  },
  {
    accessorKey: "ACCOUNT",
    header: "ACCOUNT",
    cell: ({ row }) => RecurringTransactionStyles.ACCOUNT(row.original),
  },
  {
    accessorKey: "TOTAL_AMOUNT",
    header: "TOTAL AMOUNT",
    cell: ({ row }) => RecurringTransactionStyles.TOTAL_AMOUNT(row.original),
  },
  {
    accessorKey: "OCCURENCES",
    header: "# OF OCCURENCES",
    cell: ({ row }) => RecurringTransactionStyles.OCCURRENCES(row.original),
  },
];
