import { HKD_EQUIVALANT } from "@/constants";
import { BFMPalette } from "@/Theme";
import {
  BodyText,
  H3Secondary,
  H4,
  SmallHeading,
  SmallText,
  SubTitle,
} from "@/Typography";
import {
  formatCurrency,
  formatDate,
  formatLastUpdated,
  formatString,
  getFileExtension,
} from "@/utils";
import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Attachment,
  Note,
  TransactionDetailsProps,
} from "../../../../Interfaces";
import NavButton from "../Button/Primary/NavButton";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import { useData } from "@/DataContext";

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
  @media (max-width: 768px) {
    gap: 5px;
    flex-direction: column;
    align-items: unset;
    justify-content: unset;
  }
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
const ButtonContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  background: none;
  outline: none;
  border: none;
`;
export default function TransactionDetails({
  selectedRow,
  noteTitle = "Notes",
  selected = "Details",
}: TransactionDetailsProps<{
  id: string;
  description: { title: string; subtitle: string };
  date: string;
  bank: string;
  account: string;
  amount: { currency: string; value: number; HKDEquivalent: number };
}>) {
  const { attachments, setAttachments, notes, setNotes } = useData();
  const [selectedTab, setSelectedTab] = useState(selected);
  const [selectedTransactionAttachments, setSelectedTransactionAttachments] =
    useState<Attachment[]>([]);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isAddingNotes, setIsAddingNotes] = useState(false);
  const [noteDetails, setNoteDetails] = useState<Note>();
  const [editText, setEditText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const getNoteDetails = () => {
    const selectedNote = notes.find(
      (note) => note.transactionId === selectedRow.id
    );
    if (!selectedNote) {
      setIsEditingNotes(true);
      setIsAddingNotes(false);
    } else {
      setEditText(selectedNote.note);
    }
    setNoteDetails(selectedNote);
  };
  const getAttachments = (currentAttachments = attachments) => {
    const selectedAttachments = currentAttachments.filter(
      (attachment) => attachment.txnId === selectedRow.id
    );
    setSelectedTransactionAttachments(selectedAttachments);
  };
  useEffect(() => {
    getNoteDetails();
    getAttachments();
  }, [selectedRow]);

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
    { label: "Date", value: [formatDate(selectedRow.date)] },
    { label: "Bank", value: [selectedRow.bank] },
    {
      label: "Account",
      value: [selectedRow.account],
    },
    {
      label: "Amount",
      value: [
        formatCurrency(
          `${selectedRow.amount.currency}${selectedRow.amount.value}`,
          2
        ),
      ],
    },
    {
      label: "Amount (HKD EQV)",
      value: [
        formatCurrency(
          `${HKD_EQUIVALANT}${selectedRow.amount.HKDEquivalent}`,
          2
        ),
      ],
    },
  ];
  const formatFileSize = (fileContent: string) => {
    const sizeInBytes =
      4 * Math.ceil(fileContent.length / 3) * 0.5624896334383812;
    const sizeInKb = sizeInBytes / 1024;
    return `${sizeInKb.toFixed(2)} KB`;
  };

  const uploadFile = async (file: File) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "data",
      new Blob([JSON.stringify(selectedRow.id)], { type: "application/json" })
    );
    try {
      const response = await axios.post(
        "https://api.dev.pca.planto.io/v1/businessFinancialManagement/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newAttachment: Attachment = {
        id: response.data.data.id,
        txnId: response.data.data.txnId,
        file: response.data.data.content,
        fileName: response.data.data.fileName,
        mimeType: response.data.data.mimeType,
        createdDate: response.data.data.createdDate,
        lastModifiedDate: response.data.data.lastModifiedDate,
      };

      const updatedAttachments = [...attachments];
      updatedAttachments.push(newAttachment);
      setAttachments(updatedAttachments);
      getAttachments(updatedAttachments);
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) uploadFile(file);
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };
  const removeAttachment = async (index: number) => {
    const updatedAttachments = attachments?.filter(
      (attachment) => attachment.id != index
    );
    try {
      await axios
        .delete(
          `https://api.dev.pca.planto.io/v1/businessFinancialManagement/delete-attachment/${index}`
        )
        .then(() => setAttachments(updatedAttachments))
        .then(() => getAttachments(updatedAttachments));
    } catch (err) {
      console.error("Error deleting attachment ", err);
    }
  };
  const openFile = (attachment: Attachment) => {
    if (!attachment?.file || !attachment?.mimeType) return;

    const byteCharacters = atob(attachment.file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const fileBlob = new Blob([byteArray], { type: attachment.mimeType });

    const url = URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = attachment.fileName || "download_file";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleEditNote = () => {
    setIsEditingNotes(true);
    setIsAddingNotes(true);
  };
  const handleCancelNote = () => {
    if (!noteDetails) {
      setIsEditingNotes(true);
      setIsAddingNotes(false);
    } else {
      setIsEditingNotes(false);
      setEditText("");
    }
  };
  const handleSaveNote = async () => {
    try {
      const response = await axios.post(
        "https://api.dev.pca.planto.io/v1/businessFinancialManagement/add-note",
        {
          transactionId: selectedRow.id,
          note: editText,
        }
      );
      const updatedNote: Note = {
        note: response.data.data.note,
        transactionId: response.data.data.transactionId,
        createdDate: response.data.data.createdDate,
        lastModifiedDate: response.data.data.lastModifiedDate,
      };
      setNoteDetails(updatedNote);
      const allNotes = [...notes];
      const filteredNotes = allNotes.filter(
        (note) => note.transactionId !== updatedNote.transactionId
      );
      filteredNotes.push(updatedNote);
      setNotes(filteredNotes);
      setIsEditingNotes(false);
      setIsAddingNotes(false);
    } catch (err) {
      console.error("Error saving note", err);
    }
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
            <H4 color={BFMPalette.black800}>{selectedRow.description.title}</H4>
            <BodyText>
              {formatString(selectedRow.description.subtitle, true)}
            </BodyText>
          </InfoContainer>
        </Descriptions>
        {/* <>
          <NavButton
            $bgColor={BFMPalette.white}
            $textColor={BFMPalette.purple600}
            $borderColor={BFMPalette.purple300}
            imagePosition="right"
            imageSrc="/images/edit.png">
            Edit
          </NavButton>
        </> */}
      </StatsContainer>
      {!isEditingNotes ? (
        <StatsContainer>
          <Descriptions>
            <InfoContainer>
              <BodyText>{noteTitle}</BodyText>
              <H4 color={BFMPalette.black800}>{noteDetails?.note}</H4>
              {noteDetails?.lastModifiedDate && (
                <BodyText>
                  {formatLastUpdated(noteDetails.lastModifiedDate)}
                </BodyText>
              )}
            </InfoContainer>
          </Descriptions>
          <>
            <NavButton
              $bgColor={BFMPalette.white}
              $textColor={BFMPalette.purple600}
              $borderColor={BFMPalette.purple300}
              imagePosition="right"
              imageSrc="/images/edit.png"
              onClick={handleEditNote}>
              Edit
            </NavButton>
          </>
        </StatsContainer>
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
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
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
                  onClick={handleCancelNote}>
                  Cancel
                </NavButton>
                <NavButton
                  $bgColor={BFMPalette.purple500}
                  $textColor={BFMPalette.white}
                  $isDisabled={editText.trim() === ""}
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
        selectedTab={selectedTab}
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
              onChange={handleFileChange}
            />
          </FileUploadContainer>
          {selectedTransactionAttachments &&
            selectedTransactionAttachments.length > 0 && (
              <SelectedFilesContainer>
                {selectedTransactionAttachments.map((attachment, index) => (
                  <StatsContainer key={index}>
                    <Descriptions>
                      <Image
                        src="/images/file.png"
                        alt="file"
                        width={32}
                        height={40}
                      />
                      <FileTypeWrap
                        $fileExtension={getFileExtension(attachment.fileName)}>
                        <SmallHeading color={BFMPalette.white}>
                          {getFileExtension(attachment.fileName)}
                        </SmallHeading>
                      </FileTypeWrap>
                      <InfoContainer>
                        <H4
                          $cursor="pointer"
                          $hoverColor={BFMPalette.purple375}
                          $hoverUnderline={true}
                          $transitionEffect="color 0.3s ease-in out"
                          color={BFMPalette.black400}
                          onClick={() => openFile(attachment)}>
                          {attachment.fileName}
                        </H4>
                        <BodyText>{formatFileSize(attachment.file)}</BodyText>
                      </InfoContainer>
                    </Descriptions>
                    <>
                      <Image
                        src="/images/trash.png"
                        alt="delete"
                        width={16}
                        height={16}
                        style={{ cursor: "pointer" }}
                        onClick={() => removeAttachment(attachment.id)}
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
