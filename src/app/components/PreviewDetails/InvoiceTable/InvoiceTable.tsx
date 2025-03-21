import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import { H3, SmallText } from "@/Typography";
import { formatCurrency } from "@/utils";
import React, { useEffect } from "react";
import styled from "styled-components";
import { InvoiceTableProps } from "../../../../../Interfaces";

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

const InvoiceTable: React.FC<InvoiceTableProps> = ({ rows }) => {
  if (rows.length === 0) return null;
  const {
    hasDiscount,
    discount,
    setDiscount,
    items,
    subTotal,
    setSubTotal,
    finalTotal,
    setFinalTotal,
  } = useData();
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
  }, [hasDiscount]);
  useEffect(() => {
    setSubTotal(formatCurrency(`${currency} ${totalPrice}`, 2));
    setFinalTotal(formatCurrency(`${currency} ${finalPrice}`, 2));
  }, [items, discount]);

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
            <SmallText color={BFMPalette.black800}>{row.description}</SmallText>
          </TableCell>
          <TableCell>
            <SmallText color={BFMPalette.black800}>{row.qty}</SmallText>
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
          <H3 color={BFMPalette.black800}>{subTotal}</H3>
        </TableCell>
      </SummaryRow>

      <SummaryRow>
        <TableCell>
          <H3 color={BFMPalette.black800}>Discount</H3>
        </TableCell>
        <TableCell />
        <TableCell $alignRight>
          <H3 color={BFMPalette.black800}>{discount}%</H3>
        </TableCell>
      </SummaryRow>

      <SummaryRow>
        <TableCell>
          <H3 color={BFMPalette.black800}>Amount due</H3>
        </TableCell>
        <TableCell />
        <TableCell $alignRight>
          <H3 color={BFMPalette.black800}>{finalTotal}</H3>
        </TableCell>
      </SummaryRow>
    </TableWrapper>
  );
};

export default InvoiceTable;
