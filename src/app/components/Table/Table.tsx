"use client";

import { BFMPalette } from "@/Theme";
import { H3, TableTitle } from "@/Typography";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  background-color: ${BFMPalette.white25};
  width: 100%;
`;

const DesktopTable = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileTable = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
  }
`;

const HeaderRow = styled.div<{ $columns: number; $widths?: string[] }>`
  display: grid;
  grid-template-columns: ${({ $columns, $widths }) =>
    $widths && $widths.length === $columns
      ? $widths.join(" ")
      : `repeat(${$columns}, 1fr)`};
  border-bottom: 1px solid ${BFMPalette.gray100};
`;

const Row = styled(HeaderRow)`
  align-items: center;
`;

const HeaderCell = styled.div`
  padding: 12px;
  background-color: ${BFMPalette.white};
`;

const Cell = styled.div`
  padding: 14px 16px;
  font-size: 14px;
`;

const Card = styled.div`
  background-color: ${BFMPalette.white};
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
`;

const CardLabel = styled.div`
  color: ${BFMPalette.gray700};
  font-weight: 500;
`;

const CardValue = styled.div`
  text-align: right;
  color: ${BFMPalette.black800};
  font-weight: 500;
`;

const TitleContainer = styled.div`
  padding: 12px 16px;
`;

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  title?: string;
  columnWidths?: string[];
  showHeader?: boolean;
  searchQuery?: string;
  searchColumns?: string[];
};

export default function DataTable<T>({
  data,
  columns,
  title,
  columnWidths,
  showHeader = true,
  searchColumns,
  searchQuery,
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
    if (!searchQuery || !searchColumns?.length) return data;

    return data.filter((row) =>
      searchColumns.some((column) => {
        const value = getNestedValue(row, column);
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }),
    );
  }, [data, searchQuery, searchColumns]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headers = table
    .getHeaderGroups()[0]
    ?.headers.map((h) => flexRender(h.column.columnDef.header, h.getContext()));

  return (
    <TableContainer>
      {title && (
        <TitleContainer>
          <TableTitle>{title}</TableTitle>
        </TitleContainer>
      )}

      <DesktopTable>
        {showHeader && (
          <HeaderRow $columns={columns.length} $widths={columnWidths}>
            {table.getHeaderGroups().map((group) =>
              group.headers.map((header) => (
                <HeaderCell key={header.id}>
                  <H3 color={BFMPalette.gray700}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </H3>
                </HeaderCell>
              )),
            )}
          </HeaderRow>
        )}

        {table.getRowModel().rows.map((row) => (
          <Row key={row.id} $columns={columns.length} $widths={columnWidths}>
            {row.getVisibleCells().map((cell) => (
              <Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Cell>
            ))}
          </Row>
        ))}
      </DesktopTable>

      <MobileTable>
        {table.getRowModel().rows.map((row) => (
          <Card key={row.id}>
            {row.getVisibleCells().map((cell, index) => (
              <CardRow key={cell.id}>
                <CardLabel>{headers?.[index]}</CardLabel>
                <CardValue>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </CardValue>
              </CardRow>
            ))}
          </Card>
        ))}
      </MobileTable>
    </TableContainer>
  );
}
