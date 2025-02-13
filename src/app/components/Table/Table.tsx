import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import styled from "styled-components";
import { Transaction } from "@/interfaces";

const TableContainer = styled.div`
  padding: 12px 16px 16px 16px;
  background-color: #f9f9f9;
`;

const DataRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr 1.5fr 2fr 1fr;
  border-bottom: 1px solid #ddd;
  align-items: center;
`;

export const DataCell = styled.div`
  padding: 16px 20px;
`;

interface TransactionTableProps {
  data: Transaction[];
  columns: ColumnDef<Transaction>[];
}
export default function TransactionTable({
  data,
  columns,
}: TransactionTableProps) {
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
