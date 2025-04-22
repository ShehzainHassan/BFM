"use client";
import { ITEMS_PER_PAGE } from "@/constants";
import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { AccountData, Transaction } from "../../../../Interfaces";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import InflowOutflow from "../InflowOutflow/InflowOutflow";
import Notifications from "../Notifications/Notifications";
import Pagination from "../Pagination/Pagination";
import Payment from "../Payments/Payment";
import Search from "../Search/Search";
import { useAccountsColumns } from "../Table/Accounts/AccountsColumns";
import DataTable from "../Table/Table";
import { useTransactionColumns } from "../Table/Transactions/TransactionsColumns";
import TextContainer from "../TextContainer/TextContainer";

const MainContainer = styled("div")`
  display: grid;
  grid-template-columns: 8.55fr 3.45fr;
  gap: 20px;
  max-width: 1300px;
  @media (max-width: 940px) {
    display: none;
  }
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
const MobileContainer = styled("div")`
  display: none;
  @media (max-width: 940px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 120px;
  }
`;
export const Header = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${BFMPalette.gray100};
  background-color: ${BFMPalette.white25};
  padding: 14px 16px;
`;
export const PaymentsContainer = styled("div")`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  max-width: 1300px;
  @media (max-width: 940px) {
    display: none;
  }
`;
export const SearchAndFilter = styled("div")`
  display: flex;
  gap: 12px;
`;
export const Filter = styled("div")`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid ${BFMPalette.purple400};
`;
const PaginationContainer = styled("div")`
  @media (max-width: 940px) {
    display: none;
  }
`;
export const AccountText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export default function Dashboard() {
  const tabs = ["Transactions", "Accounts"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const { notifications, transactions, accounts } = useData();
  const accountColumns = useAccountsColumns();
  const transactionColumns = useTransactionColumns();
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
        <Notifications notifications={notifications?.notifications ?? []} />
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
                style={{ cursor: "pointer" }}
                onClick={() => setSearchQuery("")}
              />
            </Filter>
          </SearchAndFilter>
        </Header>
        {selectedTab === tabs[0] ? (
          <DataTable
            key="transactions"
            data={paginatedData as Transaction[]}
            columns={transactionColumns}
            searchQuery={searchQuery}
            searchColumns={["description.title", "description.subtitle"]}
            columnWidths={["1.2fr", "4fr", "2fr", "1.5fr", "2fr", "1.3fr"]}
          />
        ) : (
          <DataTable
            key="accounts"
            data={paginatedData as AccountData[]}
            columns={accountColumns}
            searchQuery={searchQuery}
            searchColumns={["bank", "account"]}
            columnWidths={["2.5fr", "2.5fr", "2.5fr", "2.5fr", "2fr"]}
          />
        )}
      </PaymentsContainer>
      <PaginationContainer>
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </PaginationContainer>

      <MobileContainer>
        <TextContainer />
        <InflowOutflow />
        <Payment />
        <Notifications notifications={notifications?.notifications ?? []} />
      </MobileContainer>
    </Container>
  );
}
