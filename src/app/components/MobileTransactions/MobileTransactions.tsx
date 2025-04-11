import styled from "styled-components";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import { useState } from "react";
import { AccountData, Transaction } from "../../../../Interfaces";
import { ITEMS_PER_PAGE } from "@/constants";
import { useData } from "@/DataContext";
import Pagination from "../Pagination/Pagination";
import TransactionCard from "./TransactionCard/TransactionCard";
import AccountCard from "./AccountCard/AccountCard";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
`;
const Space = styled("div")`
  padding: 50px 0;
`;
export default function MobileTransactions() {
  const tabs = ["Transactions", "Accounts"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const { transactions, accounts } = useData();

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
      <HorizontalTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={(tab) => {
          setSelectedTab(tab);
          setCurrentPage(0);
        }}
      />
      {paginatedData.map((item, index) => {
        if (selectedTab === tabs[0]) {
          return <TransactionCard key={index} data={item as Transaction} />;
        } else {
          return <AccountCard key={index} data={item as AccountData} />;
        }
      })}
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />

      <Space />
    </Container>
  );
}
