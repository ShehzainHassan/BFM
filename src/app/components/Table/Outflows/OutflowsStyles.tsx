import { BFMPalette } from "@/Theme";
import { BodyText, H3 } from "@/Typography";
import { Outflows } from "./outflows";
import { formatKeys } from "@/utils";

export const OutflowsStyles = {
  OUTFLOWS: (row: Outflows) => (
    <BodyText color={BFMPalette.black800}>{formatKeys(row.outflows)}</BodyText>
  ),
  MONTH_1: (row: Outflows) => (
    <BodyText color={BFMPalette.purple375}>{row.month1}</BodyText>
  ),
  MONTH_2: (row: Outflows) => (
    <BodyText color={BFMPalette.black800}>{row.month2}</BodyText>
  ),
  MONTH_3: (row: Outflows) => (
    <BodyText color={BFMPalette.black800}>{row.month3}</BodyText>
  ),
  MONTH_4: (row: Outflows) => (
    <BodyText color={BFMPalette.purple375}>{row.month4}</BodyText>
  ),
};
