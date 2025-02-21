"use client";
import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import { useState } from "react";
import styled from "styled-components";
import RenderBadgeGroup from "../components/BadgeGroup/BadgeGroup";
import HorizontalTabs from "../components/HorizontalTabs/HorizontalTabs";
import NoResults from "../components/NoRecordFound/NoResuts";
import { BuyerSupplierAnalysisColumns } from "../components/Table/BuyerSupplierAnalysis/BuyerSupplierAnalysisColumns";
import { InflowsColumns } from "../components/Table/Inflows/InflowsColumns";
import { OutflowsColumns } from "../components/Table/Outflows/OutflowsColumns";
import { RecurringTransactionColumns } from "../components/Table/RecurringTransactions/RecurringTransactionColumn";
import DataTable from "../components/Table/Table";
import { TransitionHighlightColumns } from "../components/Table/TransitionHighlight/TransitionHighlightColumn";

const TabContainer1 = styled("div")`
  padding: 20px 16px 0px 16px;
  background-color: ${BFMPalette.white25};
  border: 1px solid ${BFMPalette.gray100};
`;
const TabContainer2 = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background-color: ${BFMPalette.white25};
  border-bottom: 1px solid ${BFMPalette.gray100};
`;

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  max-width: 1300px;
  overflow: hidden;
  width: 100%;
`;
const InflowOutflowContainer = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: ${BFMPalette.white25};
  gap: 16px;
`;

export default function Analytics() {
  const tabs = [
    "Buyer / Supplier Analysis",
    "Cash Analysis",
    "Recurring Transactions",
    "Transition Highlight",
  ];
  const tabButtons = ["Deposit", "Withdrawal"];

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedButton, setSelectedButton] = useState(tabButtons[0]);

  const {
    reports,
    deposits,
    withdrawals,
    depositHighlights,
    withdrawalHighlights,
    depositRecurring,
    withdrawalRecurring,
    inflows,
    outflows,
  } = useData();

  const showTabContainer2 =
    selectedTab === tabs[0] ||
    selectedTab === tabs[2] ||
    selectedTab === tabs[3];

  return (
    <Container>
      <TabContainer1>
        <HorizontalTabs
          tabs={tabs}
          tabType="tab"
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
      </TabContainer1>
      {showTabContainer2 && (
        <TabContainer2>
          <HorizontalTabs
            tabs={tabButtons}
            selectedTab={selectedButton}
            onTabChange={setSelectedButton}
          />
          {selectedTab === tabs[2] && selectedButton === tabButtons[0] && (
            <RenderBadgeGroup
              title="Total Monthly Recurring Inflow"
              value={27776.9}
            />
          )}
          {selectedTab === tabs[2] && selectedButton === tabButtons[1] && (
            <RenderBadgeGroup
              title="Total Monthly Recurring Outflow"
              value={27776.9}
            />
          )}
          {selectedTab === tabs[3] && selectedButton === tabButtons[0] && (
            <RenderBadgeGroup
              title="Average Inflow"
              value={reports.incomeIrregularReport?.averageAmount || 0}
            />
          )}
          {selectedTab === tabs[3] && selectedButton === tabButtons[1] && (
            <RenderBadgeGroup
              title="Average Outflow"
              value={reports.expenseIrregularReport?.averageAmount || 0}
            />
          )}
        </TabContainer2>
      )}

      {selectedTab === tabs[0] && selectedButton === tabButtons[0] ? (
        <DataTable data={deposits} columns={BuyerSupplierAnalysisColumns} />
      ) : selectedTab === tabs[0] && selectedButton === tabButtons[1] ? (
        <DataTable data={withdrawals} columns={BuyerSupplierAnalysisColumns} />
      ) : null}

      {selectedTab === tabs[1] && (
        <InflowOutflowContainer>
          <DataTable
            title="Inflows"
            data={inflows}
            columns={InflowsColumns}></DataTable>
          <DataTable
            title="Outflows"
            data={outflows}
            columns={OutflowsColumns}></DataTable>
        </InflowOutflowContainer>
      )}
      {selectedTab === tabs[2] &&
      selectedButton === tabButtons[0] &&
      depositRecurring.length === 0 ? (
        <NoResults />
      ) : (
        selectedTab === tabs[2] &&
        selectedButton === tabButtons[0] && (
          <DataTable
            data={depositRecurring}
            columns={RecurringTransactionColumns}></DataTable>
        )
      )}
      {selectedTab === tabs[2] &&
      selectedButton === tabButtons[1] &&
      withdrawalRecurring.length === 0 ? (
        <NoResults />
      ) : (
        selectedTab === tabs[2] &&
        selectedButton === tabButtons[1] && (
          <DataTable
            data={withdrawalRecurring}
            columns={RecurringTransactionColumns}></DataTable>
        )
      )}
      {/*RECURRING TRANSACTIONS */}

      {selectedTab === tabs[3] &&
      selectedButton === tabButtons[0] &&
      depositHighlights.length === 0 ? (
        <NoResults />
      ) : (
        selectedTab === tabs[3] &&
        selectedButton === tabButtons[0] && (
          <DataTable
            data={depositHighlights}
            columns={TransitionHighlightColumns}
            columnWidths={[
              "1.21fr",
              "1.19fr",
              "1.94fr",
              "1.94fr",
              "1.05fr",
              "1.44fr",
              "1.35fr",
              "1.88fr",
            ]}></DataTable>
        )
      )}

      {selectedTab === tabs[3] &&
      selectedButton === tabButtons[1] &&
      withdrawalHighlights.length === 0 ? (
        <NoResults />
      ) : (
        selectedTab === tabs[3] &&
        selectedButton === tabButtons[1] && (
          <DataTable
            data={withdrawalHighlights}
            columns={TransitionHighlightColumns}
            columnWidths={[
              "1.21fr",
              "1.19fr",
              "1.94fr",
              "1.94fr",
              "1.05fr",
              "1.44fr",
              "1.35fr",
              "1.88fr",
            ]}></DataTable>
        )
      )}
    </Container>
  );
}
