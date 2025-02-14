import styled from "styled-components";
import { BFMPalette } from "@/Theme";

/*          HEADINGS           */
export const H1 = styled.h1<{ color?: string }>`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const Header = styled.h1<{ color?: string }>`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const H2 = styled.h2<{ color?: string }>`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;
export const H3 = styled.h2<{ color?: string }>`
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;
export const H3Primary = styled.h3<{ color?: string }>`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const H3Secondary = styled.h3<{ color?: string }>`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;
export const H4 = styled.h4<{ color?: string }>`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const H5 = styled.h5<{ color?: string }>`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

/*          PARAGRAPHS           */

export const BodyText = styled.p<{ color?: string }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const SmallText = styled.p<{ color?: string }>`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const MediumText = styled.p<{ color?: string; width?: string }>`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
  width: ${({ width }) => (width ? width : "100%")};
`;

export const Description = styled.p<{ color?: string }>`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const SubTitle = styled.p<{ color?: string }>`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const Title = styled.p<{ color?: string }>`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const SmallHeading = styled.h6<{ color?: string }>`
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;
