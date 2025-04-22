import { ColumnDef } from "@tanstack/react-table";
import { AccountsStyles } from "./AccountsStyles";
import useTranslation from "@/translations";
import { AccountData } from "../../../../../Interfaces";
export const useAccountsColumns = (): ColumnDef<AccountData>[] => {
  const { t } = useTranslation();
  return [
    {
      accessorKey: t("tables.accounts.bank"),
      header: t("tables.accounts.bank"),
      cell: ({ row }) => AccountsStyles.BANK(row.original),
    },
    {
      accessorKey: t("tables.accounts.account_name"),
      header: t("tables.accounts.account_name"),
      cell: ({ row }) => AccountsStyles.ACCOUNT(row.original),
    },
    {
      accessorKey: t("tables.accounts.account_type"),
      header: t("tables.accounts.account_type"),
      cell: ({ row }) => AccountsStyles.ACCOUNT_TYPE(row.original),
    },
    {
      accessorKey: t("tables.accounts.balance"),
      header: t("tables.accounts.balance"),
      cell: ({ row }) => AccountsStyles.BALANCE(row.original),
    },
    {
      accessorKey: t("tables.accounts.amount"),
      header: t("tables.accounts.amount"),
      cell: ({ row }) => AccountsStyles.AMOUNT(row.original),
    },
  ];
};
