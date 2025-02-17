"use client";
import { BFMPalette } from "@/Theme";
import { H4, MediumBoldHeading } from "@/Typography";
import { depositData } from "@/app/components/Table/BuyerSupplierAnalysis/BuyerSupplierAnalysis";
import { inflowData } from "@/app/components/Table/Inflows/inflows";
import { outflowData } from "@/app/components/Table/Outflows/outflows";
import { recurringTransData } from "@/app/components/Table/RecurringTransactions/recurringTransactions";
import { highlightData } from "@/app/components/Table/TransitionHighlight/transitionHighlight";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import HorizontalTabs from "../components/HorizontalTabs/HorizontalTabs";
import { BuyerSupplierAnalysisColumns } from "../components/Table/BuyerSupplierAnalysis/BuyerSupplierAnalysisColumns";
import { InflowsColumns } from "../components/Table/Inflows/InflowsColumns";
import { OutflowsColumns } from "../components/Table/Outflows/OutflowsColumns";
import { RecurringTransactionColumns } from "../components/Table/RecurringTransactions/RecurringTransactionColumn";
import DataTable from "../components/Table/Table";
import { TransitionHighlightColumns } from "../components/Table/TransitionHighlight/TransitionHighlightColumn";

export default function Analytics() {
  const tabs = [
    "Buyer / Supplier Analysis",
    "Cash Analysis",
    "Recurring Transactions",
    "Transition Highlight",
  ];
  const tabButtons = ["Deposit", "Withdrawal"];
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
  `;
  const InflowOutflowContainer = styled("div")`
    display: flex;
    flex-direction: column;
    background-color: ${BFMPalette.white25};
    gap: 16px;
  `;
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedButton, setSelectedButton] = useState(tabButtons[0]);

  const BadgeGroup = styled("div")`
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 16px;
    padding: 4px 10px 4px 4px;
    border: 1px solid ${BFMPalette.purple200};
    background-color: ${BFMPalette.purple250};
  `;
  const Badge = styled("div")`
    border-radius: 16px;
    border: 1px solid ${BFMPalette.purple100};
    background-color: ${BFMPalette.white};
    padding: 2px 10px;
  `;
  const Content = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  `;

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
      {selectedTab === tabs[0] ? (
        <TabContainer2>
          <HorizontalTabs
            tabs={tabButtons}
            selectedTab={selectedButton}
            onTabChange={setSelectedButton}
          />
        </TabContainer2>
      ) : (
        (selectedTab === tabs[2] || selectedTab === tabs[3]) && (
          <TabContainer2>
            <HorizontalTabs
              tabs={tabButtons}
              selectedTab={selectedButton}
              onTabChange={setSelectedButton}
            />
            <BadgeGroup>
              <Badge>
                {selectedTab === tabs[2] ? (
                  <H4 color={BFMPalette.purple900}>
                    Total Monthly Recurring Inflow
                  </H4>
                ) : (
                  <H4 color={BFMPalette.purple900}>Average Inflow</H4>
                )}
              </Badge>
              <Content>
                <MediumBoldHeading color={BFMPalette.purple600}>
                  HKD 27,776.90
                </MediumBoldHeading>
                <Image
                  src="/images/info.png"
                  alt="circle"
                  width={16}
                  height={16}
                />
              </Content>
            </BadgeGroup>
          </TabContainer2>
        )
      )}
      {selectedTab === tabs[0] && (
        <DataTable
          data={depositData}
          columns={BuyerSupplierAnalysisColumns}></DataTable>
      )}
      {selectedTab === tabs[1] && (
        <InflowOutflowContainer>
          <DataTable
            title="Inflows"
            data={inflowData}
            columns={InflowsColumns}></DataTable>
          <DataTable
            title="Outflows"
            data={outflowData}
            columns={OutflowsColumns}></DataTable>
        </InflowOutflowContainer>
      )}
      {selectedTab === tabs[2] && (
        <DataTable
          data={recurringTransData}
          columns={RecurringTransactionColumns}></DataTable>
      )}
      {selectedTab === tabs[3] && (
        <DataTable
          data={highlightData}
          columns={TransitionHighlightColumns}></DataTable>
      )}
    </Container>
  );
}
