import React from "react";
import styled from "styled-components";
import { Select } from "antd";
import { BFMPalette } from "@/Theme";
import Image from "next/image";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 8px;
  font-size: 16px;
  color: ${BFMPalette.gray700};
  font-weight: 600;
`;

const StyledSelect = styled(Select)`
  width: 60px;
  text-align: center;

  .ant-select-selector {
    background-color: ${BFMPalette.white25} !important;
    font-weight: bold;
    text-align: center;
    border: 1px solid ${BFMPalette.gray200} !important;
  }

  .ant-select-arrow {
    color: ${BFMPalette.white25} !important;
  }
`;

const PageButton = styled(Image)`
  cursor: pointer;
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  pointer-events: ${(props) => (props.hidden ? "none" : "auto")};
  transition: opacity 0.2s ease-in-out;
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
      {currentPage > 0 && (
        <PageButton
          src="/images/chevron-right.png"
          alt="<"
          width={20}
          height={20}
          style={{ transform: "rotate(180deg)" }}
          onClick={() => onPageChange(currentPage - 1)}
        />
      )}
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
      {currentPage < totalPages - 1 && (
        <PageButton
          src="/images/chevron-right.png"
          alt=">"
          width={20}
          height={20}
          onClick={() => onPageChange(currentPage + 1)}
        />
      )}
    </PaginationContainer>
  );
}
