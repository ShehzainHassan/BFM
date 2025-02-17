"use client";
import { accountsData } from "@/app/components/Table/Accounts/accounts";
import { transactionData } from "@/app/components/Table/Transactions/transactions";
import { BFMPalette } from "@/Theme";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import HorizontalTabs from "./components/HorizontalTabs/HorizontalTabs";
import InflowOutflow from "./components/InflowOutflow/InflowOutflow";
import Notifications from "./components/Notifications/Notifications";
import Payment from "./components/Payments/Payment";
import Search from "./components/Search/Search";
import { AccountsColumns } from "./components/Table/Accounts/AccountsColumns";
import DataTable from "./components/Table/Table";
import { TransactionColumns } from "./components/Table/Transactions/TransactionsColumns";
import TextContainer from "./components/TextContainer/TextContainer";

const MainContainer = styled("div")`
  display: grid;
  grid-template-columns: 8.55fr 3.45fr;
  gap: 20px;
  max-width: 1300px;
`;
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;
const SubContainer = styled("div")`
  display: grid;
  grid-template-columns: 6.2fr 5.8fr;
  gap: 20px;
`;
const Header = styled("div")`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${BFMPalette.gray100};
  background-color: ${BFMPalette.white25};
  padding: 14px 16px;
`;
const PaymentsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  max-width: 1300px;
`;
const SearchAndFilter = styled("div")`
  display: flex;
  gap: 12px;
`;
const Filter = styled("div")`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid ${BFMPalette.purple400};
`;

export const AccountText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export default function Home() {
  const [selectedTab, setSelectedTab] = useState("Transactions");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Container>
      <MainContainer>
        <Container>
          <SubContainer>
            <TextContainer />
            <InflowOutflow />
          </SubContainer>
          <Payment />
        </Container>
        <Notifications />
      </MainContainer>
      <PaymentsContainer>
        <Header>
          <HorizontalTabs
            tabs={["Transactions", "Accounts"]}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
          <SearchAndFilter>
            {selectedTab === "Transactions" ? (
              <Search
                placeholder="Search Transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            ) : (
              <Search
                placeholder="Search by bank/account"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
            <Filter>
              <Image
                src="/images/filter.png"
                alt="filter"
                width={20}
                height={20}
              />
            </Filter>
          </SearchAndFilter>
        </Header>
        {selectedTab === "Transactions" ? (
          <DataTable
            key="transactions"
            data={transactionData}
            columns={TransactionColumns}
          />
        ) : (
          <DataTable
            key="accounts"
            data={accountsData}
            columns={AccountsColumns}
            searchQuery={searchQuery}
            searchColumns={["bank", "account"]}
          />
        )}
      </PaymentsContainer>
    </Container>
  );
}
