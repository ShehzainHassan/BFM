import { ColumnDef } from "@tanstack/react-table";
import { Outflows } from "./outflows";
import { OutflowsStyles } from "./OutflowsStyles";
import useTranslation from "@/translations";
import { useData } from "@/DataContext";
import { formatYearMonth } from "@/utils";

export const useOutflowsColumns = (): ColumnDef<Outflows>[] => {
  const { t } = useTranslation();
  const { reports } = useData();

  const monthColumns: ColumnDef<Outflows>[] = reports.profitAndLost.map(
    (item, index) => {
      const accessorKey = `MONTH_${index + 1}` as keyof typeof OutflowsStyles;

      return {
        accessorKey,
        header: formatYearMonth(item.yearMonth),
        cell: ({ row }) => OutflowsStyles[accessorKey](row.original),
      };
    }
  );

  return [
    {
      accessorKey: t("tables.outflows"),
      header: t("tables.outflows"),
      cell: ({ row }) => OutflowsStyles.OUTFLOWS(row.original),
    },
    ...monthColumns,
  ];
};
