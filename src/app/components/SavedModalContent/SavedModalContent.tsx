import { BFMPalette } from "@/Theme";
import { MediumSpacedText, TextTitle } from "@/Typography";
import { getInvoiceFromLocalStorage } from "@/utils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import { useRef } from "react";
import styled from "styled-components";
import NavButton from "../Button/Primary/NavButton";
import InvoicePDF from "../Invoices/InvoicePDF/InvoicePDF";

const Content = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${BFMPalette.green50};
  width: 48px;
  height: 48px;
  border-radius: 28px;
  border: 8px solid ${BFMPalette.green0};
`;
const TextContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const ContentContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 24px 0px 24px;
`;
const BtnContainer = styled("div")`
  padding: 24px 24px 0 24px;
  width: 100%;
  & > button {
    width: 100%;
  }
`;
const HiddenPDFContainer = styled.div`
  position: absolute;
  top: -9999px;
  left: -9999px;
  width: 794px;
`;
interface SavedModalContentProps {
  invoiceNo?: string;
}
export default function SavedModalContent({
  invoiceNo,
}: SavedModalContentProps) {
  const storedInvoice = getInvoiceFromLocalStorage(invoiceNo ?? "");
  const pdfRef = useRef<HTMLDivElement>(null);
  const handleDownloadInvoice = async () => {
    const element = pdfRef.current;
    if (!element) return;

    setTimeout(async () => {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    }, 100);
  };

  return (
    <>
      <ContentContainer>
        <Content>
          <Image src="/images/saved.png" alt="success" width={24} height={24} />
        </Content>
        <TextContainer>
          <TextTitle color={BFMPalette.black800}>
            Your invoice is ready to view or download
          </TextTitle>
          <MediumSpacedText>
            The invoice has been successfully created and is now ready for your
            review. You can view the details or download a copy for your
            records.
          </MediumSpacedText>
        </TextContainer>
      </ContentContainer>
      <BtnContainer>
        <NavButton
          imageSrc="/images/download.png"
          imagePosition="right"
          $textColor={BFMPalette.white}
          onClick={handleDownloadInvoice}>
          Download Invoice (PDF)
        </NavButton>
      </BtnContainer>

      <HiddenPDFContainer ref={pdfRef}>
        <InvoicePDF invoice={storedInvoice} />
      </HiddenPDFContainer>
    </>
  );
}
