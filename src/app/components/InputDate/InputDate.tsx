import { BFMPalette } from "@/Theme";
import { H4 } from "@/Typography";
import { CalendarOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const InputWrapper = styled.div<{ $isError: boolean }>`
  display: flex;
  justify-content: space-between;
  border: 1px solid
    ${(props) => (props.$isError ? BFMPalette.red600 : BFMPalette.gray200)};
  padding: 8px 12px;
  background-color: ${BFMPalette.white};
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  transition: border 0.2s ease-in-out;
`;

const StyledInput = styled.input`
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

type InputDateProps = {
  label?: string;
  isRequired?: boolean;
  dueDate: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};
export default function InputDate({
  label = "Select Date",
  dueDate,
  isRequired = true,
  onChange,
  onBlur,
}: InputDateProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTouched, setIsTouched] = useState(false);

  const isError = isRequired && isTouched && !dueDate;

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
  };
  return (
    <Container>
      <LabelWrapper>
        <H4>{label}</H4>
        {isRequired && <H4 color={BFMPalette.purple500}>*</H4>}
      </LabelWrapper>
      <InputWrapper onClick={handleIconClick} $isError={isError}>
        <StyledInput
          ref={inputRef}
          type="date"
          value={dueDate}
          onChange={onChange}
          onBlur={(e) => {
            handleBlur();
            onBlur?.(e);
          }}
        />
        <CalendarIcon />
      </InputWrapper>
    </Container>
  );
}
