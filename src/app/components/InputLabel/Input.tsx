import { BFMPalette } from "@/Theme";
import { LabelMedium } from "@/Typography";
import styled from "styled-components";

export default function InputLabel() {
  const InputContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    padding: 4px 4px 4px 10px;
    border-radius: 16px;
    border: 1px solid ${BFMPalette.green400};
  `;
  const Input = styled("input")`
    outline: none;
    border: none;
    max-width: 77px;
    border-radius: 16px;
    background-color: ${BFMPalette.green600};
  `;
  return (
    <InputContainer>
      <LabelMedium>Reduce up to:</LabelMedium>
      <Input type="number"></Input>
    </InputContainer>
  );
}
