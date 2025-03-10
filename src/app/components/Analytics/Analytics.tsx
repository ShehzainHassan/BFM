"use client";
import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import { useState } from "react";
import styled from "styled-components";
import { calculateAverageHKD } from "@/utils";
import { BuyerSupplierAnalysis } from "../Table/BuyerSupplierAnalysis/BuyerSupplierAnalysis";
import { TransitionHighlight } from "../Table/TransitionHighlight/transitionHighlight";
import { RecurringTransaction } from "../Table/RecurringTransactions/recurringTransactions";
import { ITEMS_PER_PAGE } from "@/constants";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import RenderBadgeGroup from "../BadgeGroup/BadgeGroup";
import NoResults from "../NoRecordFound/NoResuts";
import DataTable from "../Table/Table";
import { useInflowsColumns } from "../Table/Inflows/InflowsColumns";
import { useOutflowsColumns } from "../Table/Outflows/OutflowsColumns";
import { useRecurringTransactionColumns } from "../Table/RecurringTransactions/RecurringTransactionColumn";
import { useTransitionHighlightColumns } from "../Table/TransitionHighlight/TransitionHighlightColumn";
import Pagination from "../Pagination/Pagination";
import useTranslation from "@/translations";
import { useBuyerSupplierAnalysisColumns } from "../Table/BuyerSupplierAnalysis/BuyerSupplierAnalysisColumns";

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
  const buyerSupplierColumns = useBuyerSupplierAnalysisColumns();
  const recurringTransactionsColumns = useRecurringTransactionColumns();
  const transitionHighlightColumns = useTransitionHighlightColumns();
  const inflowsColumns = useInflowsColumns();
  const outflowsColums = useOutflowsColumns();
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
  const { t } = useTranslation();

  const showTabContainer2 =
    selectedTab === tabs[0] ||
    selectedTab === tabs[2] ||
    selectedTab === tabs[3];

  const [currentPage, setCurrentPage] = useState(0);

  const data: (
    | BuyerSupplierAnalysis
    | TransitionHighlight
    | RecurringTransaction
  )[] =
    selectedTab === tabs[0]
      ? selectedButton === tabButtons[0]
        ? deposits
        : withdrawals
      : selectedTab === tabs[2]
      ? selectedButton === tabButtons[0]
        ? depositRecurring
        : withdrawalRecurring
      : selectedTab === tabs[3]
      ? selectedButton === tabButtons[0]
        ? depositHighlights
        : withdrawalHighlights
      : [];

  const offset = currentPage * ITEMS_PER_PAGE;
  const paginatedData = data.slice(offset, offset + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const depositRecurringAVG = calculateAverageHKD(depositRecurring);
  const withdrawalRecurringAVG = calculateAverageHKD(withdrawalRecurring);
  return (
    <Container>
      <TabContainer1>
        <HorizontalTabs
          tabs={tabs}
          tabType="tab"
          selectedTab={selectedTab}
          onTabChange={(tab) => {
            setSelectedTab(tab);
            setCurrentPage(0);
          }}
        />
      </TabContainer1>
      {showTabContainer2 && (
        <TabContainer2>
          <HorizontalTabs
            tabs={tabButtons}
            selectedTab={selectedButton}
            onTabChange={(btn) => {
              setSelectedButton(btn);
              setCurrentPage(0);
            }}
          />
          {selectedTab === tabs[2] && selectedButton === tabButtons[0] && (
            <RenderBadgeGroup
              title={t("tables.recurring_transactions.total_deposits_text")}
              value={depositRecurringAVG}
            />
          )}
          {selectedTab === tabs[2] && selectedButton === tabButtons[1] && (
            <RenderBadgeGroup
              title={t("tables.recurring_transactions.total_withdrawal_text")}
              value={withdrawalRecurringAVG}
            />
          )}
          {selectedTab === tabs[3] && selectedButton === tabButtons[0] && (
            <RenderBadgeGroup
              title={t("tables.transition_highlight.average_deposit_text")}
              value={reports.incomeIrregularReport?.averageAmount || 0}
            />
          )}
          {selectedTab === tabs[3] && selectedButton === tabButtons[1] && (
            <RenderBadgeGroup
              title={t("tables.transition_highlight.average_withdrawal_text")}
              value={reports.expenseIrregularReport?.averageAmount || 0}
            />
          )}
        </TabContainer2>
      )}

      {selectedTab === tabs[0] &&
      selectedButton === tabButtons[0] &&
      deposits.length === 0 ? (
        <NoResults />
      ) : (
        selectedTab === tabs[0] &&
        selectedButton === tabButtons[0] && (
          <DataTable
            data={paginatedData as BuyerSupplierAnalysis[]}
            columns={buyerSupplierColumns}
          />
        )
      )}

      {selectedTab === tabs[0] &&
      selectedButton === tabButtons[1] &&
      deposits.length === 0 ? (
        <NoResults />
      ) : (
        selectedTab === tabs[0] &&
        selectedButton === tabButtons[1] && (
          <DataTable
            data={paginatedData as BuyerSupplierAnalysis[]}
            columns={buyerSupplierColumns}
          />
        )
      )}

      {selectedTab === tabs[1] &&
      inflows.length === 0 &&
      outflows.length === 0 ? (
        <NoResults />
      ) : (
        selectedTab === tabs[1] && (
          <InflowOutflowContainer>
            <DataTable
              title="Inflows"
              data={inflows}
              columns={inflowsColumns}
              columnWidths={["2.4fr", "2.4fr", "2.4fr", "2.4fr", "2.4fr"]}
            />
            <DataTable
              title="Outflows"
              data={outflows}
              columns={outflowsColums}
              columnWidths={["2.4fr", "2.4fr", "2.4fr", "2.4fr", "2.4fr"]}
            />
          </InflowOutflowContainer>
        )
      )}

      {selectedTab === tabs[2] &&
      selectedButton === tabButtons[0] &&
      depositRecurring.length === 0 ? (
        <NoResults />
      ) : (
        selectedTab === tabs[2] &&
        selectedButton === tabButtons[0] && (
          <DataTable
            data={paginatedData as RecurringTransaction[]}
            columns={recurringTransactionsColumns}
            columnWidths={[
              "2.23fr",
              "1.95fr",
              "1.95fr",
              "1.95fr",
              "1.95fr",
              "1.95fr",
            ]}
          />
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
            data={paginatedData as RecurringTransaction[]}
            columns={recurringTransactionsColumns}
            columnWidths={[
              "2.25fr",
              "1.95fr",
              "1.95fr",
              "1.95fr",
              "1.95fr",
              "1.95fr",
            ]}
          />
        )
      )}

      {selectedTab === tabs[3] &&
      selectedButton === tabButtons[0] &&
      depositHighlights.length === 0 ? (
        <NoResults />
      ) : (
        selectedTab === tabs[3] &&
        selectedButton === tabButtons[0] && (
          <DataTable
            data={paginatedData as TransitionHighlight[]}
            columns={transitionHighlightColumns}
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
            data={paginatedData as TransitionHighlight[]}
            columns={transitionHighlightColumns}
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
      {(selectedTab === tabs[0] ||
        selectedTab === tabs[2] ||
        selectedTab === tabs[3]) &&
        paginatedData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        )}
    </Container>
  );
}
