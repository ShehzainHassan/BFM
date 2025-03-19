import { BFMPalette } from "@/Theme";
import { Title } from "@/Typography";
import { Checkbox } from "antd";
import styled from "styled-components";

const Container = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${BFMPalette.white25};
  border: 1px solid ${BFMPalette.gray100};
  padding: 14px 16px;
  border-radius: 12px;
  cursor: pointer;
`;

const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    width: 20px;
    height: 22px;
    border-radius: 4px;
    border: 2px solid ${BFMPalette.gray200};
    transition: all 0.2s ease-in-out;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${BFMPalette.purple500} !important;
    border-color: ${BFMPalette.purple500} !important;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    top: 3px;
    left: 6px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

interface CheckboxProps {
  label?: string;
  checked: boolean;
  setChecked: (e: any) => void;
}

export default function CustomCheckbox({
  label = "Label",
  checked,
  setChecked,
}: CheckboxProps) {
  const handleChange = (e: any) => {
    setChecked(e.target.checked);
  };
  return (
    <Container>
      <StyledCheckbox checked={checked} onChange={handleChange} />
      <Title>{label}</Title>
    </Container>
  );
}
