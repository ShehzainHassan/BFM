"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { InvoiceItem, Item } from "./Interfaces/Interfaces";

type InvoiceItemContextType = {
  items: InvoiceItem[];
  addItem: () => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, field: keyof InvoiceItem, value: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  handleCurrencyChange: (newCurrency: string) => void;
};

const InvoiceItemContext = createContext<InvoiceItemContextType | null>(null);

export const InvoiceItemProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState("USD");
  const [items, setItems] = useState([
    {
      id: Date.now(),
      description: "",
      qty: 0,
      price: 0,
      currency: currency,
    },
  ]);
  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        description: "",
        qty: 0,
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

  return (
    <InvoiceItemContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItem,
        currency,
        setCurrency,
        handleCurrencyChange,
      }}>
      {children}
    </InvoiceItemContext.Provider>
  );
};

export const useInvoiceItem = () => {
  const context = useContext(InvoiceItemContext);
  if (!context) {
    throw new Error("useInvoiceItem must be used within a InvoiceItemProvider");
  }
  return context;
};
