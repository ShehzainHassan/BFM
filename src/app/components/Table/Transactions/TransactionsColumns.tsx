import useTranslation from "@/translations";
import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../../../../../Interfaces";
import TransactionActions from "./TransactionActions";
import { TransactionStyles } from "./TransactionsColumnsStyles";

export const useTransactionColumns = (): ColumnDef<Transaction>[] => {
  const { t } = useTranslation();
  return [
    {
      accessorKey: t("tables.transactions.date"),
      header: t("tables.transactions.date"),
      cell: ({ row }) => TransactionStyles.DATE(row.original),
    },
    {
      accessorKey: t("tables.transactions.descriptions"),
      header: t("tables.transactions.descriptions"),
      cell: ({ row }) => TransactionStyles.DESCRIPTION(row.original),
    },
    {
      accessorKey: t("tables.transactions.amount"),
      header: t("tables.transactions.amount"),
      cell: ({ row }) => TransactionStyles.AMOUNT(row.original),
    },
    {
      accessorKey: t("tables.transactions.bank"),
      header: t("tables.transactions.bank"),
      cell: ({ row }) => TransactionStyles.BANK(row.original),
    },
    {
      accessorKey: t("tables.transactions.account"),
      header: t("tables.transactions.account"),
      cell: ({ row }) => TransactionStyles.ACCOUNT(row.original),
    },
    {
      accessorKey: t("tables.transactions.action") || "ACTION",
      header: t("tables.transactions.action"),
      cell: ({ row }) => <TransactionActions row={row.original} />,
    },
  ];
};
