import { BFMPalette } from "./Theme";

export const CURRENCY = "HKD";
export const HKD_EQUIVALANT = "HKD";
export const LOCAL_STORAGE_KEY = "uploadedFiles";
export const ITEMS_PER_PAGE = 10;

export const fromAddress = {
  name: "Planto",
  address: "22/F, 3 Lockhart Road, Wan Chai, Hong Kong",
};

export const toAddress =
  "Flat A, 12/F, Block B, Mock Plaza, 88 Example Road, Central";

export const invoiceData = [
  {
    title: "Invoice Pending",
    timePeriod: "since last month",
    percentage: 8,
    value: 1300000.0,
  },
  {
    title: "Invoice Overdue",
    timePeriod: "since last month",
    percentage: 2,
    value: 240000.0,
    valueColor: BFMPalette.red500,
  },
  {
    title: "Invoice Paid",
    timePeriod: "since last month",
    percentage: 8,
    value: 0,
  },
];
