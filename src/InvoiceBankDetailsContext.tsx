"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { BankDetails } from "./Interfaces/Interfaces";

type InvoiceBankDetailsContextType = {
  bankDetails: BankDetails;
  setBankDetails: (details: BankDetails) => void;
};

const InvoiceBankDetailsContext =
  createContext<InvoiceBankDetailsContextType | null>(null);

export const InvoiceBankProvider = ({ children }: { children: ReactNode }) => {
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: "",
    name: "",
    accountNumber: "",
    SWIFTCode: "",
    bankAddress: "",
  });

  return (
    <InvoiceBankDetailsContext.Provider
      value={{
        bankDetails,
        setBankDetails,
      }}>
      {children}
    </InvoiceBankDetailsContext.Provider>
  );
};

export const useInvoiceBankDetails = () => {
  const context = useContext(InvoiceBankDetailsContext);
  if (!context) {
    throw new Error("useInvoice must be used within a InvoiceBankProvider");
  }
  return context;
};
