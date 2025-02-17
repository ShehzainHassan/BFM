export interface Transaction {
  date: string;
  description: {
    imgSrc: string;
    title: string;
    subtitle: string;
  };
  amount: {
    currency: string;
    equivalent: string;
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
      currency: "USD 10,000.00",
      equivalent: "HKD 10,000.00",
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
      currency: "USD 10,000.00",
      equivalent: "HKD 10,000.00",
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
      currency: "USD 10,000.00",
      equivalent: "HKD 10,000.00",
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
      currency: "USD 10,000.00",
      equivalent: "HKD 10,000.00",
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
      currency: "USD 10,000.00",
      equivalent: "HKD 10,000.00",
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
      currency: "USD 10,000.00",
      equivalent: "HKD 10,000.00",
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
      currency: "USD 10,000.00",
      equivalent: "HKD 10,000.00",
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
      currency: "USD 10,000.00",
      equivalent: "HKD 10,000.00",
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
];
