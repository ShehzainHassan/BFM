import { BFMPalette } from "@/Theme";
import { Header } from "@/Typography";
import Image from "next/image";
import React, { useEffect } from "react";
import Modal from "react-modal";
import styled, { css, keyframes } from "styled-components";
import { DetailsModalProps } from "../../../../Interfaces";

const slideFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideFromBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const getAnimation = (position: string) => {
  switch (position) {
    case "right":
      return slideFromRight;
    case "left":
      return slideFromLeft;
    case "middle":
      return slideFromBottom;
    default:
      return slideFromBottom;
  }
};

const ContentContainer = styled.div<{ position: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${({ position }) =>
    css`
      ${getAnimation(position)} 0.4s ease-out
    `};
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: ${BFMPalette.white25};
  border-bottom: 1px solid ${BFMPalette.gray100};
`;

export default function DetailsModal({
  headerText = "Modal Header",
  modalIsOpen,
  closeModal,
  children,
  width = "600px",
  height = "100vh",
  marginTop = "0px",
  $position = "middle",
}: DetailsModalProps) {
  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalIsOpen]);

  const modalPositionStyles = {
    left: {
      left: "20px",
      right: "auto",
      top: "20px",
      bottom: "20px",
    },
    right: {
      left: "auto",
      right: "20px",
      top: "20px",
      bottom: "20px",
    },
    middle: {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      bottom: "auto",
      right: "auto",
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 20,
        },
        content: {
          position: "fixed",
          padding: "0px",
          width,
          height,
          marginTop,
          backgroundColor: BFMPalette.white25,
          borderRadius: "12px",
          border: "none",
          overflow: "hidden",
          ...modalPositionStyles[$position],
        },
      }}>
      <ContentContainer position={$position}>
        <HeaderContainer>
          <Header color={BFMPalette.black800}>{headerText}</Header>
          <Image
            src="/images/close.png"
            alt="close"
            width={20}
            height={20}
            onClick={closeModal}
            style={{ cursor: "pointer" }}
          />
        </HeaderContainer>
        {children}
      </ContentContainer>
    </Modal>
  );
}
