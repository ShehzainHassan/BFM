"use client";
import InflowOutflow from "./components/InflowOutflow/InflowOutflow";
import Notifications from "./components/Notifications/Notifications";
import Payment from "./components/Payments/Payment";
import styled from "styled-components";
import TextContainer from "./components/TextContainer/TextContainer";
import { DataCell } from "./components/Table/Table";
import HorizontalTabs from "./components/HorizontalTabs/HorizontalTabs";
import Search from "./components/Search/Search";
import { BFMPalette } from "@/Theme";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { BodyText, H3, H3Secondary, H4 } from "@/Typography";
import DataTable from "./components/Table/Table";
import { useState } from "react";
import { Transaction, transactionData } from "@/transactions";
import { AccountData, accountsData } from "@/accounts";
import DetailsModal from "./components/Modal/Modal";
import TransactionDetails from "./components/TransactionDetails/TransactionDetails";

const accountsColumns: ColumnDef<AccountData>[] = [
  {
    accessorKey: "bank",
    header: () => (
      <HeaderCell>
        <H3 color={BFMPalette.gray700}>BANK</H3>
      </HeaderCell>
    ),
    cell: ({ row }) => (
      <BankText>
        <BodyText color={BFMPalette.black800}>{row.original.bank}</BodyText>
      </BankText>
    ),
  },
  {
    accessorKey: "account",
    header: () => (
      <HeaderCell>
        <H3 color={BFMPalette.gray700}>ACCOUNT NAME</H3>
      </HeaderCell>
    ),
    cell: ({ row }) => {
      const { name, number } = row.original.account;
      return (
        <AccountText>
          <H4 color={BFMPalette.black800}>{name}</H4>
          <BodyText>{number}</BodyText>
        </AccountText>
      );
    },
  },
  {
    accessorKey: "type",
    header: () => (
      <HeaderCell>
        <H3 color={BFMPalette.gray700}>ACCOUNT TYPE</H3>
      </HeaderCell>
    ),
    cell: ({ row }) => (
      <BankText>
        <BodyText color={BFMPalette.black800}>
          {row.original.accountType}
        </BodyText>
      </BankText>
    ),
  },
  {
    accessorKey: "balance",
    header: () => (
      <HeaderCell>
        <H3 color={BFMPalette.gray700}>BALANCE</H3>
      </HeaderCell>
    ),
    cell: ({ row }) => (
      <BankText>
        <BodyText color={BFMPalette.black800}>{row.original.balance}</BodyText>
      </BankText>
    ),
  },
  {
    accessorKey: "amount",
    header: () => (
      <HeaderCell>
        <H3 color={BFMPalette.gray700}>AMOUNT / HKD EQV</H3>
      </HeaderCell>
    ),
    cell: ({ row }) => {
      const { currency, value, equivalent } = row.original.amount;
      return (
        <AmountText>
          <H3Secondary color={BFMPalette.purple375}>
            {currency} {value}
          </H3Secondary>
          <H3Secondary color={BFMPalette.purple375}>{equivalent}</H3Secondary>
        </AmountText>
      );
    },
  },
];
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
  background-color: cadetblue;
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
export const HeaderCell = styled.div`
  padding: 12px 20px;
  height: 100%;
  text-align: left;
  background-color: ${BFMPalette.white};
`;
const ImageContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 200px;
  background-color: ${BFMPalette.purple100};
`;

const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DescriptionText = styled.div`
  display: flex;
  flex-direction: column;
`;

const AmountText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BankText = styled.div`
  font-weight: bold;
  color: black;
`;

const AccountText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export default function Home() {
  const [selectedTab, setSelectedTab] = useState("Transactions");
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  const transactionColumns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "date",
      header: () => (
        <HeaderCell>
          <H3 color={BFMPalette.gray700}>DATE</H3>
        </HeaderCell>
      ),
      cell: ({ row }) => (
        <DataCell>
          <BodyText color={BFMPalette.black800}>{row.original.date}</BodyText>
        </DataCell>
      ),
    },
    {
      accessorKey: "description",
      header: () => (
        <HeaderCell>
          <H3 color={BFMPalette.gray700}>DESCRIPTIONS</H3>
        </HeaderCell>
      ),
      cell: ({ row }) => {
        const { imgSrc, title, subtitle } = row.original.description;
        return (
          <DescriptionWrapper>
            <ImageContainer>
              <Image src={imgSrc} alt="icon" width={20} height={20} />
            </ImageContainer>
            <DescriptionText>
              <H4 color={BFMPalette.black800}>{title}</H4>
              <BodyText>{subtitle}</BodyText>
            </DescriptionText>
          </DescriptionWrapper>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => (
        <HeaderCell>
          <H3 color={BFMPalette.gray700}>AMOUNT / HKD EQV</H3>
        </HeaderCell>
      ),
      cell: ({ row }) => {
        const { currency, value, equivalent } = row.original.amount;
        return (
          <AmountText>
            <H3Secondary color={BFMPalette.purple375}>
              {currency} {value}
            </H3Secondary>
            <H3Secondary color={BFMPalette.purple375}>{equivalent}</H3Secondary>
          </AmountText>
        );
      },
    },
    {
      accessorKey: "bank",
      header: () => (
        <HeaderCell>
          <H3 color={BFMPalette.gray700}>BANK</H3>
        </HeaderCell>
      ),
      cell: ({ row }) => (
        <BankText>
          <BodyText color={BFMPalette.black800}>{row.original.bank}</BodyText>
        </BankText>
      ),
    },
    {
      accessorKey: "account",
      header: () => (
        <HeaderCell>
          <H3 color={BFMPalette.gray700}>ACCOUNT</H3>
        </HeaderCell>
      ),
      cell: ({ row }) => {
        const { type, number } = row.original.account;
        return (
          <AccountText>
            <H4 color={BFMPalette.black800}>{type}</H4>
            <BodyText>{number}</BodyText>
          </AccountText>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => (
        <HeaderCell>
          <H3 color={BFMPalette.gray700}></H3>
        </HeaderCell>
      ),
      cell: () => (
        <Image
          src="/images/Button utility.png"
          alt="icon"
          width={32}
          height={32}
          style={{ cursor: "pointer" }}
          // onClick={() => setModalIsOpen(true)}
        />
      ),
    },
  ];

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
            onTabChange={setSelectedTab}
          />
          <SearchAndFilter>
            {selectedTab === "Transactions" ? (
              <Search placeholder="Search Transactions..." />
            ) : (
              <Search placeholder="Search by bank/account" />
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
            columns={transactionColumns}
          />
        ) : (
          <DataTable
            key="accounts"
            data={accountsData}
            columns={accountsColumns}
          />
        )}
        {/* <DetailsModal
          headerText="Transaction Details"
          modalIsOpen={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}>
          <TransactionDetails />
        </DetailsModal> */}
      </PaymentsContainer>
    </Container>
  );
}
