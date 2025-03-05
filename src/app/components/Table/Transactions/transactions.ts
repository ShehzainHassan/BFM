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
