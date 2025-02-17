import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "./transactions";
import { TransactionStyles } from "./TransactionsColumnsStyles";

export const TransactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "DATE",
    header: "DATE",
    cell: ({ row }) => TransactionStyles.DATE(row.original),
  },
  {
    accessorKey: "DESCRIPTIONS",
    header: "DESCRIPTIONS",
    cell: ({ row }) => TransactionStyles.DESCRIPTION(row.original),
  },
  {
    accessorKey: "AMOUNT / HKD EQV",
    header: "AMOUNT / HKD EQV",
    cell: ({ row }) => TransactionStyles.AMOUNT(row.original),
  },
  {
    accessorKey: "BANK",
    header: "BANK",
    cell: ({ row }) => TransactionStyles.BANK(row.original),
  },
  {
    accessorKey: "ACCOUNT",
    header: "ACCOUNT",
    cell: ({ row }) => TransactionStyles.ACCOUNT(row.original),
  },
  {
    accessorKey: "ACTION",
    header: "ACTION",
    cell: ({ row }) => TransactionStyles.ACTION(row.original),
  },
];
