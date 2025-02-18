export interface Transaction {
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
  account: {
    type: string;
    number: string;
  };
}

export const transactionData: Transaction[] = [
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/receipt-check.png",
      title: "HKCSL Telecom Ltd",
      subtitle: "Bills",
    },
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },

    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: 10000.0,
      HKDEquivalent: 10000.0,
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
];
