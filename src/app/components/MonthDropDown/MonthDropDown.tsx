"use client";
import { Select } from "antd";
import styled from "styled-components";
import { SelectDropDownProps } from "../../../../Interfaces";

const StyledSelect = styled(Select)`
  width: 115px;
  height: 36px;

  .ant-select-selection-overflow {
    display: none;
  }

  .custom-dropdown .ant-select-item-option-selected::after {
    display: none !important;
  }
`;
export default function MonthDropDown({
  selectedMonths,
  setSelectedMonths,
  months,
}: SelectDropDownProps) {
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
