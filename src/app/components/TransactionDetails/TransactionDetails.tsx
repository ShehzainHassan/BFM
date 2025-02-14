import { BFMPalette } from "@/Theme";
import {
  BodyText,
  H3Secondary,
  H4,
  Header,
  SmallHeading,
  SmallText,
  SubTitle,
} from "@/Typography";
import Image from "next/image";
import styled from "styled-components";
import NavButton from "../Button/Primary/NavButton";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import { useRef, useState } from "react";
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
    background-color: ${BFMPalette.white};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px;
  `;
  const ImageContainer = styled("div")`
    position: relative;
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
  const SelectedFilesContainer = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 12px;
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
    width: 100%;
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
  const FileTypeWrap = styled.div<{ $fileExtension?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    padding: 2px 3px;
    border-radius: 2px;
    position: absolute;
    left: 30px;
    transform: translateY(18px);
    background-color: ${({ $fileExtension }) => {
      switch ($fileExtension) {
        case "DOC":
        case "DOCX":
          return BFMPalette.blue500;
        case "XLSX":
          return BFMPalette.green700;
        case "PDF":
        default:
          return BFMPalette.red600;
      }
    }};
  `;

  const NotesContainer = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 6px;
  `;
  const Button = styled("div")`
    cursor: pointer;
  `;
  const ButtonContainer = styled("button")`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    background: none;
    outline: none;
    border: none;
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formatFileSize = (size: number) => {
    if (size >= 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + " MB";
    } else if (size >= 1024) {
      return (size / 1024).toFixed(2) + " KB";
    } else {
      return size + " bytes";
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).map((file) => {
      const fileNameParts = file.name.split(".");
      const extension =
        fileNameParts.length > 1 ? fileNameParts.pop()!.toUpperCase() : "";
      const name = fileNameParts.join(".");
      return {
        name,
        extension,
        size: formatFileSize(file.size),
      };
    });

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFiles(event.target.files);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFiles(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const [selectedTab, setSelectedTab] = useState("Details");
  const [selectedFiles, setSelectedFiles] = useState<
    {
      name: string;
      size: string;
      extension: string;
    }[]
  >([]);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isAddingNotes, setIsAddingNotes] = useState(false);

  const handleSaveNote = () => {
    setIsEditingNotes(false);
    setIsAddingNotes(false);
  };
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
      {!isEditingNotes ? (
        <>
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
              imageSrc="/images/edit.png"
              onClick={() => setIsEditingNotes(true)}>
              Edit
            </NavButton>
          </>
        </>
      ) : (
        <FileUploadContainer>
          {!isAddingNotes ? (
            <FileContent>
              <IconContainer>
                <Image
                  src="/images/edit.png"
                  alt="file"
                  width={20}
                  height={20}
                />
              </IconContainer>

              <FileTextContainer>
                <H4 color={BFMPalette.black800}>
                  Add comments or notes to your transactions
                </H4>

                <NavButton
                  $borderColor={BFMPalette.gray200}
                  $bgColor={BFMPalette.white}
                  $textColor={BFMPalette.black800}
                  onClick={() => setIsAddingNotes(true)}>
                  Add Notes
                </NavButton>
              </FileTextContainer>
            </FileContent>
          ) : (
            <NotesContainer>
              Add comments or notes to your transactions
              <textarea
                rows={5}
                placeholder="Add details about this transaction..."
                style={{
                  width: "100%",
                  backgroundColor: BFMPalette.white,
                  borderRadius: "8px",
                  border: `1px solid ${BFMPalette.gray200}`,
                  padding: "12px 14px",
                  color: BFMPalette.black400,
                  outline: "none",
                  fontFamily: "Inter, Arial",
                }}></textarea>
              <ButtonContainer>
                <NavButton
                  $bgColor={BFMPalette.white}
                  $textColor={BFMPalette.black400}
                  $borderColor={BFMPalette.gray200}
                  onClick={handleSaveNote}>
                  Cancel
                </NavButton>
                <NavButton
                  $bgColor={BFMPalette.purple500}
                  $textColor={BFMPalette.white}
                  onClick={handleSaveNote}>
                  Save Notes
                </NavButton>
              </ButtonContainer>
            </NotesContainer>
          )}
        </FileUploadContainer>
      )}
      <HorizontalTabs
        tabs={["Details", "Attachments"]}
        tabType="tab"
        onTabChange={setSelectedTab}
      />
      {selectedTab === "Details" ? (
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
        <>
          <FileUploadContainer onDragOver={handleDragOver} onDrop={handleDrop}>
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
                <ButtonContainer>
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <H3Secondary color={BFMPalette.purple600}>
                      Click to upload
                    </H3Secondary>
                  </Button>
                  <BodyText>or drag and drop</BodyText>
                </ButtonContainer>

                <SmallText>SVG, PNG, JPG, or GIF (max. 800x400px)</SmallText>
              </FileTextContainer>
            </FileContent>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </FileUploadContainer>
          {selectedFiles.length > 0 && (
            <SelectedFilesContainer>
              {selectedFiles.map((file, index) => (
                <StatsContainer key={index}>
                  <Descriptions>
                    <Image
                      src="/images/file.png"
                      alt="file"
                      width={32}
                      height={40}
                    />
                    <FileTypeWrap $fileExtension={file.extension}>
                      <SmallHeading color={BFMPalette.white}>
                        {file.extension}
                      </SmallHeading>
                    </FileTypeWrap>
                    <InfoContainer>
                      <H4 color={BFMPalette.black400}>{file.name}</H4>
                      <BodyText>{file.size}</BodyText>
                    </InfoContainer>
                  </Descriptions>
                  <>
                    <Image
                      src="/images/trash.png"
                      alt="delete"
                      width={16}
                      height={16}
                      style={{ cursor: "pointer" }}
                      onClick={() => removeFile(index)}
                    />
                  </>
                </StatsContainer>
              ))}
            </SelectedFilesContainer>
          )}
        </>
      )}
    </Container>
  );
}
