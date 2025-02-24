"use client";
import { Transaction } from "@/app/components/Table/Transactions/transactions";
import { ITEMS_PER_PAGE } from "@/constants";
import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import HorizontalTabs from "./components/HorizontalTabs/HorizontalTabs";
import InflowOutflow from "./components/InflowOutflow/InflowOutflow";
import Notifications from "./components/Notifications/Notifications";
import Pagination from "./components/Pagination/Pagination";
import Payment from "./components/Payments/Payment";
import Search from "./components/Search/Search";
import { AccountData } from "./components/Table/Accounts/accounts";
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
  const tabs = ["Transactions", "Accounts"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const { notifications, transactions, accounts } = useData();

  const [currentPage, setCurrentPage] = useState(0);

  const data: Transaction[] | AccountData[] =
    selectedTab === tabs[0] ? transactions : accounts;

  const offset = currentPage * ITEMS_PER_PAGE;
  const paginatedData = data.slice(offset, offset + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
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
        <Notifications notifications={notifications.notifications} />
      </MainContainer>
      <PaymentsContainer>
        <Header>
          <HorizontalTabs
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={(tab) => {
              setSelectedTab(tab);
              setCurrentPage(0);
            }}
          />
          <SearchAndFilter>
            {selectedTab === tabs[0] ? (
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
        {selectedTab === tabs[0] ? (
          <DataTable
            key="transactions"
            data={paginatedData as Transaction[]}
            columns={TransactionColumns}
            columnWidths={["1.2fr", "4fr", "2fr", "1.5fr", "2fr", "1.3fr"]}
          />
        ) : (
          <DataTable
            key="accounts"
            data={paginatedData as AccountData[]}
            columns={AccountsColumns}
            searchQuery={searchQuery}
            searchColumns={["bank", "account"]}
            columnWidths={["2.5fr", "2.5fr", "2.5fr", "2.5fr", "2fr"]}
          />
        )}
      </PaymentsContainer>
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </Container>
  );
}
