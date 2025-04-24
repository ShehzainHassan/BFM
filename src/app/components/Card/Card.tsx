import { BFMPalette } from "@/Theme";
import { Description, H3Primary } from "@/Typography";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import ESGModal from "../Modal/ESGModal/ESGModal";
import { useData } from "@/DataContext";
import { ESGNotification } from "../../../Interfaces/Interfaces";

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
type CardProps = {
  image: string;
  title: string;
  description?: string;
  expandable?: boolean;
  children?: React.ReactNode;
};

export default function Card({
  image,
  title,
  description,
  expandable = false,
  children,
}: CardProps) {
  const [showModal, setShowModal] = useState(false);
  const { notifications, selectedESGNotification, setSelectedESGNotification } =
    useData();

  const handleExpand = () => {
    const esgNotifs = notifications?.esgNotifications;
    const selectedNotif: ESGNotification | null = esgNotifs?.find(
      (notification) => notification.title === title
    ) as ESGNotification;
    setSelectedESGNotification(selectedNotif);
    setShowModal(true);
  };
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
            onClick={handleExpand}
          />
        )}
      </Container>

      {children}
      {showModal && (
        <ESGModal
          closeModal={() => setShowModal(false)}
          notification={selectedESGNotification}
        />
      )}
    </MainContainer>
  );
}
