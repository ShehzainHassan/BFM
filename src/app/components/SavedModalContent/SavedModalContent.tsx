import { BFMPalette } from "@/Theme";
import { MediumSpacedText, TextTitle } from "@/Typography";
import Image from "next/image";
import styled from "styled-components";
import NavButton from "../Button/Primary/NavButton";

const Content = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${BFMPalette.green50};
  width: 48px;
  height: 48px;
  border-radius: 28px;
  border: 8px solid ${BFMPalette.green0};
`;
const TextContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const ContentContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 24px 0px 24px;
`;
const BtnContainer = styled("div")`
  padding: 24px 24px 0 24px;
  width: 100%;
  & > button {
    width: 100%;
  }
`;
export default function SavedModalContent() {
  return (
    <>
      <ContentContainer>
        <Content>
          <Image src="/images/saved.png" alt="success" width={24} height={24} />
        </Content>
        <TextContainer>
          <TextTitle color={BFMPalette.black800}>
            Your invoice is ready to view or download
          </TextTitle>
          <MediumSpacedText>
            The invoice has been successfully created and is now ready for your
            review. You can view the details or download a copy for your
            records.
          </MediumSpacedText>
        </TextContainer>
      </ContentContainer>
      <BtnContainer>
        <NavButton
          imageSrc="/images/download.png"
          imagePosition="right"
          $textColor={BFMPalette.white}>
          Download Invoice (PDF)
        </NavButton>
      </BtnContainer>
    </>
  );
}
