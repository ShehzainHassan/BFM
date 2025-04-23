import styled from "styled-components";
import { BFMPalette } from "@/Theme";

/*          HEADINGS           */
export const H1 = styled.h1<{
  color?: string;
  $mobileFontWeight?: number;
  $mobileFontSize?: string;
  $mobileLineHeight?: string;
}>`
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};

  @media (max-width: 768px) {
    ${({ $mobileFontWeight }) =>
      $mobileFontWeight !== undefined && `font-weight: ${$mobileFontWeight};`}
    ${({ $mobileFontSize }) =>
      $mobileFontSize && `font-size: ${$mobileFontSize};`}
    ${({ $mobileLineHeight }) =>
      $mobileLineHeight && `line-height: ${$mobileLineHeight};`}
  }
`;

export const Header = styled.h1<{ color?: string }>`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const TextTitle = styled.h2<{ color?: string }>`
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
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
export const SmallH3 = styled.h2<{ color?: string }>`
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
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
export const H4 = styled.h4<{
  color?: string;
  $cursor?: string;
  $hoverColor?: string;
  $hoverUnderline?: boolean;
  $transitionEffect?: string;
}>`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({ color }) => color || BFMPalette.black100};
  cursor: ${({ $cursor }) => $cursor || "default"};
  transition: ${({ $transitionEffect }) =>
    $transitionEffect ||
    "color 0.2s ease-in-out, text-decoration 0.2s ease-in-out"};

  &:hover {
    color: ${({ $hoverColor }) => $hoverColor || ""};
    text-decoration: ${({ $hoverUnderline }) =>
      $hoverUnderline ? "underline" : "none"};
  }
`;

export const SmallH5 = styled.h5<{ color?: string }>`
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const H5 = styled.h5<{ color?: string }>`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const SmallHeading = styled.h6<{ color?: string }>`
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const MediumBoldHeading = styled.h6<{ color?: string }>`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const TableTitle = styled.h1<{
  color?: string;
  $mobileFontWeight?: number;
  $mobileFontSize?: string;
  $mobileLineHeight?: string;
}>`
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};

  @media (max-width: 768px) {
    ${({ $mobileFontWeight }) =>
      $mobileFontWeight !== undefined && `font-weight: ${$mobileFontWeight};`}
    ${({ $mobileFontSize }) =>
      $mobileFontSize && `font-size: ${$mobileFontSize};`}
    ${({ $mobileLineHeight }) =>
      $mobileLineHeight && `line-height: ${$mobileLineHeight};`}
  }
`;

/*          PARAGRAPHS           */

export const BodyText = styled.div<{ color?: string }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
`;

export const SmallText = styled.h1<{
  color?: string;
  $mobileFontWeight?: number;
  $mobileFontSize?: string;
  $mobileLineHeight?: string;
}>`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};

  @media (max-width: 768px) {
    ${({ $mobileFontWeight }) =>
      $mobileFontWeight !== undefined && `font-weight: ${$mobileFontWeight};`}
    ${({ $mobileFontSize }) =>
      $mobileFontSize && `font-size: ${$mobileFontSize};`}
    ${({ $mobileLineHeight }) =>
      $mobileLineHeight && `line-height: ${$mobileLineHeight};`}
  }
`;

export const MediumText = styled.p<{ color?: string; width?: string }>`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};
  width: ${({ width }) => (width ? width : "100%")};
`;
export const MediumSpacedText = styled.p<{ color?: string; width?: string }>`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
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

export const Title = styled.p<{
  color?: string;
  $mobileFontWeight?: number;
  $mobileFontSize?: string;
  $mobileLineHeight?: string;
}>`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ color }) => (color ? color : BFMPalette.black100)};

  @media (max-width: 768px) {
    ${({ $mobileFontWeight }) =>
      $mobileFontWeight !== undefined && `font-weight: ${$mobileFontWeight};`}
    ${({ $mobileFontSize }) =>
      $mobileFontSize && `font-size: ${$mobileFontSize};`}
    ${({ $mobileLineHeight }) =>
      $mobileLineHeight && `line-height: ${$mobileLineHeight};`}
  }
`;
