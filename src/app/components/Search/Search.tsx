import { BFMPalette } from "@/Theme";
import Image from "next/image";
import styled from "styled-components";
const SearchContainer = styled("div")`
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 12px;
  padding: 8px 12px;
  border: 1px solid ${BFMPalette.gray200};
  background-color: ${BFMPalette.white};
  width: 300px;
`;

const SearchInput = styled("input")`
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  color: ${BFMPalette.gray700};
  background-color: transparent;

  &::placeholder {
    color: ${BFMPalette.gray700};
  }
`;

type SearchProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function Search({ placeholder, value, onChange }: SearchProps) {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder={placeholder ?? "Search"}
        value={value}
        onChange={onChange}
      />
      <Image src="/images/Search.png" alt="search" width={20} height={20} />
    </SearchContainer>
  );
}
