import { BFMPalette } from "@/Theme";
import { Header } from "@/Typography";
import Image from "next/image";
import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

interface DetailsModalProps {
  headerText?: string;
  modalIsOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  width?: string;
  height?: string;
  position?: "left" | "right" | "middle";
}

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
  height = "calc(100vh - 40px)",
  position = "middle",
}: DetailsModalProps) {
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
        },
        content: {
          position: "fixed",
          padding: "0px",
          width,
          height,
          backgroundColor: BFMPalette.white25,
          borderRadius: "12px",
          ...modalPositionStyles[position],
        },
      }}>
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
    </Modal>
  );
}
