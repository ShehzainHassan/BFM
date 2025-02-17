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
}

export default function DetailsModal<T>({
  headerText = "Modal Header",
  modalIsOpen,
  closeModal,
  children,
}: DetailsModalProps) {
  const HeaderContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    background-color: ${BFMPalette.white25};
    border-bottom: 1px solid ${BFMPalette.gray100};
  `;
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        content: {
          position: "fixed",
          top: "20px",
          bottom: "20px",
          right: "20px",
          left: "auto",
          padding: "0px",
          width: "600px",
          height: "calc(100vh - 40px)",
          backgroundColor: BFMPalette.white25,
          borderRadius: "12px",
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
