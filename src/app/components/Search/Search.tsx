import { BFMPalette } from "@/Theme";
import { MediumText } from "@/Typography";
import Image from "next/image";
import styled from "styled-components";

interface SearchProps {
  placeholder?: string;
}
export default function Search({ placeholder }: SearchProps) {
  const SearchContainer = styled("div")`
    display: flex;
    gap: 8px;
    align-items: center;
    border-radius: 12px;
    padding: 8px 12px;
    border: 1px solid ${BFMPalette.gray200};
    background-color: ${BFMPalette.white};
  `;
  return (
    <SearchContainer>
      <MediumText color={BFMPalette.gray700} width="300px">
        {placeholder ?? "Search"}
      </MediumText>
      <Image src="/images/Search.png" alt="search" width={20} height={20} />
    </SearchContainer>
  );
}
