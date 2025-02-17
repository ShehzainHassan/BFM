import { ColumnDef } from "@tanstack/react-table";
import { Inflows } from "./inflows";
import { InflowsStyles } from "./InflowsStyles";

export const InflowsColumns: ColumnDef<Inflows>[] = [
  {
    accessorKey: "INFLOWS",
    header: "INFLOWS",
    cell: ({ row }) => InflowsStyles.INFLOWS(row.original),
  },
  {
    accessorKey: "MONTH_1",
    header: "DEC 2023",
    cell: ({ row }) => InflowsStyles.MONTH_1(row.original),
  },
  {
    accessorKey: "MONTH_2",
    header: "JAN 2024",
    cell: ({ row }) => InflowsStyles.MONTH_2(row.original),
  },
  {
    accessorKey: "MONTH_3",
    header: "FEB 2024",
    cell: ({ row }) => InflowsStyles.MONTH_3(row.original),
  },
  {
    accessorKey: "MONTH_4",
    header: "MAR 2024",
    cell: ({ row }) => InflowsStyles.MONTH_4(row.original),
  },
];
