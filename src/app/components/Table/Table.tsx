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

const TableContainer = styled.div`
  padding: 12px 16px 16px 16px;
  background-color: #f9f9f9;
`;

const DataRow = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: ${({ $columns }) => `repeat(${$columns}, 1fr)`};
  border-bottom: 1px solid #ddd;
  align-items: center;
`;

export const DataCell = styled.div`
  padding: 16px 20px;
`;

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchQuery?: string;
  searchColumns?: (keyof T)[];
}

export default function DataTable<T>({
  data,
  columns,
  searchQuery,
  searchColumns = [],
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
    data: filteredData, // Use filteredData here
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
      <DataRow $columns={columns.length}>
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
