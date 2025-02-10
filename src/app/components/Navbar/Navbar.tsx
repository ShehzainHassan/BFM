"use client";
import { useState } from "react";
import { BFMPalette } from "@/Theme";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { H1 } from "@/Typography";

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

const NavContent = styled("p")<{ $isSelected: boolean }>`
  font-weight: 600;
  line-height: 20px;
  font-size: 14px;
  color: ${BFMPalette.white};
  border-radius: 6px;
  padding: 8px 12px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? BFMPalette.purple500 : "transparent"};
  cursor: pointer;
`;

interface NavbarProps {
  navItems: { label: string; path: string }[];
}
export default function Navbar({ navItems }: NavbarProps) {
  const pathname = usePathname();

  return (
    <Container>
      <H1>Welcome Back, Mark</H1>
      <SubContainer>
        {navItems.map(({ label, path }) => (
          <Link key={path} href={path} passHref>
            <NavContent $isSelected={pathname === path}>{label}</NavContent>
          </Link>
        ))}
      </SubContainer>
    </Container>
  );
}
