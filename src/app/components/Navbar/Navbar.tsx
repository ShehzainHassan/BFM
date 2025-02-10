"use client";
import { useState } from "react";
import { BFMPalette } from "@/Theme";
import styled from "styled-components";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: ${BFMPalette.purple1000};
  height: 150px;
  gap: 16px;
  padding: 32px;
`;
const SubContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  padding: 4px;
  background-color: ${BFMPalette.purple950};
`;

const Heading = styled("h3")`
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
  color: #ffffff;
`;
const NavContent = styled("p")<{ $isSelected: boolean }>`
  font-weight: 600;
  line-height: 20px;
  font-size: 14px;
  color: #ffffff;
  border-radius: 6px;
  padding: 8px 12px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? BFMPalette.purple500 : "transparent"};
  cursor: pointer;
`;

interface NavbarProps {
  navItems: string[];
}

export default function Navbar({ navItems }: NavbarProps) {
  const [selected, setSelected] = useState(navItems[0]);

  return (
    <Container>
      <Heading>Welcome Back, Mark</Heading>
      <SubContainer>
        {navItems.map((item) => (
          <NavContent
            key={item}
            $isSelected={selected === item}
            onClick={() => setSelected(item)}>
            {item}
          </NavContent>
        ))}
      </SubContainer>
    </Container>
  );
}
