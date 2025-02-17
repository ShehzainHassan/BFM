import { BFMPalette } from "@/Theme";
import { BodyText, H3, H3Secondary } from "@/Typography";
import { BuyerSupplierAnalysis } from "./BuyerSupplierAnalysis";

export const BuyerSupplierAnalysisStyles = {
  PREDICTED_NAME: (row: BuyerSupplierAnalysis) => (
    <BodyText color={BFMPalette.black800}>{row.predictedName}</BodyText>
  ),
  AVERAGE_TRANSACTION_AMOUNT: (row: BuyerSupplierAnalysis) => (
    <H3Secondary color={BFMPalette.purple375}>
      {row.avgTransactionAmount}
    </H3Secondary>
  ),
  DAYS_BETWEEN_TRANSACTIONS: (row: BuyerSupplierAnalysis) => (
    <BodyText color={BFMPalette.black800}>{row.daysBWTransactions}</BodyText>
  ),
  NUMBER_OF_TRANSACTIONS: (row: BuyerSupplierAnalysis) => (
    <BodyText color={BFMPalette.black800}>{row.NumberOfTransactions}</BodyText>
  ),
  TOTAL_AMOUNT: (row: BuyerSupplierAnalysis) => (
    <H3Secondary color={BFMPalette.purple375}>{row.totalAmount}</H3Secondary>
  ),
};
