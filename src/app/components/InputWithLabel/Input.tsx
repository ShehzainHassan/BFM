import { BFMPalette } from "@/Theme";
import useTranslation from "@/translations";
import { H4 } from "@/Typography";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StyledInput = styled.input`
  border: 1px solid ${BFMPalette.gray200};
  padding: 8px 12px;
  background-color: ${BFMPalette.white};
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  color: ${BFMPalette.black800};
  font-family: "Inter", Arial, Helvetica, sans-serif;

  &::placeholder {
    color: ${BFMPalette.gray700};
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

interface InputWithLabelProps {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
}

export default function InputWithLabel({
  label = "Label",
  placeholder = "Placeholder",
  isRequired = true,
}: InputWithLabelProps) {
  const [text, setText] = useState("");

  return (
    <Container>
      <LabelWrapper>
        <H4>{label}</H4>
        {isRequired && <H4 color={BFMPalette.purple500}>*</H4>}
      </LabelWrapper>
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Container>
  );
}
