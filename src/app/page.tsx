"use client";
import { useData } from "@/DataContext";
import useTranslation from "@/translations";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import Invoices from "./invoices/page";
import ESG from "./components/ESG/ESG";
import { JSX } from "react";
import Calender from "./components/Calender/Calender";

export default function Page() {
  const { t } = useTranslation();
  const { selectedTab } = useData();
  const componentMap: Record<string, JSX.Element> = {
    [t("navbar.tabs.dashboard")]: <Dashboard />,
    [t("navbar.tabs.analytics")]: <Analytics />,
    [t("navbar.tabs.invoices")]: <Invoices />,
    [t("navbar.tabs.calendar")]: <Calender />,
    [t("navbar.tabs.esg")]: <ESG />,
  };

  return componentMap[selectedTab] || <Dashboard />;
}
