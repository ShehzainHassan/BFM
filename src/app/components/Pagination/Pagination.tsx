import React from "react";
import styled from "styled-components";
import { Select } from "antd";
import { BFMPalette } from "@/Theme";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
`;

const StyledSelect = styled(Select)`
  width: 60px;
  text-align: center;

  .ant-select-selector {
    background-color: ${BFMPalette.purple600} !important;
    color: ${BFMPalette.white25} !important;
    font-weight: bold;
    border-radius: 4px !important;
    text-align: center;
    border: none !important;
  }

  .ant-select-arrow {
    color: ${BFMPalette.white25} !important;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <PaginationContainer>
      Page
      <StyledSelect
        value={currentPage}
        onChange={(value) => onPageChange(value as number)}
        dropdownStyle={{ textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <Select.Option key={i} value={i}>
            {i + 1}
          </Select.Option>
        ))}
      </StyledSelect>
      of {totalPages}
    </PaginationContainer>
  );
}
