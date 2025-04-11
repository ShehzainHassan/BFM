"use client";
import { useData } from "@/DataContext";
import useTranslation from "@/translations";
import { generateInvoiceNumber } from "@/utils";
import { JSX, useEffect } from "react";
import Analytics from "./components/Analytics/Analytics";
import Calender from "./components/Calender/Calender";
import CreateNewInvoice from "./components/CreateNewInvoice/CreateNewInvoice";
import Dashboard from "./components/Dashboard/Dashboard";
import ESG from "./components/ESG/ESG";
import Invoices from "./invoices/page";
import MobileTransactions from "./components/MobileTransactions/MobileTransactions";

export default function Page() {
  const { t } = useTranslation();
  const { selectedTab, isCreatingInvoice, setInvoiceNumber } = useData();
  useEffect(() => {
    if (isCreatingInvoice) {
      const newInvoiceNumber = generateInvoiceNumber();
      setInvoiceNumber(newInvoiceNumber);
    }
  }, [isCreatingInvoice, setInvoiceNumber]);
  const componentMap: Record<string, JSX.Element> = {
    [t("navbar.tabs.dashboard")]: <Dashboard />,
    [t("navbar.tabs.analytics")]: <Analytics />,
    [t("navbar.tabs.invoices")]: isCreatingInvoice ? (
      <CreateNewInvoice />
    ) : (
      <Invoices />
    ),
    [t("navbar.tabs.calendar")]: <Calender />,
    [t("navbar.tabs.esg")]: <ESG />,
    [t("navbar.tabs.transactions")]: <MobileTransactions />,
  };

  return componentMap[selectedTab] || <Dashboard />;
}
