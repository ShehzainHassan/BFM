"use client";
import { BFMPalette } from "@/Theme";
import { H3, TableTitle } from "@/Typography";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { ExpandedColumns } from "./ExpandedTable/ExpandedColumn";
import { useData } from "@/DataContext";

export const TableContainer = styled.div`
  padding: 12px 16px 16px 16px;
  background-color: ${BFMPalette.white25};
`;

export const DataRow = styled.div<{
  $columns: number;
  $columnWidths?: string[];
}>`
  display: grid;
  grid-template-columns: ${({ $columns, $columnWidths }) =>
    $columnWidths && $columnWidths.length === $columns
      ? $columnWidths.join(" ")
      : `repeat(${$columns}, 1fr)`};
  border-bottom: 1px solid ${BFMPalette.gray100};
  align-items: center;
  background-color: ${BFMPalette.white25};
`;

export const DataCell = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 16px 20px;
`;
const Revenue = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 16px 20px;
  background-color: ${BFMPalette.purple250};
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
  columnWidths?: string[];
}
export default function DataTable<T>({
  data,
  columns,
  searchQuery,
  searchColumns = [],
  title,
  columnWidths,
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

  const [expandedRowIds, setExpandedRowIds] = useState<Set<string>>(new Set());
  const { withdrawalRecurring } = useData();
  const handleExpandRow = (rowId: string) => {
    setExpandedRowIds((prev) => {
      const newExpandedRowIds = new Set(prev);
      if (newExpandedRowIds.has(rowId)) {
        newExpandedRowIds.delete(rowId);
      } else {
        newExpandedRowIds.add(rowId);
      }
      return newExpandedRowIds;
    });
  };

  return (
    <TableContainer>
      {title && (
        <TitleContainer>
          <TableTitle color={BFMPalette.black800}>{title}</TableTitle>
        </TitleContainer>
      )}
      <DataRow $columns={columns.length} $columnWidths={columnWidths}>
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
        <React.Fragment key={row.id}>
          <DataRow $columns={columns.length} $columnWidths={columnWidths}>
            {row.getVisibleCells().map((cell) => {
              const isExpandableRow =
                cell.column.id === "TRANSACTION_DESCRIPTION";
              const isRevenueRow =
                (row.original as any).inflows === "totalRevenue" ||
                (row.original as any).inflows === "revenueGrowth" ||
                (row.original as any).outflows === "totalExpense" ||
                (row.original as any).outflows === "profitOrLoss";
              return isRevenueRow ? (
                <Revenue key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Revenue>
              ) : (
                <DataCell
                  key={cell.id}
                  onClick={() => {
                    if (isExpandableRow) {
                      handleExpandRow(row.id);
                    }
                  }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </DataCell>
              );
            })}
          </DataRow>

          {expandedRowIds.has(row.id) && (
            <>
              <DataTable
                data={withdrawalRecurring[Number(row.id)].subItems}
                columns={ExpandedColumns}
              />
            </>
          )}
        </React.Fragment>
      ))}
    </TableContainer>
  );
}
