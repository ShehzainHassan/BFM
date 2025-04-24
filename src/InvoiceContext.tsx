"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { InvoiceSummary } from "./Interfaces/Interfaces";
import useTranslation from "./translations";
import { parseInvoices } from "./utils";

type InvoiceContextType = {
  isCreatingInvoice: boolean;
  setIsCreatingInvoice: (value: boolean) => void;
  invoiceNumber: string;
  setInvoiceNumber: (value: string) => void;
  invoiceSubject: string;
  setInvoiceSubject: (value: string) => void;
  invoiceDetails: string;
  setInvoiceDetails: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  companyName: string;
  setCompanyName: (value: string) => void;
  companyAddress: string;
  setCompanyAddress: (value: string) => void;
  discount: number;
  setDiscount: (value: number) => void;
  hasDiscount: boolean;
  setHasDiscount: (value: boolean) => void;
  hasPaymentChecked: boolean;
  setHasPaymentChecked: (value: boolean) => void;
  subTotal: string;
  setSubTotal: (value: string) => void;
  finalTotal: string;
  setFinalTotal: (value: string) => void;
  invoicesSummary: InvoiceSummary[];
  setInvoicesSummary: (value: InvoiceSummary[]) => void;
  transformClientName: (clientName: string) => void;
};

const InvoiceContext = createContext<InvoiceContextType | null>(null);

export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
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

  const [invoicesSummary, setInvoicesSummary] = useState<InvoiceSummary[]>([]);

  useEffect(() => {
    try {
      const storedInvoices = localStorage.getItem("invoices");
      if (storedInvoices) {
        const parsed = parseInvoices(JSON.parse(storedInvoices)).map(
          (invoice) => ({
            ...invoice,
            clientName: transformClientName(invoice.clientName),
          })
        );
        setInvoicesSummary(parsed);
      }
    } catch (err) {
      console.error("Error loading invoices ", err);
    }
  }, []);
  return (
    <InvoiceContext.Provider
      value={{
        isCreatingInvoice,
        setIsCreatingInvoice,
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
        subTotal,
        setSubTotal,
        finalTotal,
        setFinalTotal,
        invoicesSummary,
        setInvoicesSummary,
        transformClientName,
      }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within a InvoiceProvider");
  }
  return context;
};
