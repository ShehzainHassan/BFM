export interface DataContextType {
  rawData: RawData | null;
  setRawData: (data: RawData) => void;
  reports: Reports | null;
  setReports: (data: Reports) => void;
  metrics: Metrics | null;
  setMetrics: (data: Metrics) => void;
  notifications: Notifications | null;
  setNotifications: (data: Notifications) => void;
  attachments: Attachment[];
  setAttachments: (data: Attachment[]) => void;
  notes: Note[];
  setNotes: (data: Note[]) => void;
  transactions: Transaction[];
  accounts: AccountData[];
  deposits: BuyerSupplierAnalysis[];
  withdrawals: BuyerSupplierAnalysis[];
  depositHighlights: TransitionHighlight[];
  withdrawalHighlights: TransitionHighlight[];
  depositRecurring: RecurringTransaction[];
  withdrawalRecurring: RecurringTransaction[];
  inflows: Inflows[];
  outflows: Outflows[];
  pieData: PieData[];
  depositsDashboard: PieData[];
  withDrawalsDashboard: PieData[];
  areaData: AreaChartData[];
  barData: BarData[];
  cashflowData: CashFlowData[];
  lineChartData: LineChartData[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  loading: boolean;
  selectedESGNotification: ESGNotification | null;
  setSelectedESGNotification: (notification: ESGNotification) => void;
}
export interface TaggedTransaction {
  transactionId: string;
  transactionDate: string;
  accountName: string;
  accountType: string | null;
  description: string;
  currency: string;
  amount: number;
  balance: number;
  merchant: string;
  category: string;
  bank: string;
  probability: string;
  predictedName: string;
  consentId: string;
  accountId: string | null;
  bankId: string | null;
  localCurrencyAmount: number;
  localCurrencyBalance: number;
  attachments: Attachment[];
  notes: Note[];
}
export interface ParsedAccount {
  consentId: string;
  bankId: string;
  accountId: string | null;
  accountName: string;
  accountType: string;
  currency: string;
  balance: number;
  localCurrencyBalance: number;
  bank: string;
}
export interface RawData {
  taggedTransactions: TaggedTransaction[];
  parsedAccounts: ParsedAccount[];
}
export interface MetricValue {
  amount: number;
  type: string;
}
export interface AmountType {
  amount: number;
  type: string;
}
export interface CashFlowHistoryItem {
  yearMonth: string;
  totalDeposit: AmountType;
  totalWithdrawal: AmountType;
  net: AmountType;
}
export interface CashFlow {
  history: CashFlowHistoryItem[];
  forecast: CashFlowHistoryItem[];
}
export interface Metrics {
  name: string;
  unit: string;
  value: MetricValue;
}
export interface IncomeRelationshipBreakdown {
  predictedName: string;
  daysBetweenTransactions: number;
  txnCounts: number;
  totalAmount: number;
  averageAmount: number;
  transactions: ParsedTransaction[];
}
export interface BankDetails {
  bankName: string;
  name: string;
  accountNumber: string;
  SWIFTCode: string;
  bankAddress: string;
}
export interface InvoiceItem {
  id: number;
  description: string;
  qty: number;
  price: number;
  currency: string;
}
export interface ParsedTransaction {
  transactionId: string;
  transactionDate: string;
  accountName: string;
  accountType: string | null;
  description: string;
  currency: string;
  amount: number;
  balance: number;
  category: string;
  bank: string;
  localCurrencyAmount: number;
  localCurrencyBalance: number;
  attachments: Attachment[];
  notes: Note[];
}
export interface ParsedAccount {
  accountName: string;
  accountType: string;
  currency: string;
  balance: number;
  localCurrencyBalance: number;
  bank: string;
}
export interface ParsedDeposit {
  predictedName: string;
  daysBetweenTransactions: number;
  txnCounts: number;
  totalAmount: number;
  averageAmount: number;
}
export interface IrregularReport {
  transactions: ParsedTransitionHighlight[];
  averageAmount: number;
}
export interface ParsedTransitionHighlight {
  transactionDate: string;
  bank: string;
  accountName: string;
  description: string;
  currency: string;
  amount: number;
  category: string;
  merchant: string;
  reason: {
    type: string;
    value: number;
  };
}
export interface ParsedSubItem {
  transactionDate: number[];
  description: string;
  currency: string;
  amount: number;
}
export interface ParsedRecurringTransaction {
  latestDescription: string;
  latestTransactionDate: string;
  currency: string;
  latestAmount: number;
  latestLocalCurrencyAmount: number;
  accountName: string;
  bank: string;
  occurrences: number;
  totalAmount: number;
  totalLocalCurrencyAmount: number;
  subItems: ParsedSubItem[];
}
export interface AggregatedItem {
  name: string;
  value: number;
  month: string;
}
export interface AreaChartData {
  name: string;
  HKDValue: number;
}
export interface ESGSummary {
  [key: string]: {
    totalCo2Amount: number;
    totalAmount: number;
    esgTransactions: {
      yearMonth: [number, number];
      category: string;
      co2Amount: number;
      amount: number;
      color: string;
    }[];
  };
}
export interface Reports {
  cashFlow: CashFlow;
  incomeRelationshipBreakdown: ParsedDeposit[];
  expenseRelationshipBreakdown: ParsedDeposit[];
  profitAndLost: ProfitAndLoss[];
  dailyBankBalanceDtos: DailyBankBalance[];
  incomeByCategory: IncomeExpenseCategory;
  expenseByCategory: IncomeExpenseCategory;
  incomeIrregularReport: IrregularReport;
  expenseIrregularReport: IrregularReport;
  incomeRecurringTransactions: [];
  expenseRecurringTransactions: ParsedRecurringTransaction[];
  overviewReport: OverviewReport;
  esgSummary: ESGSummary;
}
export interface IncomeExpenseCategory {
  [key: string]: {
    id: string;
    amount: number;
  }[];
}
export interface BarData {
  monthYear: string;
  value: number;
}
export interface CashFlowData {
  category: string;
  positive: number;
  negative: number;
  [key: string]: string | number;
}
export interface LineChartData {
  value: number;
  index: number;
}
export interface Invoice {
  month: string;
  value1: number;
  value2: number;
  value3: number;
}
export interface FileData {
  name: string;
  size: string;
  extension: string;
  url: string;
}
export interface StoredData {
  rowId: string;
  files: FileData[];
}
export interface Note {
  transactionId: string;
  note: string;
  createdDate: number[];
  lastModifiedDate: number[];
}
export interface Attachment {
  id: number;
  txnId: string;
  file: string;
  fileName: string;
  mimeType: string;
  createdDate: number[];
  lastModifiedDate: number[];
}
export interface PieData {
  month: string;
  name: string;
  value: number;
  amount?: number;
  color?: string;
}
export interface DueDatePayload {
  dueDate: string;
}
export interface RowData {
  inflows: string;
  outflows: string;
  [key: string]: string | number | boolean | null | undefined;
}
export interface payload {
  text: string;
  value: string;
}
export interface NavbarProps {
  navItems: { label: string }[];
}
export interface Notification {
  id: number;
  title: string;
  type: string;
  payload: { [key: string]: string | number | boolean | null };
  description?: string;
}
export interface Payload {
  current: {
    month: string;
    value: number;
    currency: string;
  };
  previous: {
    month: string;
    value: number;
    currency: string;
  };
}
export interface AccountData {
  bank: string;
  account: string;
  accountType: string;
  balance: number;
  amount: {
    currency: string;
    value: number;
    HKDEquivalent: number;
  };
}
export interface BuyerSupplierAnalysis {
  predictedName: string;
  avgTransactionAmount: string;
  daysBWTransactions: string;
  NumberOfTransactions: number;
  totalAmount: string;
}
export interface ExpandedData {
  date: string;
  description: string;
  amount: string;
}
export interface Inflows {
  inflows: string;
  month1: string;
  month2: string;
  month3: string;
  month4: string;
}

export interface Outflows {
  outflows: string;
  month1: string;
  month2: string;
  month3: string;
  month4: string;
}
export interface InvoiceSummary {
  invoiceNo: string;
  clientName: string;
  issueDate: string;
  dueDate: string;
  invoiceAmount: string;
  category: string;
}
export interface DetailedInvoiceSummary {
  address: string;
  amountDue: string;
  companyName: string;
  discount: number;
  dueDate: string;
  invoiceDate: string;
  invoiceDetail: string;
  invoiceNumber: string;
  items: InvoiceItem[];
  subTotal: string;
  bankDetails: BankDetails;
  category: "PENDING" | "PAID" | "OVERDUE";
  previousCategory?: "PENDING" | "PAID" | "OVERDUE";
}
export interface RecurringTransaction {
  description: {
    icon: string;
    text: string;
  };
  date: string;
  transactionAmount: string;
  account: string;
  totalAmount: string;
  noOfOccurences: number;
  subItems: {
    date: string;
    description: string;
    amount: string;
  }[];
}
export interface Transaction {
  id: string;
  date: string;
  description: {
    imgSrc: string;
    title: string;
    subtitle: string;
  };
  amount: {
    currency: string;
    value: number;
    HKDEquivalent: number;
  };
  bank: string;
  account: string;
  attachments: Attachment[];
  notes: Note[];
}
export interface TransitionHighlight {
  date: string;
  bank: string;
  account: string;
  description: string;
  category: string;
  payeeORMerchant: string;
  amount: string;
  reason: string;
}
export interface Item {
  id: number;
  description: string;
  price: number;
  qty: number;
}
export type NotificationType =
  | "CompareSpend"
  | "InvoiceDueSoon"
  | "Link"
  | string;
export type DateArray = number[];
export interface CompareSpendPayload {
  current: {
    month: string;
    value: number;
    currency: string;
  };
  previous: {
    month: string;
    value: number;
    currency: string;
  };
}
export interface InvoiceDueSoonPayload {
  dueDate: string;
}
export interface LinkPayload {
  linkLabel: string;
  linkUrl: string;
}
export interface NotificationItem {
  id: number;
  title: string;
  description?: string;
  type: NotificationType;
  payload: CompareSpendPayload | InvoiceDueSoonPayload | LinkPayload | object;
  createdDate: DateArray;
}
export interface ESGTask {
  title: string;
  description: string;
}
export interface ESGNotification {
  createdDate: DateArray | null;
  type: string;
  title: string;
  description: string;
  didYouKnow: string;
  tasks: ESGTask[];
}
export interface Notifications {
  notifications: NotificationItem[];
  esgNotifications: ESGNotification[];
}
export interface MonthYearData {
  monthYear: string;
  value: number;
}
export interface OverviewReport {
  totalInflow: number;
  totalOutflow: number;
  currentBalance: number;
  inflowPercentageMoM: number;
  outflowPercentageMoM: number;
  netFlowPercentageMoM: number;
}
export interface DailyBankBalance {
  date: string;
  balance: number;
}
export interface FlattenedField {
  amount: number;
  type: "REGULAR" | "TOTAL";
}
export interface ProfitAndLoss {
  yearMonth: string;
  income: {
    flattenedFields: {
      [key: string]: FlattenedField | null;
    };
  };
  expense: {
    flattenedFields: {
      [key: string]: FlattenedField;
    };
  };
}
