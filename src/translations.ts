import { I18n } from "i18n-js";

const i18n = new I18n({
  en: {
    navbar: {
      dashboard: "Welcome Back, Mark",
      analytics: "Welcome Back, Mark",
      invoices: "Invoices",
      calender: "Business Calender",
      esg: "ESG",
    },
    nav_buttons: {
      schedule: "Schedule Event",
      createEvent: "Create New Event",
      createInvoice: "Create New Invoice",
    },
  },
});

i18n.locale = "en";
i18n.enableFallback = true;

export default i18n;
