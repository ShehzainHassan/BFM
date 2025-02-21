"use client";
import { BFMPalette } from "@/Theme";
import { TextTitle, Title } from "@/Typography";
import Image from "next/image";
import styled from "styled-components";

const EmptyContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background-color: ${BFMPalette.white25};
`;
const NoRecordContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;
const NoRecordTextContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
`;

export default function NoResults() {
  return (
    <EmptyContainer>
      <NoRecordContainer>
        <Image
          src="/images/no-record.png"
          alt="no-record"
          width={140}
          height={140}
        />
        <NoRecordTextContainer>
          <TextTitle color={BFMPalette.black800}>No records found</TextTitle>
          <Title>Try adjusting your filters for a broader search</Title>
        </NoRecordTextContainer>
      </NoRecordContainer>
    </EmptyContainer>
  );
}
