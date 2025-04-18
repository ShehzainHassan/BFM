import { BFMPalette } from "@/Theme";
import { Description, H3Primary } from "@/Typography";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { CardProps } from "../../../../Interfaces";
import ESGModal from "../Modal/ESGModal/ESGModal";

const MainContainer = styled("div")`
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
  @media (max-width: 768px) {
    min-width: 311px;
  }
`;
const Container = styled("div")`
  display: flex;
  justify-content: space-between;
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
const ImageContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  max-width: 45px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${BFMPalette.purple200};
  gap: 14px;
`;
export default function Card({
  image,
  title,
  description,
  expandable = false,
  children,
}: CardProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <MainContainer>
      <Container>
        <SubContainer1>
          <ImageContainer>
            <Image src={image} alt={title} width={20} height={20} />
          </ImageContainer>
          <SubContainer2>
            <H3Primary color={BFMPalette.black800}>{title}</H3Primary>
            <Description>{description}</Description>
          </SubContainer2>
        </SubContainer1>
        {expandable && (
          <Image
            src="/images/chevron-right.png"
            alt="next"
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(true)}
          />
        )}
      </Container>

      {children}
      {showModal && <ESGModal />}
    </MainContainer>
  );
}
