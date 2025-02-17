import { ColumnDef } from "@tanstack/react-table";
import { Outflows } from "./outflows";
import { OutflowsStyles } from "./OutflowsStyles";

export const OutflowsColumns: ColumnDef<Outflows>[] = [
  {
    accessorKey: "OUTFLOWS",
    header: "OUTFLOWS",
    cell: ({ row }) => OutflowsStyles.OUTFLOWS(row.original),
  },
  {
    accessorKey: "MONTH_1",
    header: "DEC 2023",
    cell: ({ row }) => OutflowsStyles.MONTH_1(row.original),
  },
  {
    accessorKey: "MONTH_2",
    header: "JAN 2024",
    cell: ({ row }) => OutflowsStyles.MONTH_2(row.original),
  },
  {
    accessorKey: "MONTH_3",
    header: "FEB 2024",
    cell: ({ row }) => OutflowsStyles.MONTH_3(row.original),
  },
  {
    accessorKey: "MONTH_4",
    header: "MAR 2024",
    cell: ({ row }) => OutflowsStyles.MONTH_4(row.original),
  },
];
