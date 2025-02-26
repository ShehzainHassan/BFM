"use client";
import { createContext, ReactNode, useContext } from "react";
import { AccountData } from "./app/components/Table/Accounts/accounts";
import { MOCK_DATA } from "./mockdata";
import { BuyerSupplierAnalysis } from "./app/components/Table/BuyerSupplierAnalysis/BuyerSupplierAnalysis";
import { TransitionHighlight } from "./app/components/Table/TransitionHighlight/transitionHighlight";
import { RecurringTransaction } from "./app/components/Table/RecurringTransactions/recurringTransactions";
import { CURRENCY } from "./constants";
import {
  formatDate,
  formatString,
  formatYearMonth,
  getImagePath,
} from "./utils";
import { Transaction } from "./app/components/Table/Transactions/transactions";
import { Inflows } from "./app/components/Table/Inflows/inflows";
import { Outflows } from "./app/components/Table/Outflows/outflows";
import { PieData } from "./app/components/Charts/PieChart/PieChartData";
import { BarData } from "./app/components/Charts/BarChart/BarChartData";
import { AreaChartData } from "./app/components/Charts/AreaChart/AreaChartData";
import { CashFlowData } from "./app/components/Charts/CashflowChart/CashflowData";

interface DataContextType {
  rawData: typeof MOCK_DATA.data.rawData;
  reports: typeof MOCK_DATA.data.reports;
  metrics: typeof MOCK_DATA.data.metrics;
  notifications: typeof MOCK_DATA.data.notifications;
  transactions: Transaction[];
  accounts: AccountData[];
  deposits: BuyerSupplierAnalysis[];
  withdrawals: BuyerSupplierAnalysis[];
  depositHighlights: TransitionHighlight[];
  withdrawalHighlights: TransitionHighlight[];
  depositRecurring: RecurringTransaction[];
  withdrawalRecurring: RecurringTransaction[];
  inflows: Inflows[];
  outflows: Outflows[];
  pieData: PieData[];
  depositsDashboard: PieData[];
  withDrawalsDashboard: PieData[];
  areaData: AreaChartData[];
  barData: BarData[];
  cashflowData: CashFlowData[];
}
interface ParsedTransaction {
  transactionId: string;
  transactionDate: string;
  accountName: string;
  accountType: string;
  description: string;
  currency: string;
  amount: number;
  balance: number;
  category: string;
  bank: string;
  localCurrencyAmount: number;
  localCurrencyBalance: number;
}
interface ParsedAccount {
  accountName: string;
  accountType: string;
  currency: string;
  balance: number;
  localCurrencyBalance: number;
  bank: string;
}
interface ParsedDeposit {
  predictedName: string;
  daysBetweenTransactions: number;
  txnCounts: number;
  totalAmount: number;
  averageAmount: number;
}
interface ParsedTransitionHighlight {
  transactionDate: string;
  bank: string;
  accountName: string;
  description: string;
  currency: string;
  amount: number;
  category: string;
  merchant: string;
  reason: {
    type: string;
    value: number;
  };
}
interface ParsedSubItem {
  transactionDate: number[];
  description: string;
  currency: string;
  amount: number;
}
interface ParsedRecurringTransaction {
  latestDescription: string;
  latestTransactionDate: string;
  currency: string;
  latestAmount: number;
  latestLocalCurrencyAmount: number;
  accountName: string;
  bank: string;
  occurrences: number;
  totalAmount: number;
  totalLocalCurrencyAmount: number;
  subItems: ParsedSubItem[];
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { rawData, reports, metrics, notifications } = MOCK_DATA.data;

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
              ([_, value]) =>
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
              ([_, value]) =>
                value && typeof value === "object" && "amount" in value
            )
            .map(([key, value]) => [key, { amount: value?.amount ?? 0 }])
        ),
      },
    }))
  );
  const pieData = transformESGData(reports.esgSummary);
  const barData = transformBarData(reports.esgSummary);
  const depositsDashboard = transformReportsData(reports.incomeByCategory);
  const withDrawalsDashboard = transformReportsData(reports.expenseByCategory);
  const areaData = transformAreaData(reports.dailyBankBalanceDtos);
  const cashflowData = transformCashflowData(reports.cashFlow.history);
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
