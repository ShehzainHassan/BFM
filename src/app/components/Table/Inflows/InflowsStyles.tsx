import { BFMPalette } from "@/Theme";
import { BodyText, H3 } from "@/Typography";
import { Inflows } from "./inflows";
import { formatKeys } from "@/utils";

export const InflowsStyles = {
  INFLOWS: (row: Inflows) => (
    <BodyText color={BFMPalette.black800}>{formatKeys(row.inflows)}</BodyText>
  ),
  MONTH_1: (row: Inflows) => (
    <BodyText color={BFMPalette.purple375}>{row.month1}</BodyText>
  ),
  MONTH_2: (row: Inflows) => (
    <BodyText color={BFMPalette.black800}>{row.month2}</BodyText>
  ),
  MONTH_3: (row: Inflows) => (
    <BodyText color={BFMPalette.black800}>{row.month3}</BodyText>
  ),
  MONTH_4: (row: Inflows) => (
    <BodyText color={BFMPalette.purple375}>{row.month4}</BodyText>
  ),
};
