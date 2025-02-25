import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import { generateMonths } from "@/utils";
import { Select } from "antd";
import { useState } from "react";
import styled from "styled-components";
import Category from "../Category/Category";
import PieGraph from "../Charts/PieChart/PieChart";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";

const COLORS = [
  BFMPalette.purple1000,
  BFMPalette.purple800,
  BFMPalette.purple600,
  BFMPalette.purple400,
  BFMPalette.purple200,
];

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
`;
const Labels = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
const LabelContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export default function InflowOutflow() {
  const { reports, depositsDashboard, withDrawalsDashboard } = useData();
  const tabs = ["Deposit", "Withdrawal"];
  const [selectedMonth, setSelectedMonth] = useState<string>(
    generateMonths(reports.incomeByCategory)[0]
  );
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const months =
    selectedTab === tabs[0]
      ? reports.incomeByCategory
      : reports.expenseByCategory;

  const filteredData =
    selectedTab === tabs[0]
      ? depositsDashboard.filter((deposit) => deposit.month === selectedMonth)
      : withDrawalsDashboard.filter(
          (withdrawal) => withdrawal.month === selectedMonth
        );

  const totalValue = filteredData.reduce((sum, item) => sum + item.value, 0);
  return (
    <Container>
      <SubContainer>
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
        <Select
          style={{ height: "45px" }}
          onChange={(value) => setSelectedMonth(value)}
          value={selectedMonth}>
          {generateMonths(months).map((month) => (
            <Select.Option key={month} value={month}>
              {month}
            </Select.Option>
          ))}
        </Select>
      </SubContainer>

      <ChartContainer>
        <PieGraph data={filteredData} COLORS={COLORS} total={totalValue} />
        <Labels>
          {filteredData.map((data, index) => (
            <Category
              circleColor={COLORS[index % COLORS.length]}
              category={data.name}
              amount={data.value}
            />
          ))}
        </Labels>
      </ChartContainer>
    </Container>
  );
}
