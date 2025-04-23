import { BFMPalette } from "@/Theme";
import { H3Secondary, H4, H5 } from "@/Typography";
import styled from "styled-components";
import { HKD_EQUIVALANT } from "@/constants";
import Image from "next/image";

const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${BFMPalette.gray200};
  @media (max-width: 768px) {
    padding: 12px 0px;
    margin: 0 12px;
    border-radius: unset;
    border: unset;
    border-bottom: 1px solid ${BFMPalette.gray200};
  }
`;

// const Circle = styled("p")<{ color: string }>`
//   width: 10px;
//   height: 10px;
//   background-color: ${(props) => props.color};
//   border-radius: 50%;
//   margin-top: 5px;
// `;
const ImageContainer = styled("div")`
  width: 40px;
  height: 40px;
`;
const CategoryContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const ValueContainer = styled("div")`
  display: flex;
  gap: 4px;
`;
const LabelContainer = styled("div")`
  display: flex;
  gap: 10px;
`;

type ESGCardProps = {
  title?: string;
  value?: number;
  kg?: number;
  circleColor?: string;
  amount?: number;
};

export default function ESGCard({
  title = "Title",
  value,
  kg = 2,
  // circleColor,
  amount,
}: ESGCardProps) {
  return (
    <Container>
      <CategoryContainer>
        <LabelContainer>
          {/* <Circle color={circleColor ?? BFMPalette.purple600} /> */}
          <ImageContainer>
            <Image
              src={`/images/${title}.png`}
              alt="Category"
              width={40}
              height={40}
            />
          </ImageContainer>
          <CategoryContainer>
            <H3Secondary color={BFMPalette.black400}>{title}</H3Secondary>
            <H5 color={BFMPalette.gray700}>
              {HKD_EQUIVALANT} {amount?.toLocaleString()}
            </H5>
          </CategoryContainer>
        </LabelContainer>
        <H5 color={BFMPalette.gray700}>{value}</H5>
      </CategoryContainer>
      <ValueContainer>
        <H3Secondary color={BFMPalette.black800}>
          {Number(kg).toFixed(2)}
        </H3Secondary>
        <H4 color={BFMPalette.gray700}>kg CO2</H4>
      </ValueContainer>
    </Container>
  );
}
