export interface Transaction {
  date: string;
  description: {
    imgSrc: string;
    title: string;
    subtitle: string;
  };
  amount: {
    currency: string;
    value: string;
    equivalent: string;
  };
  bank: string;
  account: {
    type: string;
    number: string;
  };
}
