import { BFMPalette } from "@/Theme";
import { H4 } from "@/Typography";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const InputWrapper = styled.div<{ $isError: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid
    ${(props) => (props.$isError ? BFMPalette.red500 : BFMPalette.gray200)};
  padding: 2px 12px;
  background-color: ${BFMPalette.white};
  border-radius: 8px;
  transition: border 0.2s ease-in-out;
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ $showPercentage?: boolean }>`
  width: 100%;
  min-width: 0;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${BFMPalette.black800};
  font-family: "Inter", Arial, Helvetica, sans-serif;
  background: transparent;
  padding: 8px 12px;
  padding-left: ${(props) => (props.$showPercentage ? "30px" : "0")};

  &::placeholder {
    color: ${BFMPalette.gray700};
  }

  &[type="number"] {
    appearance: textfield;
  }

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    appearance: none;
    margin: 0;
  }

  &[type="number"]::-moz-number-spin-box {
    display: none;
  }
`;

const PercentageIcon = styled.span`
  position: absolute;
  left: 12px;
  color: ${BFMPalette.gray700};
`;

const LabelWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

type InputWithLabelProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
  showLabel?: boolean;
  showAsterik?: boolean;
  showPercentage?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  minimum?: number;
  maximum?: number;
};
export default function InputWithLabel({
  label = "Label",
  type = "text",
  placeholder = "Placeholder",
  isRequired = true,
  showLabel = true,
  showAsterik = true,
  showPercentage = false,
  value,
  minimum = 1,
  maximum,
  onChange,
  onBlur,
}: InputWithLabelProps) {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <Container>
      <LabelWrapper>
        {showLabel && <H4>{label}</H4>}
        {isRequired && showAsterik && <H4 color={BFMPalette.purple500}>*</H4>}
      </LabelWrapper>
      <InputWrapper
        $isError={
          isRequired &&
          isTouched &&
          (typeof value === "string"
            ? !value.trim()
            : value === undefined || value === null)
        }>
        {showPercentage && <PercentageIcon>%</PercentageIcon>}
        <StyledInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            handleBlur();
            onBlur?.(e);
          }}
          min={minimum}
          max={maximum ?? undefined}
          $showPercentage={showPercentage}
        />
      </InputWrapper>
    </Container>
  );
}
