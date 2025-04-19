import { ITEMS_PER_PAGE } from "@/constants";
import { useData } from "@/DataContext";
import { useState } from "react";
import styled from "styled-components";
import { AccountData, Transaction } from "../../../../Interfaces";
import HorizontalTabs from "../HorizontalTabs/HorizontalTabs";
import TransactionDetailsModal from "../Modal/TransactionModal/TransactionModal";
import Pagination from "../Pagination/Pagination";
import AccountCard from "./AccountCard/AccountCard";
import TransactionCard from "./TransactionCard/TransactionCard";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Space = styled("div")`
  padding: 50px 0;
`;

export default function MobileTransactions() {
  const tabs = ["Transactions", "Accounts"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const { transactions, accounts } = useData();

  const data = selectedTab === tabs[0] ? transactions : accounts;
  const offset = currentPage * ITEMS_PER_PAGE;
  const paginatedData = data.slice(offset, offset + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleOpenDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
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
        return selectedTab === "Transactions" ? (
          <TransactionCard
            key={index}
            data={item as Transaction}
            onOpenDetails={handleOpenDetails}
          />
        ) : (
          <AccountCard key={index} data={item as AccountData} />
        );
      })}

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />

      <TransactionDetailsModal
        marginTop="40px"
        position="middle"
        width="100%"
        selectedTransaction={selectedTransaction}
        onClose={handleCloseModal}
      />
      <Space />
    </Container>
  );
}
