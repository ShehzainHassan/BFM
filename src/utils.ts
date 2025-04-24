import dayjs from "dayjs";
import { HKD_EQUIVALANT } from "./constants";
import {
  DetailedInvoiceSummary,
  ESGSummary,
  IncomeExpenseCategory,
  InvoiceSummary,
  MonthYearData,
  RecurringTransaction,
} from "./Interfaces/Interfaces";
import { BFMPalette } from "./Theme";

export const generateMonths = (
  reports?: ESGSummary | IncomeExpenseCategory
) => {
  if (!reports || typeof reports !== "object") return [];

  return Object.keys(reports)
    .map((key) => {
      const [year, month] = key.split("-").map(Number);
      return dayjs(`${year}-${month}`, "YYYY-M").format("MMM YYYY");
    })
    .sort((a, b) => dayjs(a, "MMM YYYY").unix() - dayjs(b, "MMM YYYY").unix());
};
export const getFileExtension = (fileName: string): string => {
  return fileName.split(".").pop()?.toUpperCase() || "";
};

export const formatNumberWithCommas = (value: number): string => {
  return value.toLocaleString();
};
export const formatCurrency = (input: string, decimals?: number): string => {
  if (!input) return "";

  const match = input.match(/^([A-Z]+)\s*(-?\d+(\.\d+)?)$/);
  if (!match) return input;

  const currency: string = match[1];
  const amount: number = parseFloat(match[2]);

  let formatOptions: Intl.NumberFormatOptions;
  if (decimals !== undefined) {
    formatOptions = {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    };
  } else {
    formatOptions =
      Number.isInteger(amount) || amount.toString().endsWith(".0")
        ? { maximumFractionDigits: 0 }
        : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
  }

  const formattedAmount = amount.toLocaleString("en-US", formatOptions);

  return amount < 0
    ? `-${currency} ${formattedAmount.replace("-", "")}`
    : `${currency} ${formattedAmount}`;
};
export const formatDate = (dateInput: string | number[]): string => {
  let date: Date;

  if (Array.isArray(dateInput)) {
    const [year, month, day] = dateInput;
    date = new Date(year, month - 1, day);
  } else {
    date = new Date(dateInput);
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const getLastInvoice = (): DetailedInvoiceSummary | null => {
  const storedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");

  if (storedInvoices.length === 0) {
    return null;
  }
  return storedInvoices[storedInvoices.length - 1];
};
export const getInvoiceFromLocalStorage = (invoiceNumber: string) => {
  const invoices = localStorage.getItem("invoices");

  if (!invoices) {
    console.error("No invoices found in localStorage.");
    return null;
  }

  try {
    const invoiceList = JSON.parse(invoices);

    const matchedInvoice = invoiceList.find(
      (invoice: DetailedInvoiceSummary) =>
        invoice.invoiceNumber === invoiceNumber
    );

    if (!matchedInvoice) {
      console.error(`Invoice with number ${invoiceNumber} not found.`);
      return null;
    }

    return matchedInvoice;
  } catch (error) {
    console.error("Error parsing invoices from localStorage:", error);
    return null;
  }
};

export const generateInvoiceNumber = () => {
  const storedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");

  let nextInvoiceNumber;
  if (storedInvoices.length === 0) {
    return "INV000-00-0001";
  } else {
    const lastInvoice = storedInvoices[storedInvoices.length - 1];
    const lastNumber = parseInt(lastInvoice.invoiceNumber.split("-").pop(), 10);
    nextInvoiceNumber = `INV000-00-${String(lastNumber + 1).padStart(4, "0")}`;
    return nextInvoiceNumber;
  }
};
export const formatYearMonth = (yearMonth: string) => {
  const date = new Date(`${yearMonth}-01`);
  return date
    .toLocaleString("en-US", { month: "short", year: "numeric" })
    .toUpperCase();
};

export const getDynamicScale = (maxValue: number) => {
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)));
  const roundedMax = Math.ceil(maxValue / magnitude) * magnitude;
  return roundedMax + 2 * magnitude;
};
export const formatLastUpdated = (timestamp: string | number[]): string => {
  let date: Date;

  if (Array.isArray(timestamp)) {
    const [year, month, day] = timestamp;
    date = new Date(Date.UTC(year, month - 1, day));
  } else {
    date = new Date(timestamp);
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `last updated: ${day} ${month} ${year}`;
};

export const sortByMonthYear = (data: MonthYearData[]): MonthYearData[] => {
  const monthMap: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  return [...data].sort((a, b) => {
    const [monthA, yearA] = a.monthYear.split(" ");
    const [monthB, yearB] = b.monthYear.split(" ");

    const dateA = new Date(2000 + parseInt(yearA), monthMap[monthA]);
    const dateB = new Date(2000 + parseInt(yearB), monthMap[monthB]);

    return dateA.getTime() - dateB.getTime();
  });
};

export const formatKeys = (key: string): string => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b[a-z]/g, (char) => char.toUpperCase());
};

export const getImagePath = (transactionType: string): string => {
  switch (transactionType) {
    case "OTHER_REVENUE":
      return "/images/OTHER_REVENUE.png";
    case "ATM_CASH_DEPOSIT":
      return "/images/ATM_CASH_DEPOSIT.png";
    case "CHARGE_OR_FEE":
      return "/images/CHARGE_OR_FEE.png";
    case "DEBIT_INTEREST_OUT":
      return "/images/DEBIT_INTEREST_OUT.png";
    case "GENERAL_PAYMENT_IN":
      return "/images/GENERAL_PAYMENT_IN.png";
    case "GENERAL_PAYMENT_OUT":
      return "/images/GENERAL_PAYMENT_OUT.png";
    case "CREDIT_INTEREST":
      return "/images/CREDIT_INTEREST.png";
    case "INTRA_COMPANY_TRANSFER_OUT":
      return "/images/INTRA_COMPANY_TRANSFER_OUT.png";
    case "INTRA_COMPANY_TRANSFER_IN":
      return "/images/INTRA_COMPANY_TRANSFER_IN.png";
    case "CHEQUE_WITHDRAWAL":
      return "/images/CHEQUE_WITHDRAWAL.png";

    default:
      return "/images/no-record.png";
  }
};

export const formatString = (
  input: string,
  upperCamelCase: boolean = false
): string => {
  const formatted = input.replace(/_/g, " ").toLowerCase();

  if (upperCamelCase) {
    return formatted.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return formatted;
};

export const convertToYYYYMM = (dateStr: string): string => {
  const monthMap: { [key: string]: string } = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const [month, year] = dateStr.split(" ");
  return `${year}-${monthMap[month]}`;
};

export const getUniqueYears = (
  esgTransactions: { month: string }[]
): number[] => {
  const years = new Set<number>();

  esgTransactions.forEach(({ month }) => {
    const year = parseInt(month.split("-")[0], 10);
    years.add(year);
  });

  return Array.from(years).sort((a, b) => a - b);
};

export const calculateAverageHKD = (
  recurring: RecurringTransaction[]
): number => {
  if (recurring.length === 0) return 0.0;

  const prices = recurring.map((transaction) =>
    parseFloat(transaction.totalAmount.replace(`${HKD_EQUIVALANT} `, ""))
  );

  const sum = prices.reduce((acc, price) => acc + price, 0);

  const avg = sum / prices.length;

  return avg;
};
export const getFirstDayOfMonth = (dateStr: string): string => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}-01`;
};

export const updateInvoiceStatus = (
  InvoiceNumber: string
): DetailedInvoiceSummary[] => {
  const invoices: DetailedInvoiceSummary[] = JSON.parse(
    localStorage.getItem("invoices") || "[]"
  );

  const updatedInvoices: DetailedInvoiceSummary[] = invoices.map((invoice) => {
    if (invoice.invoiceNumber === InvoiceNumber) {
      const today = new Date();
      const dueDate = new Date(invoice.dueDate);
      let newCategory: "PENDING" | "OVERDUE" | "PAID";
      if (invoice.category === "PAID") {
        newCategory = dueDate >= today ? "PENDING" : "OVERDUE";
      } else {
        newCategory = "PAID";
      }
      return {
        ...invoice,
        category: newCategory,
      };
    }
    return invoice;
  });

  localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  return updatedInvoices;
};

export const parseInvoices = (
  invoices: DetailedInvoiceSummary[]
): InvoiceSummary[] => {
  return invoices.map((invoice) => {
    return {
      invoiceNo: invoice.invoiceNumber || "",
      clientName: invoice.address || "",
      issueDate: invoice.invoiceDate || "",
      dueDate: invoice.dueDate || "",
      invoiceAmount: invoice.amountDue || "",
      category: invoice.category,
    };
  });
};

export const getColorByName = (name: string): string => {
  switch (name.toUpperCase()) {
    case "TRANSPORT":
      return BFMPalette.red300;
    case "ELECTRICITY":
      return BFMPalette.yellow500;
    case "FUEL":
      return BFMPalette.blue500;
    case "GAS":
      return BFMPalette.red600;
    case "LOGISTICS":
      return BFMPalette.purple600;
    default:
      return BFMPalette.purple600;
  }
};
