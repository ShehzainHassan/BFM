"use client";
import { useData } from "@/DataContext";
import { generateMonths } from "@/utils";
import { Select } from "antd";
import { useState } from "react";

export default function SelectDropDown() {
  const [selectedMonth, setSelectedMonth] = useState<string>("Oct 2024");
  const { reports } = useData();
  return (
    <Select onChange={(value) => setSelectedMonth(value)} value={selectedMonth}>
      {generateMonths(reports.esgSummary).map((month) => (
        <Select.Option key={month} value={month}>
          {month}
        </Select.Option>
      ))}
    </Select>
  );
}
