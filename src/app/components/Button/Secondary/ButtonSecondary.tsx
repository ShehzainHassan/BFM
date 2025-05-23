import { BFMPalette } from "@/Theme";
import Image from "next/image";
import styled from "styled-components";

const StyledButton = styled("button")`
  color: ${BFMPalette.blue600};
  background-color: ${BFMPalette.white40};
  border: 1px solid ${BFMPalette.blue100};
  padding: 2px 6px 2px 8px;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
type ButtonSecondaryProps = {
  btnText?: string;
  imgSrc?: string;
};
export default function ButtonSecondary({
  btnText,
  imgSrc,
}: ButtonSecondaryProps) {
  return (
    <StyledButton>
      {btnText ?? "Learn More"}
      <Image
        src={imgSrc ?? "/images/arrow-narrow-right.png"}
        alt="arrow"
        width={12}
        height={12}
      />
    </StyledButton>
  );
}
