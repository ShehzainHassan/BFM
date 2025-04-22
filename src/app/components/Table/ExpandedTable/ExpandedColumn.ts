import { ColumnDef } from "@tanstack/react-table";
import { ExpandedTableStyles } from "./ExpandedTableStyles";
import { ExpandedData } from "../../../../../Interfaces";

export const ExpandedColumns: ColumnDef<ExpandedData>[] = [
  {
    accessorKey: "DATE",
    header: "DATE",
    cell: ({ row }) => ExpandedTableStyles.DATE(row.original),
  },
  {
    accessorKey: "DESCRIPTION",
    header: "DESCRIPTION",
    cell: ({ row }) => ExpandedTableStyles.DESCRIPTION(row.original),
  },
  {
    accessorKey: "AMOUNT",
    header: "AMOUNT",
    cell: ({ row }) => ExpandedTableStyles.AMOUNT(row.original),
  },
];
