import { BFMPalette } from "@/Theme";
import { Header } from "@/Typography";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import styled, { keyframes } from "styled-components";
import { DetailsModalProps } from "../../../../Interfaces";

const ContentContainer = styled.div<{ position: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: ${BFMPalette.white25};
  border-bottom: 1px solid ${BFMPalette.gray100};
`;

const slideInFromRight = keyframes`
  from { right: -600px; opacity: 0; }
  to { right: 20px; opacity: 1; }
`;

const slideOutToRight = keyframes`
  from { right: 20px; opacity: 1; }
  to { right: -600px; opacity: 0; }
`;

const slideInFromTop = keyframes`
  from { top: 0; opacity: 0; }
  to { top: 50%; opacity: 1; }
`;

const slideOutToTop = keyframes`
  from { top: 50%; opacity: 1; }
  to { top: 0px; opacity: 0; }
`;

const AnimatedModalContent = styled.div<{
  $direction: "right" | "top";
  $closing: boolean;
}>`
  position: fixed;
  padding: 0px;
  background-color: ${BFMPalette.white25};
  border-radius: 12px;
  border: none;
  overflow: hidden;
  z-index: 10;
  outline: none;
  animation: ${({ $direction, $closing }) => {
      if ($direction === "top") {
        return $closing ? slideOutToTop : slideInFromTop;
      } else {
        return $closing ? slideOutToRight : slideInFromRight;
      }
    }}
    0.3s ease-out forwards;
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
  const [internalOpen, setInternalOpen] = useState(modalIsOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (modalIsOpen) {
      setInternalOpen(true);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else if (internalOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setInternalOpen(false);
        setIsClosing(false);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
    };
  }, [modalIsOpen]);

  const modalPositionStyles = {
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

  const slideDirection = $position === "right" ? "right" : "top";

  return (
    <Modal
      isOpen={internalOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 20,
        },
      }}
      contentElement={(props, children) => (
        <AnimatedModalContent
          {...props}
          $direction={slideDirection}
          $closing={isClosing}
          style={{
            width,
            height,
            marginTop,
            ...modalPositionStyles[$position],
          }}>
          {children}
        </AnimatedModalContent>
      )}>
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
