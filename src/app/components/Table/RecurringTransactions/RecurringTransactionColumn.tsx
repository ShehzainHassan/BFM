import { ColumnDef } from "@tanstack/react-table";
import { RecurringTransaction } from "./recurringTransactions";
import { RecurringTransactionStyles } from "./RecurringTransactionsStyles";
import useTranslation from "@/translations";

export const useRecurringTransactionColumns =
  (): ColumnDef<RecurringTransaction>[] => {
    const { t } = useTranslation();
    return [
      {
        accessorKey: t("tables.recurring_transactions.description"),
        header: t("tables.recurring_transactions.description"),
        cell: ({ row }) => RecurringTransactionStyles.DESCRIPTION(row.original),
      },
      {
        accessorKey: t("tables.recurring_transactions.date"),
        header: t("tables.recurring_transactions.date"),
        cell: ({ row }) => RecurringTransactionStyles.DATE(row.original),
      },
      {
        accessorKey: t("tables.recurring_transactions.amount"),
        header: t("tables.recurring_transactions.amount"),
        cell: ({ row }) =>
          RecurringTransactionStyles.TRANSACTION_AMOUNT(row.original),
      },
      {
        accessorKey: t("tables.recurring_transactions.account"),
        header: t("tables.recurring_transactions.account"),
        cell: ({ row }) => RecurringTransactionStyles.ACCOUNT(row.original),
      },
      {
        accessorKey: t("tables.recurring_transactions.total_amount"),
        header: t("tables.recurring_transactions.total_amount"),
        cell: ({ row }) =>
          RecurringTransactionStyles.TOTAL_AMOUNT(row.original),
      },
      {
        accessorKey: t("tables.recurring_transactions.occurences"),
        header: t("tables.recurring_transactions.occurences"),
        cell: ({ row }) => RecurringTransactionStyles.OCCURRENCES(row.original),
      },
    ];
  };
