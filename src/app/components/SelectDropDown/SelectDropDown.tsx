"use client";
import { Select } from "antd";
import { generateMonths } from "@/utils";
import { useData } from "@/DataContext";
import { useEffect, useState } from "react";

interface SelectDropDownProps {
  selectedMonths: string[];
  setSelectedMonths: (months: string[]) => void;
}

export default function SelectDropDown({
  selectedMonths,
  setSelectedMonths,
}: SelectDropDownProps) {
  const { reports } = useData();
  const months = generateMonths(reports.esgSummary);

  return (
    <Select
      mode="multiple"
      onChange={(values) => setSelectedMonths(values)}
      value={selectedMonths}
      style={{ width: 250 }}
      placeholder="Select at least one month"
      optionLabelProp="label">
      {months.map((month) => (
        <Select.Option key={month} value={month} label={month}>
          <input
            type="checkbox"
            checked={selectedMonths.includes(month)}
            readOnly
            style={{ marginRight: 8 }}
          />
          {month}
        </Select.Option>
      ))}
    </Select>
  );
}
