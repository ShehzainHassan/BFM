import { ColumnDef } from "@tanstack/react-table";

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
  isCreatingInvoice: boolean;
  setIsCreatingInvoice: (value: boolean) => void;
  items: InvoiceItem[];
  addItem: () => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, field: keyof InvoiceItem, value: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  handleCurrencyChange: (newCurrency: string) => void;
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
  bankDetails: BankDetails;
  setBankDetails: (details: BankDetails) => void;
  subTotal: string;
  setSubTotal: (value: string) => void;
  finalTotal: string;
  setFinalTotal: (value: string) => void;
  invoicesSummary: InvoiceSummary[];
  setInvoicesSummary: (value: InvoiceSummary[]) => void;
  loading: boolean;
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
export interface AddressProps {
  title: string;
  company: string;
  address: string;
}
export interface BadgeGroupProps {
  title?: string;
  value?: number;
}
export interface ButtonProps {
  $bgColor?: string;
  $borderColor?: string;
  $textColor?: string;
  imageSrc?: string;
  imagePosition?: "left" | "right";
  onClick?: () => void;
  $isDisabled?: boolean;
  children: React.ReactNode;
}

export interface ButtonSecondaryProps {
  btnText?: string;
  imgSrc?: string;
}
export interface CarbonContainerProps {
  text?: string;
  carbonVal?: string;
}

export interface CardProps {
  image: string;
  title: string;
  description?: string;
  expandable?: boolean;
  children?: React.ReactNode;
}
export interface AggregatedItem {
  name: string;
  value: number;
  month: string;
}

export interface CategoryProps {
  data: AggregatedItem;
  circleColor: string;
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
export interface AreaChartProps {
  data: AreaChartData[];
}
export interface ChartProps {
  data: BarData[];
  color: string;
  barSize?: number;
  selectedBarColor?: string;
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
export interface InvoiceChartProps {
  invoiceData: Invoice[];
}

export interface TransactionDetailsProps<T = {}> {
  selectedRow: T;
  noteTitle?: string;
  noteContent?: string;
  lastUpdated?: string;
  selected?: string;
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
export interface CheckboxProps {
  label?: string;
  checked: boolean;
  setChecked: (e: boolean) => void;
}
export interface DueDatePayload {
  dueDate: string;
}

export interface DueDateProps {
  payload: DueDatePayload;
}

export interface RowData {
  inflows: string;
  outflows: string;
  [key: string]: any;
}

export interface ESGCardProps {
  title?: string;
  value?: number;
  kg?: number;
  circleColor?: string;
  amount?: number;
}
export interface payload {
  text: string;
  value: string;
}
export interface ESGNotificationsProps {
  type?: string;
  title?: string;
}
export interface HorizontalTabProps {
  tabs: string[];
  selectedTab: string;
  width?: string;
  tabType?: "button" | "tab";
  onTabChange: (tab: string) => void;
}
export interface InputCurrencyProps {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  showLabel?: boolean;
  showAsterik?: boolean;
  price?: number;
  onChangeAmount?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currency?: string;
  onChangeCurrency: (value: string) => void;
  readonly?: boolean;
  value?: number;
}
export interface InputDateProps {
  label?: string;
  isRequired?: boolean;
}
export interface InputWithLabelProps {
  label?: string;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
  showLabel?: boolean;
  showAsterik?: boolean;
  showError?: boolean;
  showPercentage?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minimum?: number;
  maximum?: number;
}

export interface DetailsModalProps {
  headerText?: string;
  modalIsOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  marginTop?: string;
  $position?: "left" | "right" | "middle";
}

export interface InvoiceTableProps {
  rows: InvoiceItem[];
}
export interface SelectDropDownProps {
  selectedMonths: string[];
  setSelectedMonths: (months: string[]) => void;
  months: string[];
}
export interface NavbarProps {
  navItems: { label: string }[];
}
export interface NotesProps {
  title: string;
  value: string;
}
export interface Notification {
  id: number;
  title: string;
  type: string;
  payload: Record<string, any>;
  description?: string;
}
export interface NotificationsProps {
  notifications: Notification[];
}
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export interface InfoTableProps {
  data: BankDetails;
}
export interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

export interface ComparisonProps {
  spendingData: Payload;
}
export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchQuery?: string;
  searchColumns?: (keyof T)[];
  title?: string;
  columnWidths?: string[];
  showHeader?: boolean;
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
export interface TextComponentProps {
  title: string;
  value: number;
  percentage: number;
  timePeriod: string;
  isIncreased?: boolean;
  valueColor?: string;
}
export interface CustomActiveDotProps {
  cx?: number;
  cy?: number;
  color?: string;
}
export interface CustomLabelProps {
  x?: number | string;
  y?: number | string;
  value?: number | string;
}

export interface Item {
  id: number;
  description: string;
  price: number;
  qty: number;
}

export interface TransactionCardProps<T> {
  data: Transaction;
}
export interface AccountCardProps<T> {
  data: AccountData;
}

export type NotificationType =
  | "CompareSpend"
  | "InvoiceDueSoon"
  | "Link"
  | string;

export interface DateArray extends Array<number> {}

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
