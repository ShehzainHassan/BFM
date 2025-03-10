export interface Invoice {
  month: string;
  value1: number;
  value2: number;
  value3: number;
}

export const invoiceData: Invoice[] = [
  { month: "January", value1: 4000, value2: 2400, value3: 2400 },
  { month: "February", value1: 3000, value2: 1398, value3: 2210 },
  { month: "March", value1: 2000, value2: 9800, value3: 2290 },
  { month: "April", value1: 2780, value2: 3908, value3: 2000 },
  { month: "May", value1: 1890, value2: 4800, value3: 2181 },
  { month: "June", value1: 2390, value2: 3800, value3: 2500 },
  { month: "July", value1: 3490, value2: 4300, value3: 2100 },
];
