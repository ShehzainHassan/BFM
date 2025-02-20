export const generateMonths = () => {
  const months: string[] = [];
  const startYear = 2024;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  for (let year = startYear; year <= currentYear; year++) {
    for (let month = 0; month < 12; month++) {
      if (year === currentYear && month > currentMonth) break;
      const monthName = new Date(year, month).toLocaleString("en-US", {
        month: "short",
      });
      months.push(`${monthName} ${year}`);
    }
  }

  return months;
};

export const formatCurrency = (value: string | number): string => {
  if (value === undefined || value === null || isNaN(Number(value)))
    return "0.00";

  const num = Number(value);
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
