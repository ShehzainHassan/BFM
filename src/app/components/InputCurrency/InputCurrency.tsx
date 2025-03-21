import { BFMPalette } from "@/Theme";
import { H4 } from "@/Typography";
import { useState } from "react";
import styled from "styled-components";
import { Select } from "antd";
import { InputCurrencyProps } from "../../../../Interfaces";

const { Option } = Select;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputWrapper = styled.div<{ $isError: boolean }>`
  display: inline-flex;
  align-items: center;
  border: 1px solid
    ${({ $isError }) => ($isError ? BFMPalette.red500 : BFMPalette.gray200)};
  padding: 4px 12px;
  background-color: ${BFMPalette.white};
  border-radius: 8px;
  gap: 8px;
  max-width: 200px;

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

export default function InputCurrency({
  label = "Amount",
  placeholder = "Enter amount",
  isRequired = true,
  showLabel = true,
  showAsterik = true,
  price = 0,
  currency = "USD",
  readonly = false,
  value,
  onChangeAmount,
  onChangeCurrency,
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
      <InputWrapper $isError={isError}>
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
          onBlur={handleBlur}
          readOnly={readonly}
        />
      </InputWrapper>
    </Container>
  );
}
