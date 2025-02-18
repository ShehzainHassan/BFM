export interface AccountData {
  bank: string;
  account: {
    type: string;
    number: string;
  };
  accountType: string;
  balance: string;
  amount: {
    currency: string;
    value: number;
    HKDEquivalent: number;
  };
}

export const accountsData: AccountData[] = [
  {
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
    accountType: "Current/Savings",
    balance: "HKD 449,117.24",
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
  },
  {
    bank: "abc Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
    accountType: "Current/Savings",
    balance: "HKD 449,117.24",
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
  },
  {
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
    accountType: "Current/Savings",
    balance: "HKD 449,117.24",
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
  },
  {
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
    accountType: "Current/Savings",
    balance: "HKD 449,117.24",
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
  },
  {
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
    accountType: "Current/Savings",
    balance: "HKD 449,117.24",
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
  },
  {
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
    accountType: "Current/Savings",
    balance: "HKD 449,117.24",
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
  },
  {
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
    accountType: "Current/Savings",
    balance: "HKD 449,117.24",
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
  },
];
