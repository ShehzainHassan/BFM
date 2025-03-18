import { BFMPalette } from "@/Theme";
import { H3, H4 } from "@/Typography";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const StyledInput = styled.input<{ isError: boolean }>`
  width: 100%;
  min-width: 0;
  border: 1px solid
    ${(props) => (props.isError ? BFMPalette.red500 : BFMPalette.gray200)};
  padding: 8px 12px;
  background-color: ${BFMPalette.white};
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  color: ${BFMPalette.black800};
  font-family: "Inter", Arial, Helvetica, sans-serif;
  transition: border 0.2s ease-in-out;

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

const LabelWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

interface InputWithLabelProps {
  label?: string;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
  showLabel?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputWithLabel({
  label = "Label",
  type = "text",
  placeholder = "Placeholder",
  isRequired = true,
  showLabel = true,
  value,
  onChange,
}: InputWithLabelProps) {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <Container>
      <LabelWrapper>
        {showLabel && <H4>{label}</H4>}
        {isRequired && <H4 color={BFMPalette.purple500}>*</H4>}
      </LabelWrapper>
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        isError={isRequired && isTouched && !value}
      />
      {isRequired && isTouched && !value && (
        <H3 color={BFMPalette.red600}>{label} is required</H3>
      )}
    </Container>
  );
}
