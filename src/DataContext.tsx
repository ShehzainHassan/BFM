"use client";
import { createContext, ReactNode, useContext } from "react";
import { AccountData } from "./app/components/Table/Accounts/accounts";
import { MOCK_DATA } from "./mockdata";

interface DataContextType {
  rawData: typeof MOCK_DATA.data.rawData;
  reports: typeof MOCK_DATA.data.reports;
  metrics: typeof MOCK_DATA.data.metrics;
  notifications: typeof MOCK_DATA.data.notifications;
  accounts: AccountData[];
}
interface ParsedAccount {
  consentId: string;
  bankId: string;
  accountId: string;
  accountName: string;
  accountType: string;
  currency: string;
  balance: number;
  localCurrencyBalance: number;
  bank: string;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { rawData, reports, metrics, notifications } = MOCK_DATA.data;
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
        value: account.balance,
        HKDEquivalent: account.localCurrencyBalance,
      },
    }));
  };
  const accounts = transformAccounts(rawData.parsedAccounts);

  return (
    <DataContext.Provider
      value={{
        rawData,
        reports,
        metrics,
        notifications,
        accounts,
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
