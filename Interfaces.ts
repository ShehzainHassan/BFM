import { MOCK_DATA } from "@/mockdata";
import { ColumnDef } from "@tanstack/react-table";

export interface DataContextType {
  rawData: typeof MOCK_DATA.data.rawData;
  reports: typeof MOCK_DATA.data.reports;
  metrics: typeof MOCK_DATA.data.metrics;
  notifications: typeof MOCK_DATA.data.notifications;
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
  accountType: string;
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
      yearMonth: number[];
      category: string;
      co2Amount: number;
      amount: number;
    }[];
  };
}
export interface Reports {
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
  primaryDetail?: string;
  primaryType?: string;
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
  createdDate: string;
  lastModifiedDate: string;
}
export interface Attachment {
  id: number;
  txnId: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  createdDate: string;
  lastModifiedData: string;
}
export interface PieData {
  month: string;
  name: string;
  value: number;
}
export interface CheckboxProps {
  label?: string;
  checked: boolean;
  setChecked: (e: any) => void;
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
}
export interface payload {
  text: string;
  value: string;
}
export interface ESGNotificationsProps {
  imgSrc?: string;
  title?: string;
  data?: payload;
}
export interface HorizontalTabProps {
  tabs: string[];
  selectedTab: string;
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
  position?: "left" | "right" | "middle";
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
