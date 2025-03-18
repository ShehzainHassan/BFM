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
        create_Invoice: "Create New Invoice",
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
      cancel: "Cancel",
      save_Invoice: "Save Invoice",
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
      inflows: "INFLOWS",
      outflows: "OUTFLOWS",
      recurring_transactions: {
        total_deposits_text: "Total Monthly Recurring Inflow",
        total_withdrawal_text: "Total Monthly Recurring Outflow",
        description: "TRANSACTION DESCRIPTION",
        date: "TRANSACTION DATE",
        amount: "TRANSACTION AMOUNT",
        account: "ACCOUNT",
        total_amount: "TOTAL AMOUNT",
        occurences: "# OF OCCURENCES",
      },
      transition_highlight: {
        average_deposit_text: "Average Inflow",
        average_withdrawal_text: "Average Ouflow",
        date: "DATE",
        bank: "BANK",
        account: "ACCOUNT",
        description: "DESCRIPTION",
        category: "CATEGORY",
        payee_merchant: "PAYEE / MERCHANT",
        amount: "AMOUNT",
        reason: "REASON",
      },
      transactions: {
        date: "DATE",
        descriptions: "DESCRIPTIONS",
        amount: "AMOUNT / HKD EQV",
        bank: "BANK",
        account: "ACCOUNT",
        action: "",
      },
      accounts: {
        bank: "BANK",
        account_name: "ACCOUNT NAME",
        account_type: "ACCOUNT TYPE",
        balance: "BALANCE",
        amount: "AMOUNT / HKD EQV",
      },
      buyer_supplier_analysis: {
        predicted_name: "PREDICTED NAME",
        average_transaction_amount: "AVERAGE TRANSACTION AMOUNT",
        days_between_transactions: "DAYS B/W TRANSACTIONS",
        number_of_transactions: "NO OF TRANSACTIONS",
        total_amount: "TOTAL AMOUNT",
      },
    },
    invoice_creation: {
      dropdown: {
        label: "Bill to",
        options: {
          blue_fund: "Blue Fund Pte Ltd",
          red_fund: "Red Fund Pte Ltd",
          green_fund: "Green Fund Pte Ltd",
        },
      },
      subject: {
        label: "Subject",
        placeholder: "Design service per june 2023",
      },
      invoice_detail: {
        label: "Invoice Detail",
        placeholder: "Summary (e.g project name, descriptions of invoice)",
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
