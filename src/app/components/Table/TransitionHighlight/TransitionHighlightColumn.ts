import { ColumnDef } from "@tanstack/react-table";
import { TransitionHighlight } from "@/app/components/Table/TransitionHighlight/transitionHighlight";
import { TransitionCellStyles } from "./TransitionHighlightStyles";
import useTranslation from "@/translations";

export const useTransitionHighlightColumns =
  (): ColumnDef<TransitionHighlight>[] => {
    const { t } = useTranslation();
    return [
      {
        accessorKey: t("tables.transition_highlight.date"),
        header: t("tables.transition_highlight.date"),
        cell: ({ row }) => TransitionCellStyles.DATE(row.original),
      },
      {
        accessorKey: t("tables.transition_highlight.bank"),
        header: t("tables.transition_highlight.bank"),
        cell: ({ row }) => TransitionCellStyles.BANK(row.original),
      },
      {
        accessorKey: t("tables.transition_highlight.account"),
        header: t("tables.transition_highlight.account"),
        cell: ({ row }) => TransitionCellStyles.ACCOUNT(row.original),
      },
      {
        accessorKey: t("tables.transition_highlight.description"),
        header: t("tables.transition_highlight.description"),
        cell: ({ row }) => TransitionCellStyles.DESCRIPTION(row.original),
      },
      {
        accessorKey: t("tables.transition_highlight.category"),
        header: t("tables.transition_highlight.category"),
        cell: ({ row }) => TransitionCellStyles.CATEGORY(row.original),
      },
      {
        accessorKey: t("tables.transition_highlight.payee_merchant"),
        header: t("tables.transition_highlight.payee_merchant"),
        cell: ({ row }) => TransitionCellStyles.PAYEE_MERCHANT(row.original),
      },
      {
        accessorKey: t("tables.transition_highlight.amount"),
        header: t("tables.transition_highlight.amount"),
        cell: ({ row }) => TransitionCellStyles.AMOUNT(row.original),
      },
      {
        accessorKey: t("tables.transition_highlight.reason"),
        header: t("tables.transition_highlight.reason"),
        cell: ({ row }) => TransitionCellStyles.REASON(row.original),
      },
    ];
  };
