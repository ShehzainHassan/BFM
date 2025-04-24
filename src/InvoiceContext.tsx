"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BankDetails, InvoiceSummary, Item } from "./Interfaces/Interfaces";
import useTranslation from "./translations";
import { parseInvoices } from "./utils";
import { InvoiceContextType } from "./Interfaces/InvoiceContext";

const InvoiceContext = createContext<InvoiceContextType | null>(null);

export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
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

  const [invoicesSummary, setInvoicesSummary] = useState<InvoiceSummary[]>([]);

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
      console.error("Error loading data ", err);
    }
  }, []);
  return (
    <InvoiceContext.Provider
      value={{
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
