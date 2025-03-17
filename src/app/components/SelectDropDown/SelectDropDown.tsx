import { BFMPalette } from "@/Theme";
import useTranslation from "@/translations";
import { Description, H3Primary } from "@/Typography";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 14px;
  position: relative;
  background-color: ${BFMPalette.white};
  border: 1px solid ${BFMPalette.gray200};
  border-radius: 12px;
`;

const Label = styled.label`
  color: ${BFMPalette.gray700};
  margin-bottom: 4px;
  font-family: "Inter", Arial, Helvetica, sans-serif;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  color: ${BFMPalette.black800};
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  font-family: "Inter", Arial, Helvetica, sans-serif;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const Option = styled.option`
  color: ${BFMPalette.black800};
  background-color: ${BFMPalette.white};
  padding: 10px;
`;

export default function SelectDropDown() {
  const { t } = useTranslation();
  const options = Object.entries(t("invoice_creation.dropdown.options")).map(
    ([value, label]) => ({ value, label })
  );
  const [selected, setSelected] = useState(options[0].value);

  return (
    <Container>
      <Label>
        <Description>{t("invoice_creation.dropdown.label")}</Description>
      </Label>
      <SelectWrapper>
        <Select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </SelectWrapper>
    </Container>
  );
}
