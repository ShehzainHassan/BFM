"use client";
import { useData } from "@/DataContext";
import useTranslation from "@/translations";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import Invoices from "./invoices/page";
import ESG from "./components/ESG/ESG";
import { JSX, useEffect } from "react";
import Calender from "./components/Calender/Calender";
import SelectDropDown from "./components/SelectDropDown/SelectDropDown";
import CreateNewInvoice from "./components/CreateNewInvoice/CreateNewInvoice";
import { generateInvoiceNumber } from "@/utils";

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
  };

  return componentMap[selectedTab] || <Dashboard />;
}
