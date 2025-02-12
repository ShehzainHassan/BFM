import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import styled from "styled-components";
import { BFMPalette } from "@/Theme";
import { BodyText, H3, H3Secondary, H4 } from "@/Typography";
import Image from "next/image";
import { Transaction } from "@/interfaces";

const TableContainer = styled.div`
  padding: 12px 16px 16px 16px;
  background-color: #f9f9f9;
`;

const HeaderCell = styled.div`
  padding: 12px 20px;
  height: 100%;
  text-align: left;
  background-color: ${BFMPalette.white};
`;

const DataRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr 1.5fr 2fr 1fr;
  border-bottom: 1px solid #ddd;
  align-items: center;
`;

const DataCell = styled.div`
  padding: 16px 20px;
`;

const ImageContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 200px;
  background-color: ${BFMPalette.purple100};
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DescriptionText = styled.div`
  display: flex;
  flex-direction: column;
`;

const AmountText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BankText = styled.div`
  font-weight: bold;
  color: black;
`;

const AccountText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: () => (
      <HeaderCell>
        <H3 color={BFMPalette.gray700}>DATE</H3>
      </HeaderCell>
    ),
    cell: ({ row }) => (
      <DataCell>
        <BodyText color={BFMPalette.black800}>{row.original.date}</BodyText>
      </DataCell>
    ),
  },
  {
    accessorKey: "description",
    header: () => (
      <HeaderCell>
        <H3 color={BFMPalette.gray700}>DESCRIPTIONS</H3>
      </HeaderCell>
    ),
    cell: ({ row }) => {
      const { imgSrc, title, subtitle } = row.original.description;
      return (
        <DescriptionWrapper>
          <ImageContainer>
            <Image src={imgSrc} alt="icon" width={20} height={20} />
          </ImageContainer>
          <DescriptionText>
            <H4 color={BFMPalette.black800}>{title}</H4>
            <BodyText>{subtitle}</BodyText>
          </DescriptionText>
        </DescriptionWrapper>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <HeaderCell>
        <H3 color={BFMPalette.gray700}>AMOUNT / HKD EQV</H3>
      </HeaderCell>
    ),
    cell: ({ row }) => {
      const { currency, value, equivalent } = row.original.amount;
      return (
        <AmountText>
          <H3Secondary color={BFMPalette.purple375}>
            {currency} {value}
          </H3Secondary>
          <H3Secondary color={BFMPalette.purple375}>{equivalent}</H3Secondary>
        </AmountText>
      );
    },
  },
  {
    accessorKey: "bank",
    header: () => (
      <HeaderCell>
        <H3 color={BFMPalette.gray700}>BANK</H3>
      </HeaderCell>
    ),
    cell: ({ row }) => (
      <BankText>
        <BodyText color={BFMPalette.black800}>{row.original.bank}</BodyText>
      </BankText>
    ),
  },
  {
    accessorKey: "account",
    header: () => (
      <HeaderCell>
        <H3 color={BFMPalette.gray700}>ACCOUNT</H3>
      </HeaderCell>
    ),
    cell: ({ row }) => {
      const { type, number } = row.original.account;
      return (
        <AccountText>
          <H4 color={BFMPalette.black800}>{type}</H4>
          <BodyText>{number}</BodyText>
        </AccountText>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => (
      <HeaderCell>
        <H3 color={BFMPalette.gray700}></H3>
      </HeaderCell>
    ),
    cell: () => (
      <Image
        src="/images/Button utility.png"
        alt="icon"
        width={32}
        height={32}
      />
    ),
  },
];

interface TransactionTableProps {
  data: Transaction[];
}
export default function TransactionTable({ data }: TransactionTableProps) {
  const table = useReactTable({
    data: useMemo(() => data, []),
    columns: useMemo(() => columns, []),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer>
      <DataRow>
        {table
          .getHeaderGroups()
          .map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <React.Fragment key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </React.Fragment>
            ))
          )}
      </DataRow>

      {table.getRowModel().rows.map((row) => (
        <DataRow key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <DataCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </DataCell>
          ))}
        </DataRow>
      ))}
    </TableContainer>
  );
}
