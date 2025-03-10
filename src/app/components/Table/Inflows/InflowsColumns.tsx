import { ColumnDef } from "@tanstack/react-table";
import { Inflows } from "./inflows";
import { InflowsStyles } from "./InflowsStyles";
import useTranslation from "@/translations";
import { useData } from "@/DataContext";
import { formatYearMonth } from "@/utils";

export const useInflowsColumns = (): ColumnDef<Inflows>[] => {
  const { t } = useTranslation();
  const { reports } = useData();

  const monthColumns: ColumnDef<Inflows>[] = reports.profitAndLost.map(
    (item, index) => {
      const accessorKey = `MONTH_${index + 1}` as keyof typeof InflowsStyles;

      return {
        accessorKey,
        header: formatYearMonth(item.yearMonth),
        cell: ({ row }) => InflowsStyles[accessorKey](row.original),
      };
    }
  );

  return [
    {
      accessorKey: t("tables.inflows"),
      header: t("tables.inflows"),
      cell: ({ row }) => InflowsStyles.INFLOWS(row.original),
    },
    ...monthColumns,
  ];
};
