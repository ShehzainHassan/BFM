"use client";
import styled from "styled-components";
import TextComponent from "../TextComponent/TextComponent";
import { useData } from "@/DataContext";
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function TextContainer() {
  const { reports } = useData();
  const overviewReport = reports.overviewReport;
  return (
    <Container>
      <TextComponent
        title="Current Balance"
        timePeriod="since last month"
        percentage={overviewReport.netFlowPercentageMoM}
        value={overviewReport.currentBalance}
        isIncreased={overviewReport.netFlowPercentageMoM >= 0 ? true : false}
      />
      <TextComponent
        title="Total income"
        timePeriod="since last month"
        percentage={overviewReport.inflowPercentageMoM}
        value={overviewReport.totalInflow}
        isIncreased={overviewReport.inflowPercentageMoM >= 0 ? true : false}
      />
      <TextComponent
        title="Total Expenses"
        timePeriod="since last month"
        percentage={overviewReport.outflowPercentageMoM}
        value={overviewReport.totalOutflow}
        isIncreased={overviewReport.outflowPercentageMoM >= 0 ? true : false}
      />
    </Container>
  );
}
