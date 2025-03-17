import { HKD_EQUIVALANT } from "@/constants";
import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import { formatCurrency, generateMonths } from "@/utils";
import { useState } from "react";
import styled from "styled-components";
import Category from "../Category/Category";
import PieGraph from "../Charts/PieChart/Pie";
import { PIE_COLORS_2 } from "../Charts/PieChart/PieChartData";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import MonthDropDown from "../MonthDropDown/MonthDropDown";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  border-radius: 12px;
  background-color: white;
`;

const SubContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${BFMPalette.gray100};
`;

const ChartContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  height: 100%;
`;
const Labels = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 250px;
`;
const NoData = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
export default function InflowOutflow() {
  const { reports, depositsDashboard, withDrawalsDashboard } = useData();
  const tabs = ["Deposit", "Withdrawal"];
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const months =
    selectedTab === tabs[0]
      ? generateMonths(reports.incomeByCategory)
      : generateMonths(reports.expenseByCategory);

  const selectedData =
    selectedTab === tabs[0] ? depositsDashboard : withDrawalsDashboard;

  const filteredData = selectedData.filter((item) =>
    selectedMonths.includes(item.month)
  );
  const aggregatedData = filteredData.reduce((acc, item) => {
    const existingItem = acc.find((entry) => entry.name === item.name);
    if (existingItem) {
      existingItem.value += item.value;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, [] as { month: string; name: string; value: number }[]);

  const total = Math.abs(
    aggregatedData.reduce((sum, item) => sum + item.value, 0)
  );
  return (
    <Container>
      <SubContainer>
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
        <MonthDropDown
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
          months={months}
        />
      </SubContainer>
      {aggregatedData.length > 0 ? (
        <ChartContainer>
          <PieGraph
            data={aggregatedData}
            colors={PIE_COLORS_2}
            total={formatCurrency(`${HKD_EQUIVALANT}${total}`, 2)}
          />
          <Labels>
            {aggregatedData.map((data, index) => (
              <Category
                key={index}
                circleColor={PIE_COLORS_2[index % PIE_COLORS_2.length]}
                category={data.name}
                amount={data.value}
              />
            ))}
          </Labels>
        </ChartContainer>
      ) : (
        <NoData>No data</NoData>
      )}
    </Container>
  );
}
