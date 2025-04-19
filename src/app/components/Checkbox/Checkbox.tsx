import { BFMPalette } from "@/Theme";
import { Title } from "@/Typography";
import styled from "styled-components";
import { CheckboxProps } from "../../../../Interfaces";

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

const StyledCheckbox = styled.input`
  width: 20px;
  height: 22px;
  border-radius: 4px;
  border: 2px solid ${BFMPalette.gray200};
  transition: all 0.2s ease-in-out;
  appearance: none;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: ${BFMPalette.purple500};
    border-color: ${BFMPalette.purple500};
  }

  &:checked::after {
    content: "";
    position: absolute;
    left: 4px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

export default function Checkbox({
  label = "Label",
  checked,
  setChecked,
}: CheckboxProps) {
  return (
    <Container>
      <StyledCheckbox
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <Title>{label}</Title>
    </Container>
  );
}
