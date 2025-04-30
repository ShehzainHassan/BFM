import { BFMPalette } from "@/Theme";
import { H4 } from "@/Typography";
import { useState } from "react";
import styled from "styled-components";
import { Select } from "antd";

const { Option } = Select;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputWrapper = styled.div<{ $isError: boolean; $maxWidth: string }>`
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ $isError }) => ($isError ? BFMPalette.red500 : BFMPalette.gray200)};
  padding: 4px 12px;
  background-color: ${BFMPalette.white};
  border-radius: 8px;
  gap: 8px;
  max-width: ${({ $maxWidth }) => $maxWidth || "100%"};
  &:focus-within {
    border-color: ${({ $isError }) => $isError && BFMPalette.red500};
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  color: ${BFMPalette.black800};
  font-family: "Inter", Arial, Helvetica, sans-serif;
  background: transparent;

  &::placeholder {
    color: ${BFMPalette.gray700};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
`;

const StyledSelect = styled(Select)`
  .ant-select-selector {
    border: none !important;
    background: transparent !important;
    font-size: 16px;
    color: ${BFMPalette.black800};
    box-shadow: none !important;
  }

  .ant-select-focused .ant-select-selector {
    box-shadow: none !important;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

type InputCurrencyProps = {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  showLabel?: boolean;
  showAsterik?: boolean;
  price?: number;
  onChangeAmount?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  currency?: string;
  onChangeCurrency: (value: string) => void;
  readonly?: boolean;
  value?: number;
  $maxWidth?: string | undefined;
};

export default function InputCurrency({
  label = "Amount",
  placeholder = "00,000",
  isRequired = true,
  showLabel = true,
  showAsterik = true,
  price = 0,
  currency = "USD",
  readonly = false,
  value,
  onChangeAmount,
  onChangeCurrency,
  onBlur,
  $maxWidth,
}: InputCurrencyProps) {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  const isError =
    value === undefined && isRequired && touched && Number(price) === 0;

  return (
    <Container>
      <LabelWrapper>
        {showLabel && <H4>{label}</H4>}
        {isRequired && showAsterik && <H4 color={BFMPalette.purple500}>*</H4>}
      </LabelWrapper>
      <InputWrapper $maxWidth={$maxWidth || "100%"} $isError={isError}>
        <StyledSelect
          value={currency}
          onChange={(value) => onChangeCurrency(value as string)}
          popupMatchSelectWidth={false}>
          <Option value="USD">USD</Option>
          <Option value="HKD">HKD</Option>
          <Option value="AED">AED</Option>
        </StyledSelect>
        <StyledInput
          type="number"
          placeholder={placeholder}
          value={value !== undefined ? value : price}
          min={0}
          onChange={onChangeAmount}
          onBlur={(e) => {
            handleBlur();
            onBlur?.(e);
          }}
          readOnly={readonly}
        />
      </InputWrapper>
    </Container>
  );
}
