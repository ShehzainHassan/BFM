import { BFMPalette } from "@/Theme";
import { Description, H3Primary } from "@/Typography";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { CardProps } from "../../../../Interfaces";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 14px;
  border: 1px solid ${BFMPalette.purple300};
  border-radius: 12px;
  background: linear-gradient(
    to bottom,
    ${BFMPalette.white},
    ${BFMPalette.white50}
  );
`;

const SubContainer1 = styled("div")`
  display: flex;
  gap: 14px;
`;

const SubContainer2 = styled("div")`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled("button")`
  color: ${BFMPalette.blue600};
  background-color: ${BFMPalette.white40};
  border: 1px solid ${BFMPalette.blue100};
  padding: 2px 6px 2px 8px;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export default function Card({
  image,
  title,
  description,
  children,
}: CardProps) {
  return (
    <Container>
      <SubContainer1>
        <Image src={image} alt={title} width={45} height={45} />
        <SubContainer2>
          <H3Primary color={BFMPalette.black800}>{title}</H3Primary>
          <Description>{description}</Description>
        </SubContainer2>
      </SubContainer1>
      {children}
    </Container>
  );
}
