import { ColumnDef } from "@tanstack/react-table";
import { AccountData } from "./accounts";
import { AccountsStyles } from "./AccountsStyles";

export const AccountsColumns: ColumnDef<AccountData>[] = [
  {
    accessorKey: "BANK",
    header: "BANK",
    cell: ({ row }) => AccountsStyles.BANK(row.original),
  },
  {
    accessorKey: "ACCOUNT",
    header: "ACCOUNT NAME",
    cell: ({ row }) => AccountsStyles.ACCOUNT(row.original),
  },
  {
    accessorKey: "ACCOUNT TYPE",
    header: "ACCOUNT TYPE",
    cell: ({ row }) => AccountsStyles.ACCOUNT_TYPE(row.original),
  },
  {
    accessorKey: "BALANCE",
    header: "BALANCE",
    cell: ({ row }) => AccountsStyles.BALANCE(row.original),
  },
  {
    accessorKey: "AMOUNT",
    header: "AMOUNT / HKD EQV",
    cell: ({ row }) => AccountsStyles.AMOUNT(row.original),
  },
];
