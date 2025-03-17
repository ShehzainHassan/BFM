import { BFMPalette } from "@/Theme";
import { H4 } from "@/Typography";
import { useState, useRef } from "react";
import styled from "styled-components";
import { CalendarOutlined } from "@ant-design/icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${BFMPalette.gray200};
  padding: 8px 12px;
  background-color: ${BFMPalette.white};
  border-radius: 8px;
  position: relative;
  cursor: pointer;
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: ${BFMPalette.black800};
  font-family: "Inter", Arial, Helvetica, sans-serif;
  background: transparent;
  cursor: pointer;

  &::placeholder {
    color: ${BFMPalette.gray700};
  }

  &::-webkit-calendar-picker-indicator {
    display: none;
  }
`;

const CalendarIcon = styled(CalendarOutlined)`
  font-size: 18px;
  color: ${BFMPalette.black800};
  cursor: pointer;
`;

const LabelWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

interface InputDateProps {
  label?: string;
  isRequired?: boolean;
}

export default function InputDate({
  label = "Select Date",
  isRequired = true,
}: InputDateProps) {
  const [date, setDate] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <Container>
      <LabelWrapper>
        <H4>{label}</H4>
        {isRequired && <H4 color={BFMPalette.purple500}>*</H4>}
      </LabelWrapper>
      <InputWrapper onClick={handleIconClick}>
        <StyledInput
          ref={inputRef}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <CalendarIcon />
      </InputWrapper>
    </Container>
  );
}
