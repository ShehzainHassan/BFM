import { BFMPalette } from "@/Theme";
import { H3, H5 } from "@/Typography";
import styled from "styled-components";
import { AddressProps } from "../../../../Interfaces";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

export default function Address({ title, company, address }: AddressProps) {
  return (
    <Container>
      <H5 color={BFMPalette.gray700}>{title}</H5>
      <H3 color={BFMPalette.purple900}>{company}</H3>
      <H5 color={BFMPalette.gray700}>{address}</H5>
    </Container>
  );
}
