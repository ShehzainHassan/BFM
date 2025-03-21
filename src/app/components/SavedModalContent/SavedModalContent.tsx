import { fromAddress, toAddress } from "@/constants";
import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import { MediumSpacedText, TextTitle } from "@/Typography";
import { formatCurrency, formatDate, getFirstDayOfMonth } from "@/utils";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Image from "next/image";
import styled from "styled-components";
import NavButton from "../Button/Primary/NavButton";

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
export default function SavedModalContent() {
  const {
    companyAddress,
    invoiceNumber,
    invoiceDetails,
    dueDate,
    items,
    bankDetails,
    subTotal,
    discount,
    finalTotal,
  } = useData();
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 15;

    doc.setFontSize(14);
    doc.setTextColor(BFMPalette.black800);
    doc.text("Invoice", 105, y, { align: "center" });
    y += 15;

    const labelStyle = () => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(BFMPalette.black100);
    };

    const valueStyle = () => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(BFMPalette.black800);
    };

    labelStyle();
    doc.text("Invoice number:", 20, y);
    valueStyle();
    doc.text(invoiceNumber, 52, y);
    y += 15;

    labelStyle();
    doc.text("From:", 20, y);
    doc.text("To:", 130, y);
    y += 5;

    valueStyle();
    doc.text(fromAddress.name, 20, y);
    doc.text(fromAddress.address, 20, y + 5);
    doc.text(companyAddress, 130, y);
    doc.text(toAddress, 130, y + 5);
    y += 15;

    labelStyle();
    doc.text("Invoice date:", 20, y);
    doc.text("Invoice due date:", 130, y);
    y += 5;

    valueStyle();
    doc.text(formatDate(getFirstDayOfMonth(dueDate)), 20, y);
    doc.text(formatDate(dueDate), 130, y);
    y += 15;

    labelStyle();
    doc.text("Invoice Detail", 20, y);
    y += 5;
    valueStyle();
    doc.text(invoiceDetails, 20, y);
    y += 10;

    const tableData = items.map((item) => [
      item.description,
      item.qty,
      formatCurrency(`${item.currency} ${item.price}`, 2),
    ]);
    autoTable(doc, {
      startY: y,
      head: [["DESCRIPTIONS", "QUANTITY", "AMOUNT"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 3, textColor: BFMPalette.black800 },
      headStyles: {
        fillColor: BFMPalette.gray100,
        textColor: BFMPalette.black800,
        fontStyle: "bold",
      },
      columnStyles: { 2: { halign: "right" } },
      margin: { left: 15, right: 15 },
    });
    let finalY = (doc as any).lastAutoTable.finalY;

    autoTable(doc, {
      startY: finalY,
      body: [
        ["Subtotal", subTotal],
        ["Discount", discount],
        ["Amount due", finalTotal],
      ],
      theme: "plain",
      styles: {
        fontSize: 10,
        textColor: BFMPalette.black800,
        cellPadding: 3,
      },
      bodyStyles: {
        lineWidth: 0.5,
        lineColor: BFMPalette.gray200,
        fillColor: BFMPalette.gray100,
      },
      columnStyles: {
        0: { fontStyle: "bold", textColor: BFMPalette.black100 },
        1: { halign: "right" },
      },
      margin: { left: 15, right: 15 },
    });
    finalY = (doc as any).lastAutoTable.finalY + 20;
    autoTable(doc, {
      startY: finalY,
      body: [
        ["Bank Name", bankDetails.bankName],
        ["Name", bankDetails.name],
        ["Account Number", bankDetails.accountNumber],
        ["SWIFT Code", bankDetails.SWIFTCode],
        ["Bank Address", bankDetails.bankAddress],
      ],
      theme: "plain",
      styles: {
        fontSize: 10,
        textColor: BFMPalette.black800,
        cellPadding: 3,
      },
      bodyStyles: {
        lineWidth: 0.5,
        lineColor: BFMPalette.gray200,
      },
      columnStyles: {
        0: {
          fontStyle: "bold",
          fillColor: BFMPalette.gray100,
          textColor: BFMPalette.black100,
        },
        1: { textColor: BFMPalette.black800 },
      },
      margin: { left: 15, right: 15 },
    });

    doc.save("invoice.pdf");
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
          onClick={handleDownloadPDF}>
          Download Invoice (PDF)
        </NavButton>
      </BtnContainer>
    </>
  );
}
