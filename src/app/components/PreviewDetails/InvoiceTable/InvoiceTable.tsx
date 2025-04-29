import { useInvoice } from "@/InvoiceContext";
import { BFMPalette } from "@/Theme";
import { H3, SmallText } from "@/Typography";
import { formatCurrency } from "@/utils";
import React, { useEffect } from "react";
import styled from "styled-components";
import {
  DetailedInvoiceSummary,
  InvoiceItem,
} from "../../../../Interfaces/Interfaces";
import { useInvoiceItem } from "@/InvoiceItemContext";

const TableWrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${BFMPalette.gray100};
  background-color: ${BFMPalette.gray300};
`;

const TableRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 6.92fr 2.19fr 2.89fr;
  padding: 10px 12px;
  background-color: ${BFMPalette.white25};
  border-bottom: 1px solid ${BFMPalette.gray100};
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled(TableRow)`
  background-color: ${BFMPalette.gray300};
`;

const TableCell = styled.div<{ $alignRight?: boolean }>`
  text-align: ${(props) => (props.$alignRight ? "right" : "left")};
`;

const SummaryRow = styled(TableRow)`
  background-color: ${BFMPalette.gray300};
`;

type InvoiceTableProps = {
  rows: InvoiceItem[];
  invoice?: DetailedInvoiceSummary;
  isDownloading?: boolean;
};
const InvoiceTable: React.FC<InvoiceTableProps> = ({
  rows,
  invoice,
  isDownloading = false,
}) => {
  const {
    hasDiscount,
    discount,
    setDiscount,
    subTotal,
    setSubTotal,
    finalTotal,
    setFinalTotal,
  } = useInvoice();

  const { items } = useInvoiceItem();
  const totalPrice = items.reduce(
    (sum, item) => sum + item.qty * parseFloat(item.price.toString()),
    0
  );
  const currency = items.length > 0 ? items[0].currency : "";
  const finalPrice = (totalPrice * ((100 - discount) / 100)).toFixed(2);

  useEffect(() => {
    if (isNaN(discount) || !hasDiscount) {
      setDiscount(0);
    }
  }, [hasDiscount, discount, setDiscount]);
  useEffect(() => {
    setSubTotal(formatCurrency(`${currency} ${totalPrice}`, 2));
    setFinalTotal(formatCurrency(`${currency} ${finalPrice}`, 2));
  }, [
    items,
    discount,
    currency,
    totalPrice,
    finalPrice,
    setSubTotal,
    setFinalTotal,
  ]);
  if (rows.length === 0) return null;

  return (
    <TableWrapper>
      {rows.length > 0 && (
        <TableHeader>
          <TableCell>
            <H3>DESCRIPTIONS</H3>
          </TableCell>
          <TableCell>
            <H3>QUANTITY</H3>
          </TableCell>
          <TableCell $alignRight>
            <H3>AMOUNT</H3>
          </TableCell>
        </TableHeader>
      )}

      {rows.map((row, index) => (
        <TableRow key={index}>
          <TableCell>
            <SmallText color={BFMPalette.black800}>
              {row.description?.trim()
                ? row.description
                : "Enter item description"}
            </SmallText>
          </TableCell>
          <TableCell>
            <SmallText color={BFMPalette.black800}>
              {!Number.isNaN(row.qty) ? row.qty : 1}
            </SmallText>
          </TableCell>
          <TableCell $alignRight>
            <H3 color={BFMPalette.purple375}>
              {formatCurrency(`${row.currency} ${row.price}`, 2)}
            </H3>
          </TableCell>
        </TableRow>
      ))}

      <SummaryRow>
        <TableCell>
          <H3 color={BFMPalette.black800}>Subtotal</H3>
        </TableCell>
        <TableCell />
        <TableCell $alignRight>
          {!isDownloading ? (
            <H3 color={BFMPalette.black800}>{subTotal}</H3>
          ) : (
            <H3 color={BFMPalette.black800}>{invoice?.subTotal}</H3>
          )}
        </TableCell>
      </SummaryRow>

      <SummaryRow>
        <TableCell>
          <H3 color={BFMPalette.black800}>Discount</H3>
        </TableCell>
        <TableCell />
        <TableCell $alignRight>
          {!isDownloading ? (
            <H3 color={BFMPalette.black800}>{discount}%</H3>
          ) : (
            <H3 color={BFMPalette.black800}>{invoice?.discount}%</H3>
          )}
        </TableCell>
      </SummaryRow>

      <SummaryRow>
        <TableCell>
          <H3 color={BFMPalette.black800}>Amount due</H3>
        </TableCell>
        <TableCell />
        <TableCell $alignRight>
          {!isDownloading ? (
            <H3 color={BFMPalette.black800}>{finalTotal}</H3>
          ) : (
            <H3 color={BFMPalette.black800}>{invoice?.amountDue}</H3>
          )}
        </TableCell>
      </SummaryRow>
    </TableWrapper>
  );
};

export default InvoiceTable;
