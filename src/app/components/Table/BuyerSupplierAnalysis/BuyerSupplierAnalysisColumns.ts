import { ColumnDef } from "@tanstack/react-table";
import { BuyerSupplierAnalysisStyles } from "./BuyerSupplierAnalysisStyles";
import useTranslation from "@/translations";
import { BuyerSupplierAnalysis } from "../../../../Interfaces/Interfaces";

export const useBuyerSupplierAnalysisColumns =
  (): ColumnDef<BuyerSupplierAnalysis>[] => {
    const { t } = useTranslation();
    return [
      {
        accessorKey: t("tables.buyer_supplier_analysis.predicted_name"),
        header: t("tables.buyer_supplier_analysis.predicted_name"),
        cell: ({ row }) =>
          BuyerSupplierAnalysisStyles.PREDICTED_NAME(row.original),
      },
      {
        accessorKey: t(
          "tables.buyer_supplier_analysis.average_transaction_amount"
        ),
        header: t("tables.buyer_supplier_analysis.average_transaction_amount"),
        cell: ({ row }) =>
          BuyerSupplierAnalysisStyles.AVERAGE_TRANSACTION_AMOUNT(row.original),
      },
      {
        accessorKey: t(
          "tables.buyer_supplier_analysis.days_between_transactions"
        ),
        header: t("tables.buyer_supplier_analysis.days_between_transactions"),
        cell: ({ row }) =>
          BuyerSupplierAnalysisStyles.DAYS_BETWEEN_TRANSACTIONS(row.original),
      },
      {
        accessorKey: t("tables.buyer_supplier_analysis.number_of_transactions"),
        header: t("tables.buyer_supplier_analysis.number_of_transactions"),
        cell: ({ row }) =>
          BuyerSupplierAnalysisStyles.NUMBER_OF_TRANSACTIONS(row.original),
      },
      {
        accessorKey: t("tables.buyer_supplier_analysis.total_amount"),
        header: t("tables.buyer_supplier_analysis.total_amount"),
        cell: ({ row }) =>
          BuyerSupplierAnalysisStyles.TOTAL_AMOUNT(row.original),
      },
    ];
  };
