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

// export const recurringTransData: RecurringTransaction[] = [
//   {
//     description: {
//       icon: "/images/chevron-right.png",
//       text: "CR TO 343**405 N31485657***(14MAR24)",
//     },
//     date: "14 MAR 2024",
//     transactionAmount: "-HKD 100,000.00",
//     account: "Sample HKD Savings (666111***888)",
//     totalAmount: "-HKD 300,000.00",
//     noOfOccurences: 3,
//     subItems: [
//       {
//         date: "",
//         description: "",
//         amount: "",
//       },
//     ],
//   },
//   {
//     description: {
//       icon: "/images/chevron-right.png",
//       text: "CR TO 343**405 N31485657***(14MAR24)",
//     },
//     date: "14 MAR 2024",
//     transactionAmount: "-HKD 100,000.00",
//     account: "Sample HKD Savings (666111***888)",
//     totalAmount: "-HKD 300,000.00",
//     noOfOccurences: 3,
//     subItems: [
//       {
//         date: "",
//         description: "",
//         amount: "",
//       },
//     ],
//   },
//   {
//     description: {
//       icon: "/images/chevron-right.png",
//       text: "CR TO 343**405 N31485657***(14MAR24)",
//     },
//     date: "14 MAR 2024",
//     transactionAmount: "-HKD 100,000.00",
//     account: "Sample HKD Savings (666111***888)",
//     totalAmount: "-HKD 300,000.00",
//     noOfOccurences: 3,
//     subItems: [
//       {
//         date: "",
//         description: "",
//         amount: "",
//       },
//     ],
//   },
//   {
//     description: {
//       icon: "/images/chevron-right.png",
//       text: "CR TO 343**405 N31485657***(14MAR24)",
//     },
//     date: "14 MAR 2024",
//     transactionAmount: "-HKD 100,000.00",
//     account: "Sample HKD Savings (666111***888)",
//     totalAmount: "-HKD 300,000.00",
//     noOfOccurences: 3,
//     subItems: [
//       {
//         date: "",
//         description: "",
//         amount: "",
//       },
//     ],
//   },
// ];
