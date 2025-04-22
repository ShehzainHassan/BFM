"use client";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AccountData,
  AreaChartData,
  Attachment,
  BankDetails,
  BarData,
  BuyerSupplierAnalysis,
  CashFlowData,
  CashFlowHistoryItem,
  DailyBankBalance,
  DataContextType,
  ESGNotification,
  ESGSummary,
  Inflows,
  InvoiceSummary,
  Item,
  LineChartData,
  Metrics,
  Note,
  Notifications,
  Outflows,
  ParsedAccount,
  ParsedDeposit,
  ParsedRecurringTransaction,
  ParsedTransaction,
  ParsedTransitionHighlight,
  PieData,
  RawData,
  RecurringTransaction,
  Reports,
  TaggedTransaction,
  Transaction,
  TransitionHighlight,
} from "../Interfaces";
import { CURRENCY } from "./constants";
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
  const [loading, setIsLoading] = useState(true);
  const [rawData, setRawData] = useState<RawData | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [reports, setReports] = useState<Reports | null>(null);
  const [notifications, setNotifications] = useState<Notifications | null>(
    null
  );
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [inflows, setInflows] = useState<Inflows[]>([]);
  const [outflows, setOutflows] = useState<Outflows[]>([]);

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
  const [selectedESGNotification, setSelectedESGNotification] =
    useState<ESGNotification | null>(null);
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
      date: formatDate(transaction.transactionDate),
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
        inflowsMap[key][`month${index + 1}` as keyof Inflows] =
          value.amount.toString();
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
        outflowsMap[key][`month${index + 1}` as keyof Outflows] =
          value.amount.toString();
      });
    });
    return Object.values(outflowsMap);
  };

  const transformESGData = (esgSummary: ESGSummary): PieData[] => {
    console.log("ESG Summary = ", esgSummary);
    const transformedData: PieData[] = [];

    Object.keys(esgSummary).forEach((month) => {
      esgSummary[month].esgTransactions.forEach(
        (transaction: {
          category: string;
          co2Amount: number;
          amount: number;
          color: string;
        }) => {
          transformedData.push({
            name: transaction.category,
            value: transaction.co2Amount,
            amount: transaction.amount,
            color: transaction.color,
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

  const transformCashflowData = (
    history: CashFlowHistoryItem[]
  ): CashFlowData[] => {
    if (!Array.isArray(history)) return [];
    return history.map((data) => ({
      category: formatYearMonth(data.yearMonth),
      positive: data.totalDeposit?.amount || 0,
      negative: data.totalWithdrawal?.amount || 0,
    }));
  };

  const lineData = (history: CashFlowHistoryItem[]): LineChartData[] => {
    if (!Array.isArray(history)) return [];
    return history.map((data, index) => ({
      value: data.net?.amount || 0,
      index: index,
    }));
  };
  const transformBarData = (esgSummary: ESGSummary): BarData[] => {
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

  const transformAreaData = (
    dailyBankBalanceDtos: DailyBankBalance[]
  ): AreaChartData[] => {
    if (!dailyBankBalanceDtos) {
      return [];
    }

    return dailyBankBalanceDtos.map((dto: DailyBankBalance) => ({
      name: new Date(dto.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      HKDValue: dto.balance,
    }));
  };

  const transactions = transformTransactions(rawData?.taggedTransactions ?? []);
  const accounts = transformAccounts(rawData?.parsedAccounts ?? []);
  const deposits = transformDeposits(
    reports?.incomeRelationshipBreakdown ?? []
  );
  const withdrawals = transformDeposits(
    reports?.expenseRelationshipBreakdown ?? []
  );
  const depositHighlights = transformHighlights(
    reports?.incomeIrregularReport.transactions ?? []
  );
  const withdrawalHighlights = transformHighlights(
    reports?.expenseIrregularReport.transactions ?? []
  );

  const depositRecurring = transformRecurringTransactions(
    reports?.incomeRecurringTransactions ?? []
  );

  const withdrawalRecurring = transformRecurringTransactions(
    reports?.expenseRecurringTransactions ?? []
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

  const pieData = transformESGData(reports?.esgSummary ?? {});
  const barData = transformBarData(reports?.esgSummary ?? {});
  const depositsDashboard = transformReportsData(
    reports?.incomeByCategory ?? {}
  );
  const withDrawalsDashboard = transformReportsData(
    reports?.expenseByCategory ?? {}
  );
  const areaData = transformAreaData(reports?.dailyBankBalanceDtos ?? []);
  const cashflowData = transformCashflowData(reports?.cashFlow.history ?? []);
  const lineChartData = lineData(reports?.cashFlow.history ?? []);

  useEffect(() => {
    const loadBFMData = async () => {
      try {
        const response = await axios.post(
          "https://api.dev.pca.planto.io/v1/businessFinancialManagement/mock",
          {
            CATEGORIZATION_TYPE: "ADVANCED",
            SHOW_CONFIDENCE_TAG: false,
            ENABLE_FORECAST: false,
            SHOW_INSIGHTS: false,
            SHOW_STRESS_TEST: false,
            SHOW_ACCOUNT_ID: false,
            SHOW_PROMINENT_FX_MESSAGE: true,
            SHOW_INTRA_COMPANY_TRANSFERS: false,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setRawData(response.data.data.rawData);
        setMetrics(response.data.data.metrics);
        setReports(response.data.data.reports);
        setNotifications(response.data.data.notifications);

        setInflows(
          transformInflows(
            response.data.data.reports.profitAndLost.map(
              (entry: {
                yearMonth: string;
                income: {
                  flattenedFields: Record<string, { amount: number }>;
                };
              }) => ({
                yearMonth: entry.yearMonth,
                income: {
                  flattenedFields: Object.fromEntries(
                    Object.entries(entry.income.flattenedFields)
                      .filter(
                        ([, value]) =>
                          value &&
                          typeof value === "object" &&
                          "amount" in value
                      )
                      .map(([key, value]) => [
                        key,
                        { amount: value?.amount ?? 0 },
                      ])
                  ),
                },
              })
            )
          )
        );

        setOutflows(
          transformOutflows(
            response.data.data.reports.profitAndLost.map(
              (entry: {
                yearMonth: string;
                expense: {
                  flattenedFields: Record<string, { amount: number }>;
                };
              }) => ({
                yearMonth: entry.yearMonth,
                expense: {
                  flattenedFields: Object.fromEntries(
                    Object.entries(entry.expense.flattenedFields)
                      .filter(
                        ([, value]) =>
                          value &&
                          typeof value === "object" &&
                          "amount" in value
                      )
                      .map(([key, value]) => [
                        key,
                        { amount: value?.amount ?? 0 },
                      ])
                  ),
                },
              })
            )
          )
        );
        const allAttachments: Attachment[] =
          response.data.data.rawData.taggedTransactions.flatMap(
            (txn: TaggedTransaction) => txn.attachments
          );
        const allNotes: Note[] =
          response.data.data.rawData.taggedTransactions.flatMap(
            (txn: TaggedTransaction) => txn.notes
          );
        setAttachments(allAttachments);
        setNotes(allNotes);
      } catch (err) {
        console.error("Error loading data ", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBFMData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        rawData,
        setRawData,
        reports,
        setReports,
        metrics,
        setMetrics,
        notifications,
        setNotifications,
        attachments,
        setAttachments,
        notes,
        setNotes,
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
        loading,
        selectedESGNotification,
        setSelectedESGNotification,
        transformClientName,
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
