"use client";
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import styled from "styled-components";
import DetailsModal from "../Modal/Modal";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { H3, TableTitle } from "@/Typography";
import { BFMPalette } from "@/Theme";

const TableContainer = styled.div`
  padding: 12px 16px 16px 16px;
  background-color: ${BFMPalette.white25};
`;

const DataRow = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
  border-bottom: 1px solid #ddd;
  align-items: center;
  background-color: ${BFMPalette.white25};
`;

export const DataCell = styled.div`
  padding: 16px 20px;
`;

export const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  height: 100%;
  background-color: ${BFMPalette.white};
`;

const TitleContainer = styled("div")`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchQuery?: string;
  searchColumns?: (keyof T)[];
  title?: string;
}

export default function DataTable<T>({
  data,
  columns,
  searchQuery,
  searchColumns = [],
  title,
}: TableProps<T>) {
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((row) =>
      searchColumns.some((column) => {
        const cellValue = row[column];
        return cellValue
          ? String(cellValue).toLowerCase().includes(searchQuery.toLowerCase())
          : false;
      })
    );
  }, [data, searchQuery, searchColumns]);

  const table = useReactTable({
    data: filteredData,
    columns: useMemo(() => columns, [columns]),
    getCoreRowModel: getCoreRowModel(),
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<T>();

  const handleRowClick = (rowData: T) => {
    setSelectedRow(rowData);
    setModalIsOpen(true);
  };

  return (
    <TableContainer>
      {title && (
        <TitleContainer>
          <TableTitle color={BFMPalette.black800}>{title}</TableTitle>
        </TitleContainer>
      )}
      <DataRow $columns={columns.length}>
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <HeaderCell key={header.id}>
              <H3 color={BFMPalette.gray700}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </H3>
            </HeaderCell>
          ))
        )}
      </DataRow>

      {table.getRowModel().rows.map((row) => (
        <DataRow key={row.id} $columns={columns.length}>
          {row.getVisibleCells().map((cell) => {
            const isActionColumn = cell.column.id === "action";

            return (
              <DataCell
                key={cell.id}
                onClick={() => {
                  if (isActionColumn) {
                    handleRowClick(row.original);
                    setModalIsOpen(true);
                  }
                }}
                style={{ cursor: isActionColumn ? "pointer" : "default" }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </DataCell>
            );
          })}
        </DataRow>
      ))}
      <DetailsModal
        headerText="Transaction Details"
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}>
        <TransactionDetails selectedRow={selectedRow} />
      </DetailsModal>
    </TableContainer>
  );
}
