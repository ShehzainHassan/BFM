import { BFMPalette } from "@/Theme";
import Image from "next/image";
import styled from "styled-components";

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid ${({ $borderColor }) => $borderColor || BFMPalette.white};
  border-radius: 8px;
  font-family: Inter;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  height: 36px;
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
  background-color: ${({ $bgColor }) => $bgColor || BFMPalette.purple500};
  color: ${({ $textColor }) => $textColor || BFMPalette.black100};
  opacity: ${({ $isDisabled }) => ($isDisabled ? "0.5" : "1")};
  transition: all 0.3s ease;

  &:hover {
    opacity: ${({ $isDisabled }) => ($isDisabled ? "0.5" : "0.85")};
  }
`;

const ButtonContent = styled.div<{ $imagePosition: string }>`
  display: flex;
  flex-direction: ${({ $imagePosition }) =>
    $imagePosition === "right" ? "row-reverse" : "row"};
  align-items: center;
  gap: 8px;
`;
type ButtonProps = {
  $bgColor?: string;
  $borderColor?: string;
  $textColor?: string;
  imageSrc?: string;
  imagePosition?: "left" | "right";
  onClick?: () => void;
  $isDisabled?: boolean;
  children: React.ReactNode;
};
export default function NavButton({
  $bgColor,
  $borderColor,
  $textColor,
  imageSrc,
  imagePosition = "left",
  children,
  onClick,
  $isDisabled = false,
}: ButtonProps) {
  return (
    <StyledButton
      $borderColor={$borderColor}
      $bgColor={$bgColor}
      $textColor={$textColor}
      onClick={$isDisabled ? undefined : onClick}
      $isDisabled={$isDisabled}
      disabled={$isDisabled}>
      <ButtonContent $imagePosition={imagePosition}>
        {imageSrc && <Image src={imageSrc} alt="icon" width={20} height={20} />}
        <span>{children}</span>
      </ButtonContent>
    </StyledButton>
  );
}
