import { BFMPalette } from "@/Theme";
import { BodyText, H4, Header, SubTitle } from "@/Typography";
import Image from "next/image";
import styled from "styled-components";
import NavButton from "../Button/Primary/NavButton";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import { useState } from "react";
interface TransactionDetailsProps<T = {}> {
  selectedRow: T;
  primaryDetail?: string;
  primaryType?: string;
  noteTitle?: string;
  noteContent?: string;
  lastUpdated?: string;
}

export default function TransactionDetails({
  selectedRow,
  primaryDetail = "CR TO 022-170458-*** N32823454***(28MAR24)",
  primaryType = "General Payment",
  noteTitle = "Notes",
  noteContent = "Transaction Notes goes here",
  lastUpdated = "Last updated: 11 Nov 2024",
}: TransactionDetailsProps<any>) {
  const StatsContainer = styled("div")`
    border-radius: 12px;
    border: 1px solid ${BFMPalette.gray100};
    background-color: ${BFMPalette.white25};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px;
  `;
  const ImageContainer = styled("div")`
    width: 40px;
    height: 40px;
    border-radius: 200px;
    padding: 10px;
    background-color: ${BFMPalette.purple100};
  `;
  const InfoContainer = styled("div")`
    display: flex;
    flex-direction: column;
  `;
  const Descriptions = styled("div")`
    display: flex;
    gap: 14px;
  `;
  const Container = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 20px;
  `;
  const DetailsContainer = styled("div")`
    border-radius: 12px;
    border: 1px solid ${BFMPalette.gray200};
    background-color: ${BFMPalette.white25};
    padding: 0px 12px;
  `;
  const RowDetails = styled("div")`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${BFMPalette.gray100};
    padding: 16px 20px 16px 16px;
  `;
  const ValueContainer = styled("div")`
    display: flex;
    gap: 6px;
    align-items: center;
  `;

  const StyledValue = styled.span<{ color?: string; fontWeight?: string }>`
    color: ${({ color }) => color || BFMPalette.black800};
    font-weight: ${({ fontWeight }) => fontWeight || "500"};
  `;
  const FileUploadContainer = styled("div")`
    border-radius: 12px;
    border: 1px solid ${BFMPalette.gray200};
    padding: 16px 24px;
    background-color: ${BFMPalette.white};
  `;
  const FileContent = styled("div")`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
  `;
  const IconContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid ${BFMPalette.gray100};
  `;
  const FileTextContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
  `;
  const getStyledValues = (label: string, values: string[]) => {
    return values.filter(Boolean).map((val, idx) => {
      let styleProps = {};

      if (label === "Account" && idx === 1) {
        styleProps = { color: BFMPalette.black100, fontWeight: "400" };
      } else if (label === "Amount" && idx <= 1) {
        styleProps = { color: BFMPalette.purple375, fontWeight: "600" };
      } else if (label === "Amount (HKD EQV)") {
        styleProps = { color: BFMPalette.red500, fontWeight: "600" };
      }

      return (
        <StyledValue key={idx} {...styleProps}>
          {val}
        </StyledValue>
      );
    });
  };
  const rowDetailsData = [
    { label: "Date", value: [selectedRow.date] },
    { label: "Bank", value: [selectedRow.bank] },
    {
      label: "Account",
      value: [selectedRow.account.type, selectedRow.account.number],
    },
    {
      label: "Amount",
      value: [selectedRow.amount.currency, selectedRow.amount.value],
    },
    { label: "Amount (HKD EQV)", value: [selectedRow.amount.equivalent] },
  ];
  const [tab, setTab] = useState("Details");
  return (
    <Container>
      <StatsContainer>
        <Descriptions>
          <ImageContainer>
            <Image
              src="/images/switch.png"
              alt="switch"
              width={20}
              height={20}
            />
          </ImageContainer>
          <InfoContainer>
            <H4 color={BFMPalette.black800}>{primaryDetail}</H4>
            <BodyText>{primaryType}</BodyText>
          </InfoContainer>
        </Descriptions>
        <>
          <NavButton
            $bgColor={BFMPalette.white}
            $textColor={BFMPalette.purple600}
            $borderColor={BFMPalette.purple300}
            imagePosition="right"
            imageSrc="/images/edit.png">
            Edit
          </NavButton>
        </>
      </StatsContainer>
      <StatsContainer>
        <Descriptions>
          <InfoContainer>
            <BodyText>{noteTitle}</BodyText>
            <H4 color={BFMPalette.black800}>{noteContent}</H4>
            <BodyText>{lastUpdated}</BodyText>
          </InfoContainer>
        </Descriptions>
        <>
          <NavButton
            $bgColor={BFMPalette.white}
            $textColor={BFMPalette.purple600}
            $borderColor={BFMPalette.purple300}
            imagePosition="right"
            imageSrc="/images/edit.png">
            Edit
          </NavButton>
        </>
      </StatsContainer>
      <HorizontalTabs
        tabs={["Details", "Attachments"]}
        tabType="tab"
        onTabChange={setTab}
      />
      {tab === "Details" ? (
        <DetailsContainer>
          {rowDetailsData.map((item, index) => (
            <RowDetails key={index}>
              <SubTitle color={BFMPalette.gray700}>{item.label}</SubTitle>
              <ValueContainer>
                {getStyledValues(item.label, item.value)}
              </ValueContainer>
            </RowDetails>
          ))}
        </DetailsContainer>
      ) : (
        <FileUploadContainer>
          <FileContent>
            <IconContainer>
              <Image
                src="/images/cloud.png"
                alt="file"
                width={20}
                height={20}
              />
            </IconContainer>
            <FileTextContainer>
              <p>Click to upload or drag and drop</p>
              <p>SVG, PNG, JPG, or GIF (max. 800x400px)</p>
            </FileTextContainer>
          </FileContent>
        </FileUploadContainer>
      )}
    </Container>
  );
}
