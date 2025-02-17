export interface RecurringTransaction {
  description: {
    icon: string;
    text: string;
  };
  date: string;
  transactionAmount: string;
  account: {
    type: string;
    number: string;
  };
  totalAmount: string;
  noOfOccurences: number;
}

export const recurringTransData: RecurringTransaction[] = [
  {
    description: {
      icon: "/images/chevron-right.png",
      text: "CR TO 343**405 N31485657***(14MAR24)",
    },
    date: "14 MAR 2024",
    transactionAmount: "-HKD 100,000.00",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
    totalAmount: "-HKD 300,000.00",
    noOfOccurences: 3,
  },
  {
    description: {
      icon: "/images/chevron-right.png",
      text: "CR TO 343**405 N31485657***(14MAR24)",
    },
    date: "14 MAR 2024",
    transactionAmount: "-HKD 100,000.00",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
    totalAmount: "-HKD 300,000.00",
    noOfOccurences: 3,
  },
  {
    description: {
      icon: "/images/chevron-right.png",
      text: "CR TO 343**405 N31485657***(14MAR24)",
    },
    date: "14 MAR 2024",
    transactionAmount: "-HKD 100,000.00",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
    totalAmount: "-HKD 300,000.00",
    noOfOccurences: 3,
  },
  {
    description: {
      icon: "/images/chevron-right.png",
      text: "CR TO 343**405 N31485657***(14MAR24)",
    },
    date: "14 MAR 2024",
    transactionAmount: "-HKD 100,000.00",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
    totalAmount: "-HKD 300,000.00",
    noOfOccurences: 3,
  },
];
