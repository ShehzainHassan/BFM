import { ColumnDef } from "@tanstack/react-table";
import { TransitionHighlight } from "@/app/components/Table/TransitionHighlight/transitionHighlight";
import { TransitionCellStyles } from "./TransitionHighlightStyles";

export const TransitionHighlightColumns: ColumnDef<TransitionHighlight>[] = [
  {
    accessorKey: "DATE",
    header: "DATE",
    cell: ({ row }) => TransitionCellStyles.DATE(row.original),
  },
  {
    accessorKey: "BANK",
    header: "BANK",
    cell: ({ row }) => TransitionCellStyles.BANK(row.original),
  },
  {
    accessorKey: "ACCOUNT",
    header: "ACCOUNT",
    cell: ({ row }) => TransitionCellStyles.ACCOUNT(row.original),
  },
  {
    accessorKey: "DESCRIPTION",
    header: "DESCRIPTION",
    cell: ({ row }) => TransitionCellStyles.DESCRIPTION(row.original),
  },
  {
    accessorKey: "CATEGORY",
    header: "CATEGORY",
    cell: ({ row }) => TransitionCellStyles.CATEGORY(row.original),
  },
  {
    accessorKey: "PAYEE_MERCHANT",
    header: "PAYEE / MERCHANT",
    cell: ({ row }) => TransitionCellStyles.PAYEE_MERCHANT(row.original),
  },
  {
    accessorKey: "AMOUNT",
    header: "AMOUNT",
    cell: ({ row }) => TransitionCellStyles.AMOUNT(row.original),
  },
  {
    accessorKey: "REASON",
    header: "REASON",
    cell: ({ row }) => TransitionCellStyles.REASON(row.original),
  },
];
