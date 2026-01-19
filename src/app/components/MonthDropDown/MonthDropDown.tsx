"use client";
import { Select } from "antd";
import { useEffect } from "react";

type SelectDropDownProps = {
  selectedMonths: string[];
  setSelectedMonths: (months: string[]) => void;
  months: string[];
};
export default function MonthDropDown({
  selectedMonths,
  setSelectedMonths,
  months,
}: SelectDropDownProps) {
  useEffect(() => {
    if (selectedMonths.length === 0 && months.length > 0) {
      setSelectedMonths([months[0]]);
    }
  }, [months, selectedMonths, setSelectedMonths]);
  return (
    <Select
      mode="multiple"
      onChange={(values) => setSelectedMonths(values)}
      value={selectedMonths}
      style={{
        width: 115,
        height: 36,
      }}
      placeholder="Months"
      optionLabelProp="label"
      maxTagCount={0}
      maxTagPlaceholder={() => `${selectedMonths.length} selected`}>
      {months.map((month) => (
        <Select.Option key={month} value={month} label={month}>
          <input
            type="checkbox"
            checked={selectedMonths.includes(month)}
            readOnly
            style={{
              marginRight: 8,
            }}
          />
          {month}
        </Select.Option>
      ))}
    </Select>
  );
}
