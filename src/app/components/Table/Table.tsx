"use client";
import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import useTranslation from "@/translations";
import { H3, TableTitle } from "@/Typography";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { RowData } from "../../../Interfaces/Interfaces";
import { ExpandedColumns } from "./ExpandedTable/ExpandedColumn";

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
      ? $columnWidths.map((width) => `minmax(0, ${width})`).join(" ")
      : `repeat(${$columns}, minmax(0, 1fr))`};
  border-bottom: 1px solid ${BFMPalette.gray100};
  align-items: center;
  background-color: ${BFMPalette.white25};
`;

export const DataCell = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  width: 100%;
  height: 100%;
  white-space: normal;
  text-overflow: ellipsis;
  overflow-wrap: anywhere;
`;
const Revenue = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 16px 20px;
  background-color: ${BFMPalette.purple250};
  white-space: normal;
  text-overflow: ellipsis;
  overflow-wrap: anywhere;
`;
export const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  height: 100%;
  background-color: ${BFMPalette.white};
  white-space: normal;
  text-overflow: ellipsis;
  overflow-wrap: anywhere;
`;

const TitleContainer = styled("div")`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  searchQuery?: string;
  searchColumns?: string[];
  title?: string;
  columnWidths?: string[];
  showHeader?: boolean;
};
export default function DataTable<T>({
  data,
  columns,
  searchQuery,
  searchColumns = [],
  title,
  columnWidths,
  showHeader = true,
}: TableProps<T>) {
  function getNestedValue<T>(obj: T, path: string): unknown {
    return path.split(".").reduce<unknown>((acc, key) => {
      if (typeof acc === "object" && acc !== null) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  }

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    return data.filter((row) =>
      (searchColumns || []).some((column) => {
        const value = getNestedValue(row, column as string);
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
        );
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
  const { t } = useTranslation();
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
      {showHeader && (
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
      )}

      {table.getRowModel().rows.map((row) => (
        <React.Fragment key={row.id}>
          <DataRow $columns={columns.length} $columnWidths={columnWidths}>
            {row.getVisibleCells().map((cell) => {
              const isExpandableRow =
                cell.column.id ===
                t("tables.recurring_transactions.description");
              const isRevenueRow =
                (row.original as RowData).inflows === "totalRevenue" ||
                (row.original as RowData).inflows === "revenueGrowth" ||
                (row.original as RowData).outflows === "totalExpense" ||
                (row.original as RowData).outflows === "profitOrLoss";
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
