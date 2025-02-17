import { ColumnDef } from "@tanstack/react-table";
import { BuyerSupplierAnalysis } from "./BuyerSupplierAnalysis";
import { BuyerSupplierAnalysisStyles } from "./BuyerSupplierAnalysisStyles";

export const BuyerSupplierAnalysisColumns: ColumnDef<BuyerSupplierAnalysis>[] =
  [
    {
      accessorKey: "PREDICTED_NAME",
      header: "PREDICTED_NAME",
      cell: ({ row }) =>
        BuyerSupplierAnalysisStyles.PREDICTED_NAME(row.original),
    },
    {
      accessorKey: "AVG_TRANSACTION_AMOUNT",
      header: "AVERAGE TRANSACTION AMOUNT",
      cell: ({ row }) =>
        BuyerSupplierAnalysisStyles.AVERAGE_TRANSACTION_AMOUNT(row.original),
    },
    {
      accessorKey: "DAYS B/W TRANSACTIONS",
      header: "DAYS B/W TRANSACTIONS",
      cell: ({ row }) =>
        BuyerSupplierAnalysisStyles.DAYS_BETWEEN_TRANSACTIONS(row.original),
    },
    {
      accessorKey: "NO OF TRANSACTIONS",
      header: "NO.OF TRANSACTIONS",
      cell: ({ row }) =>
        BuyerSupplierAnalysisStyles.NUMBER_OF_TRANSACTIONS(row.original),
    },
    {
      accessorKey: "TOTAL AMOUNT",
      header: "TOTAL AMOUNT",
      cell: ({ row }) => BuyerSupplierAnalysisStyles.TOTAL_AMOUNT(row.original),
    },
  ];
