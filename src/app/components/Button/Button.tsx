import styled from "styled-components";

export default function Button() {
  interface ButtonProps {
    text: string;
    icon?: string;
    color?: string;
    backgroundColor?: string;
    onClick?: () => void;
    disabled?: boolean;
  }
  const Button = styled("button")<ButtonProps>`
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 8px;
  `;
  return <button>Schedule Event</button>;
}
