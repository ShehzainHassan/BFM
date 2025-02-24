import { BFMPalette } from "@/Theme";

export interface PieData {
  month: string;
  name: string;
  value: number;
}

export const PIE_COLORS = [
  BFMPalette.red600,
  BFMPalette.green500,
  BFMPalette.blue500,
  BFMPalette.purple400,
  BFMPalette.yellow500,
];
