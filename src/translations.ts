import { I18n } from "i18n-js";
import { useMemo } from "react";

const i18n = new I18n({
  en: {
    navbar: {
      titles: {
        dashboard: "Welcome Back, Mark",
        analytics: "Analytics Overview",
        invoices: "Invoices",
        calendar: "Business Calendar",
        esg: "ESG",
      },
      tabs: {
        dashboard: "Dashboard",
        analytics: "Analytics",
        invoices: "Invoices",
        calendar: "Calendar",
        esg: "ESG",
      },
    },
    nav_buttons: {
      schedule: "Schedule Event",
      createEvent: "Create New Event",
      createInvoice: "Create New Invoice",
    },
    notification_title: {
      dashboard: "For You",
      esg: "Actions For You",
    },
    charts: {
      co2_emission_text: "CO2 Emission by Category",
      carbon_footprint: "Carbon Footprint Trend",
      barChart: {
        label: "All data are in units of kg CO2e",
      },
    },
    tables: {
      recurring_transactions: {
        total_deposits_text: "Total Monthly Recurring Inflow",
        total_withdrawal_text: "Total Monthly Recurring Outflow",
      },
      transition_highlight: {
        average_deposit_text: "Average Inflow",
        average_withdrawal_text: "Average Ouflow",
      },
    },
  },
});

const useTranslation = () => {
  const t = useMemo(() => i18n.t.bind(i18n), []);
  return { t };
};

i18n.locale = "en";
i18n.enableFallback = true;

export default useTranslation;
