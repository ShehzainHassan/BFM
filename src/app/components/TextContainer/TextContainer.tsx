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
  const overviewReport = reports?.overviewReport;
  return (
    <Container>
      <TextComponent
        title="Current Balance"
        timePeriod="since last month"
        percentage={overviewReport?.netFlowPercentageMoM ?? 0}
        value={overviewReport?.currentBalance ?? 0}
        isIncreased={
          overviewReport?.netFlowPercentageMoM !== undefined
            ? overviewReport.netFlowPercentageMoM >= 0
            : false
        }
      />
      <TextComponent
        title="Total income"
        timePeriod="since last month"
        percentage={overviewReport?.inflowPercentageMoM ?? 0}
        value={overviewReport?.totalInflow ?? 0}
        isIncreased={
          (overviewReport?.inflowPercentageMoM ?? 0) >= 0 ? true : false
        }
      />
      <TextComponent
        title="Total Expenses"
        timePeriod="since last month"
        percentage={overviewReport?.outflowPercentageMoM ?? 0}
        value={overviewReport?.totalOutflow ?? 0}
        isIncreased={
          overviewReport?.outflowPercentageMoM !== undefined
            ? overviewReport.outflowPercentageMoM >= 0
            : false
        }
      />
    </Container>
  );
}
