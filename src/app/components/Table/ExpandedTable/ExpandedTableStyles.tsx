import { BFMPalette } from "@/Theme";
import { BodyText, H4 } from "@/Typography";
import { formatCurrency } from "@/utils";
import { ExpandedData } from "../../../../../Interfaces";

export const ExpandedTableStyles = {
  DESCRIPTION: (row: ExpandedData) => (
    <BodyText color={BFMPalette.black800}>{row.description}</BodyText>
  ),
  DATE: (row: ExpandedData) => <H4 color={BFMPalette.black800}>{row.date}</H4>,

  AMOUNT: (row: ExpandedData) => (
    <BodyText color={BFMPalette.purple375}>
      {formatCurrency(row.amount, 2)}
    </BodyText>
  ),
};
