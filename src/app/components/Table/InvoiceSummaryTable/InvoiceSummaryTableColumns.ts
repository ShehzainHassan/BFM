import { ColumnDef } from "@tanstack/react-table";
import { InvoiceSummary } from "../../../../../Interfaces";
import { InvoiceSummaryStyles } from "./InvoiceSummaryStyles";

export const useInvoiceSummaryColumns = (): ColumnDef<InvoiceSummary>[] => {
  return [
    {
      accessorKey: "INVOICE_NO",
      header: "INVOICE NO",
      cell: ({ row }) => InvoiceSummaryStyles.INVOICE_NO(row.original),
    },
    {
      accessorKey: "CLIENT_NAME",
      header: "CLIENT NAME",
      cell: ({ row }) => InvoiceSummaryStyles.CLIENT_NAME(row.original),
    },
    {
      accessorKey: "ISSUE_DATE",
      header: "ISSUE DATE",
      cell: ({ row }) => InvoiceSummaryStyles.ISSUE_DATE(row.original),
    },
    {
      accessorKey: "DUE_DATE",
      header: "DUE DATE",
      cell: ({ row }) => InvoiceSummaryStyles.DUE_DATE(row.original),
    },
    {
      accessorKey: "INVOICE AMOUNT",
      header: "INVOICE AMOUNT",
      cell: ({ row }) => InvoiceSummaryStyles.INVOICE_AMOUNT(row.original),
    },
    {
      accessorKey: "CATEGORY",
      header: "CATEGORY",
      cell: ({ row }) => InvoiceSummaryStyles.CATEGORY(row.original),
    },
    {
      accessorKey: "ACTION",
      header: "",
      cell: ({ row }) => InvoiceSummaryStyles.ACTIONS(row.original),
    },
  ];
};
