"use client";
import { Select } from "antd";
import { generateMonths } from "@/utils";
import { useData } from "@/DataContext";

interface SelectDropDownProps {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

export default function SelectDropDown({
  selectedMonth,
  setSelectedMonth,
}: SelectDropDownProps) {
  const { reports } = useData();

  return (
    <Select
      onChange={(value) => setSelectedMonth(value)}
      value={selectedMonth}
      style={{ width: 150 }}>
      {generateMonths(reports.esgSummary).map((month) => (
        <Select.Option key={month} value={month}>
          {month}
        </Select.Option>
      ))}
    </Select>
  );
}
