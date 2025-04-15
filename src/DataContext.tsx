"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import {
  AccountData,
  AreaChartData,
  BankDetails,
  BarData,
  BuyerSupplierAnalysis,
  CashFlowData,
  DataContextType,
  Inflows,
  InvoiceSummary,
  Item,
  LineChartData,
  Outflows,
  ParsedAccount,
  ParsedDeposit,
  ParsedRecurringTransaction,
  ParsedTransaction,
  ParsedTransitionHighlight,
  PieData,
  RecurringTransaction,
  Transaction,
  TransitionHighlight,
} from "../Interfaces";
import { CURRENCY } from "./constants";
import { MOCK_DATA } from "./mockdata";
import useTranslation from "./translations";
import {
  formatDate,
  formatString,
  formatYearMonth,
  getImagePath,
  parseInvoices,
} from "./utils";

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { rawData, reports, metrics, notifications } = MOCK_DATA.data;
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(t("navbar.tabs.dashboard"));
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceSubject, setInvoiceSubject] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [discount, setDiscount] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [subTotal, setSubTotal] = useState("");
  const [finalTotal, setFinalTotal] = useState("");
  const [hasPaymentChecked, setHasPaymentChecked] = useState(false);
  const transformClientName = (clientName: string): string => {
    return t(`invoice_creation.dropdown.options.${clientName}`) || "";
  };

  const [invoicesSummary, setInvoicesSummary] = useState<InvoiceSummary[]>(() =>
    parseInvoices(JSON.parse(localStorage.getItem("invoices") || "[]")).map(
      (invoice) => ({
        ...invoice,
        clientName: transformClientName(invoice.clientName),
      })
    )
  );

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: "",
    name: "",
    accountNumber: "",
    SWIFTCode: "",
    bankAddress: "",
  });
  const [items, setItems] = useState([
    {
      id: Date.now(),
      description: "Enter item description",
      qty: 1,
      price: 0,
      currency: currency,
    },
  ]);
  const transformTransactions = (
    parsedTransaction: ParsedTransaction[]
  ): Transaction[] => {
    return parsedTransaction.map((transaction) => ({
      id: transaction.transactionId,
      date: transaction.transactionDate,
      description: {
        imgSrc: getImagePath(transaction.category),
        title: transaction.description,
        subtitle: transaction.category,
      },
      amount: {
        currency: transaction.currency,
        value: transaction.localCurrencyBalance,
        HKDEquivalent: transaction.balance,
      },
      bank: transaction.bank,
      account: transaction.accountName,
    }));
  };
  const transformAccounts = (
    parsedAccounts: ParsedAccount[]
  ): AccountData[] => {
    return parsedAccounts.map((account) => ({
      bank: account.bank,
      account: account.accountName,
      accountType: account.accountType,
      balance: account.balance,
      amount: {
        currency: account.currency,
        value: account.localCurrencyBalance,
        HKDEquivalent: account.balance,
      },
    }));
  };

  const transformDeposits = (
    parsedDeposits: ParsedDeposit[]
  ): BuyerSupplierAnalysis[] => {
    return parsedDeposits.map((deposit) => ({
      predictedName: deposit.predictedName,
      avgTransactionAmount: `${CURRENCY} ${deposit.averageAmount}`,
      daysBWTransactions: deposit.daysBetweenTransactions.toFixed(2),
      NumberOfTransactions: deposit.txnCounts,
      totalAmount: `${CURRENCY} ${deposit.totalAmount}`,
    }));
  };
  const transformHighlights = (
    parsedHighlights: ParsedTransitionHighlight[]
  ): TransitionHighlight[] => {
    return parsedHighlights.map((highlight) => ({
      date: highlight.transactionDate,
      bank: highlight.bank,
      account: highlight.accountName,
      description: highlight.description,
      category: highlight.category,
      payeeORMerchant: highlight.merchant,
      amount: `${highlight.currency} ${highlight.amount}`,
      reason: `${highlight.reason.value}x ${formatString(
        highlight.reason.type
      )}`,
    }));
  };
  const transformRecurringTransactions = (
    transactions: ParsedRecurringTransaction[]
  ): RecurringTransaction[] => {
    return transactions.map((txn) => ({
      description: {
        icon: "/images/chevron-right.png",
        text: txn.latestDescription,
      },
      date: txn.latestTransactionDate,
      transactionAmount: `${txn.currency} ${txn.latestAmount.toFixed(2)}`,
      account: txn.accountName,
      totalAmount: `${txn.currency} ${txn.totalAmount.toFixed(2)}`,
      noOfOccurences: txn.occurrences,
      subItems: txn.subItems.map((sub) => ({
        date: formatDate(sub.transactionDate),
        description: sub.description,
        amount: `${sub.currency} ${sub.amount.toFixed(2)}`,
      })),
    }));
  };
  const transformInflows = (
    profitAndLost: {
      yearMonth: string;
      income: { flattenedFields: Record<string, { amount: number }> };
    }[]
  ): Inflows[] => {
    if (!profitAndLost || profitAndLost.length === 0) return [];
    const inflowsMap: Record<string, Inflows> = {};
    profitAndLost.forEach((entry, index) => {
      Object.entries(entry.income.flattenedFields).forEach(([key, value]) => {
        if (!inflowsMap[key]) {
          inflowsMap[key] = {
            inflows: key,
            month1: "-",
            month2: "-",
            month3: "-",
            month4: "-",
          };
        }
        (inflowsMap[key] as any)[`month${index + 1}`] = value.amount.toString();
      });
    });

    return Object.values(inflowsMap);
  };
  const transformOutflows = (
    profitAndLost: {
      yearMonth: string;
      expense: { flattenedFields: Record<string, { amount: number }> };
    }[]
  ): Outflows[] => {
    if (!profitAndLost || profitAndLost.length === 0) return [];
    const outflowsMap: Record<string, Outflows> = {};
    profitAndLost.forEach((entry, index) => {
      Object.entries(entry.expense.flattenedFields).forEach(([key, value]) => {
        if (!outflowsMap[key]) {
          outflowsMap[key] = {
            outflows: key,
            month1: "-",
            month2: "-",
            month3: "-",
            month4: "-",
          };
        }
        (outflowsMap[key] as any)[`month${index + 1}`] =
          value.amount.toString();
      });
    });
    return Object.values(outflowsMap);
  };

  const transformESGData = (esgSummary: any): PieData[] => {
    const transformedData: PieData[] = [];

    Object.keys(esgSummary).forEach((month) => {
      esgSummary[month].esgTransactions.forEach(
        (transaction: { category: string; co2Amount: number }) => {
          transformedData.push({
            name: transaction.category,
            value: transaction.co2Amount,
            month: month,
          });
        }
      );
    });

    return transformedData;
  };

  const transformReportsData = (
    incomeByCategory: Record<string, { id: string; amount: number }[]>
  ): PieData[] => {
    const transformedData: PieData[] = [];

    Object.keys(incomeByCategory).forEach((monthKey) => {
      const [year, month] = monthKey.split("-");
      const date = new Date(Number(year), Number(month) - 1);
      const formattedMonth = date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });

      incomeByCategory[monthKey].forEach(({ id, amount }) => {
        transformedData.push({
          month: formattedMonth,
          name: id,
          value: amount,
        });
      });
    });

    return transformedData;
  };

  const transformCashflowData = (history: any[]): CashFlowData[] => {
    if (!Array.isArray(history)) return [];
    return history.map((data) => ({
      category: formatYearMonth(data.yearMonth),
      positive: data.totalDeposit?.amount || 0,
      negative: data.totalWithdrawal?.amount || 0,
    }));
  };

  const lineData = (history: any[]): LineChartData[] => {
    if (!Array.isArray(history)) return [];
    return history.map((data, index) => ({
      value: data.net?.amount || 0,
      index: index,
    }));
  };
  const transformBarData = (esgSummary: any): BarData[] => {
    const monthNames = [
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

    return Object.keys(esgSummary).map((monthKey) => {
      const [year, month] = monthKey.split("-").map(Number);
      return {
        monthYear: `${monthNames[month - 1]} ${year % 100}`,
        value: esgSummary[monthKey].totalAmount,
      };
    });
  };

  const transformAreaData = (reports: any): AreaChartData[] => {
    if (!reports) {
      return [];
    }

    return reports.map((report: any) => ({
      name: new Date(report.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      HKDValue: report.balance,
    }));
  };

  const transactions = transformTransactions(rawData.taggedTransactions);
  const accounts = transformAccounts(rawData.parsedAccounts);
  const deposits = transformDeposits(reports.incomeRelationshipBreakdown);
  const withdrawals = transformDeposits(reports.expenseRelationshipBreakdown);
  const depositHighlights = transformHighlights(
    reports.incomeIrregularReport.transactions
  );
  const withdrawalHighlights = transformHighlights(
    reports.expenseIrregularReport.transactions
  );

  const depositRecurring = transformRecurringTransactions(
    reports.incomeRecurringTransactions
  );

  const withdrawalRecurring = transformRecurringTransactions(
    reports.expenseRecurringTransactions
  );
  const inflows = transformInflows(
    reports.profitAndLost.map((entry) => ({
      yearMonth: entry.yearMonth,
      income: {
        flattenedFields: Object.fromEntries(
          Object.entries(entry.income.flattenedFields)
            .filter(
              ([value]) =>
                value && typeof value === "object" && "amount" in value
            )
            .map(([key, value]) => [key, { amount: value?.amount ?? 0 }])
        ),
      },
    }))
  );
  const outflows = transformOutflows(
    reports.profitAndLost.map((entry) => ({
      yearMonth: entry.yearMonth,
      expense: {
        flattenedFields: Object.fromEntries(
          Object.entries(entry.expense.flattenedFields)
            .filter(
              ([value]) =>
                value && typeof value === "object" && "amount" in value
            )
            .map(([key, value]) => [key, { amount: value?.amount ?? 0 }])
        ),
      },
    }))
  );
  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        description: "Enter item description",
        qty: 1,
        price: 0,
        currency,
      },
    ]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, key: string, value: Item[keyof Item]) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };
  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);

    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        currency: newCurrency,
      }))
    );
  };
  const pieData = transformESGData(reports.esgSummary);
  const barData = transformBarData(reports.esgSummary);
  const depositsDashboard = transformReportsData(reports.incomeByCategory);
  const withDrawalsDashboard = transformReportsData(reports.expenseByCategory);
  const areaData = transformAreaData(reports.dailyBankBalanceDtos);
  const cashflowData = transformCashflowData(reports.cashFlow.history);
  const lineChartData = lineData(reports.cashFlow.history);
  return (
    <DataContext.Provider
      value={{
        rawData,
        reports,
        metrics,
        notifications,
        transactions,
        accounts,
        deposits,
        withdrawals,
        depositHighlights,
        withdrawalHighlights,
        depositRecurring,
        withdrawalRecurring,
        inflows,
        outflows,
        pieData,
        barData,
        depositsDashboard,
        withDrawalsDashboard,
        areaData,
        cashflowData,
        lineChartData,
        selectedTab,
        setSelectedTab,
        isCreatingInvoice,
        setIsCreatingInvoice,
        items,
        addItem,
        removeItem,
        updateItem,
        currency,
        setCurrency,
        handleCurrencyChange,
        invoiceNumber,
        setInvoiceNumber,
        invoiceSubject,
        setInvoiceSubject,
        invoiceDetails,
        setInvoiceDetails,
        dueDate,
        setDueDate,
        companyName,
        setCompanyName,
        companyAddress,
        setCompanyAddress,
        discount,
        setDiscount,
        hasDiscount,
        setHasDiscount,
        hasPaymentChecked,
        setHasPaymentChecked,
        bankDetails,
        setBankDetails,
        subTotal,
        setSubTotal,
        finalTotal,
        setFinalTotal,
        invoicesSummary,
        setInvoicesSummary,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
