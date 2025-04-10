import { BFMPalette } from "@/Theme";
import { BodyText, H3Secondary } from "@/Typography";
import { formatCurrency } from "@/utils";
import { BuyerSupplierAnalysis } from "../../../../../Interfaces";

export const BuyerSupplierAnalysisStyles = {
  PREDICTED_NAME: (row: BuyerSupplierAnalysis) => (
    <BodyText color={BFMPalette.black800}>{row.predictedName}</BodyText>
  ),
  AVERAGE_TRANSACTION_AMOUNT: (row: BuyerSupplierAnalysis) => (
    <H3Secondary color={BFMPalette.purple375}>
      {formatCurrency(row.avgTransactionAmount, 2)}
    </H3Secondary>
  ),
  DAYS_BETWEEN_TRANSACTIONS: (row: BuyerSupplierAnalysis) => (
    <BodyText color={BFMPalette.black800}>
      {row.daysBWTransactions} days
    </BodyText>
  ),
  NUMBER_OF_TRANSACTIONS: (row: BuyerSupplierAnalysis) => (
    <BodyText color={BFMPalette.black800}>{row.NumberOfTransactions}</BodyText>
  ),
  TOTAL_AMOUNT: (row: BuyerSupplierAnalysis) => (
    <H3Secondary color={BFMPalette.purple375}>
      {formatCurrency(row.totalAmount, 2)}
    </H3Secondary>
  ),
};
