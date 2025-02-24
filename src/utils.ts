import dayjs from "dayjs";

export interface ESGSummary {
  [key: string]: {
    totalCo2Amount: number;
    totalAmount: number;
    esgTransactions: {
      yearMonth: number[];
      category: string;
      co2Amount: number;
      amount: number;
    }[];
  };
}

export const generateMonths = (esgSummary?: ESGSummary) => {
  if (!esgSummary || typeof esgSummary !== "object") return [];

  return Object.keys(esgSummary)
    .map((key) => {
      const [year, month] = key.split("-").map(Number);
      return dayjs(`${year}-${month}`, "YYYY-M").format("MMM YYYY");
    })
    .sort((a, b) => dayjs(a, "MMM YYYY").unix() - dayjs(b, "MMM YYYY").unix());
};

export const formatCurrency = (input: string, decimals?: number): string => {
  if (!input) return "";

  const match = input.match(/^([A-Z]+)\s*(-?\d+(\.\d+)?)$/);
  if (!match) return input;

  const currency: string = match[1];
  let amount: number = parseFloat(match[2]);

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

  let formattedAmount = amount.toLocaleString("en-US", formatOptions);

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

export const formatYearMonth = (yearMonth: string) => {
  const date = new Date(`${yearMonth}-01`);
  return date
    .toLocaleString("en-US", { month: "short", year: "numeric" })
    .toUpperCase();
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
