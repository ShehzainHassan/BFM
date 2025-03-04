import { BFMPalette } from "@/Theme";
import { BodyText, H4, MediumBoldHeading } from "@/Typography";
import { Inflows } from "./inflows";
import { formatCurrency, formatKeys } from "@/utils";
import { HKD_EQUIVALANT } from "@/constants";

const getTextColor = (value: string, row: Inflows) => {
  if (value.startsWith("-") && value !== "-") return BFMPalette.red600;
  if (row.inflows === "totalRevenue" || row.inflows === "revenueGrowth")
    return BFMPalette.purple900;
  if (
    Number(row.month1) === 0 ||
    Number(row.month2) === 0 ||
    Number(row.month3) === 0 ||
    Number(row.month4) === 0
  )
    return BFMPalette.gray200;
  return BFMPalette.black800;
};

const renderValue = (value: string, row: Inflows) => {
  const color = getTextColor(value, row);
  const formattedValue =
    row.inflows === "revenueGrowth" && value !== "-" ? `${value}%` : value;
  const isRevenueGrowth = row.inflows === "revenueGrowth";
  if (row.inflows === "totalRevenue") {
    return (
      <MediumBoldHeading color={color}>
        {formatCurrency(`${HKD_EQUIVALANT}${formattedValue}`, 2)}
      </MediumBoldHeading>
    );
  }

  if (isRevenueGrowth) {
    return (
      <MediumBoldHeading color={color}>{formattedValue}</MediumBoldHeading>
    );
  }

  return (
    <H4 color={color}>
      {formatCurrency(`${HKD_EQUIVALANT}${formattedValue}`, 2)}
    </H4>
  );
};

export const InflowsStyles = {
  INFLOWS: (row: Inflows) =>
    row.inflows === "totalRevenue" || row.inflows === "revenueGrowth" ? (
      <MediumBoldHeading color={BFMPalette.purple900}>
        {formatKeys(row.inflows)}
      </MediumBoldHeading>
    ) : (
      <BodyText color={BFMPalette.black800}>{formatKeys(row.inflows)}</BodyText>
    ),

  MONTH_1: (row: Inflows) => renderValue(row.month1, row),
  MONTH_2: (row: Inflows) => renderValue(row.month2, row),
  MONTH_3: (row: Inflows) => renderValue(row.month3, row),
  MONTH_4: (row: Inflows) => renderValue(row.month4, row),
};
