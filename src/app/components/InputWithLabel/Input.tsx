import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import { H3, H4 } from "@/Typography";
import { useState } from "react";
import styled from "styled-components";
import { InputWithLabelProps } from "../../../../Interfaces";

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

export default function InputWithLabel({
  label = "Label",
  type = "text",
  placeholder = "Placeholder",
  isRequired = true,
  showLabel = true,
  showAsterik = true,
  showError = true,
  showPercentage = false,
  value,
  minimum = 1,
  maximum,
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
        {isRequired && showAsterik && <H4 color={BFMPalette.purple500}>*</H4>}
      </LabelWrapper>
      <InputWrapper $isError={isRequired && isTouched && !value}>
        {showPercentage && <PercentageIcon>%</PercentageIcon>}
        <StyledInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          min={minimum}
          max={maximum ?? undefined}
          $showPercentage={showPercentage}
        />
      </InputWrapper>
      {isRequired && isTouched && !value && showError && (
        <H3 color={BFMPalette.red600}>{label} is required</H3>
      )}
    </Container>
  );
}
