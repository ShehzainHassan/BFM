"use client";
import { CURRENCY } from "@/constants";
import { BFMPalette } from "@/Theme";
import { H4, MediumBoldHeading } from "@/Typography";
import { formatCurrency } from "@/utils";
import styled from "styled-components";

const BadgeGroup = styled("div")`
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 16px;
  padding: 4px 10px 4px 4px;
  border: 1px solid ${BFMPalette.purple200};
  background-color: ${BFMPalette.purple250};
`;
const Badge = styled("div")`
  border-radius: 16px;
  border: 1px solid ${BFMPalette.purple100};
  background-color: ${BFMPalette.white};
  padding: 2px 10px;
`;
const Content = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
type BadgeGroupProps = {
  title?: string;
  value?: number;
};
export default function RenderBadgeGroup({
  title = "Title",
  value = 0,
}: BadgeGroupProps) {
  return (
    <BadgeGroup>
      <Badge>
        <H4 color={BFMPalette.purple900}>{title}</H4>
      </Badge>
      <Content>
        <MediumBoldHeading color={BFMPalette.purple600}>
          {formatCurrency(`${CURRENCY}${value}`, 2)}
        </MediumBoldHeading>
      </Content>
    </BadgeGroup>
  );
}
