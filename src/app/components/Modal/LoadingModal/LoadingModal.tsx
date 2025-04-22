import { BFMPalette } from "@/Theme";
import { H1, MediumText } from "@/Typography";
import styled from "styled-components";
import Spinner from "../../LoadingSpinner/Spinner";
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  width: 100%;
  height: auto;
  background-color: ${BFMPalette.white};
  border-radius: 16px;
  gap: 12px;
  padding: 40px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;
const TextContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;
export default function LoadingModal() {
  return (
    <Container>
      <Spinner />
      <TextContainer>
        <H1 color={BFMPalette.black800}>Processing</H1>
        <MediumText width="auto">Your reports are being generated.</MediumText>
      </TextContainer>
    </Container>
  );
}
