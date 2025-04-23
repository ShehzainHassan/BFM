import { BFMPalette } from "@/Theme";
import { H5 } from "@/Typography";
import styled from "styled-components";
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
type NotesProps = {
  title: string;
  value: string;
};
export default function Notes({ title, value }: NotesProps) {
  return (
    <Container>
      <H5>{title}</H5>
      <H5 color={BFMPalette.black800}>{value}</H5>
    </Container>
  );
}
