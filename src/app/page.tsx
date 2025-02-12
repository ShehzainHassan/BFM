"use client";
import InflowOutflow from "./components/InflowOutflow/InflowOutflow";
import Notifications from "./components/Notifications/Notifications";
import Payment from "./components/Payments/Payment";
import styled from "styled-components";
import TextContainer from "./components/TextContainer/TextContainer";
import TransactionTable from "./components/Table/Table";
import HorizontalTabs from "./components/HorizontalTabs/HorizontalTabs";
import Search from "./components/Search/Search";
import { BFMPalette } from "@/Theme";
import Image from "next/image";
import { Transaction } from "@/interfaces";

const data: Transaction[] = [
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/receipt-check.png",
      title: "HKCSL Telecom Ltd",
      subtitle: "Bills",
    },
    amount: {
      currency: "USD",
      value: "10,000.00",
      equivalent: "HKD 10,000.00",
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: "10,000.00",
      equivalent: "HKD 10,000.00",
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: "10,000.00",
      equivalent: "HKD 10,000.00",
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: "10,000.00",
      equivalent: "HKD 10,000.00",
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: "10,000.00",
      equivalent: "HKD 10,000.00",
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: "10,000.00",
      equivalent: "HKD 10,000.00",
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: "10,000.00",
      equivalent: "HKD 10,000.00",
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
  {
    date: "12 Oct 2024",
    description: {
      imgSrc: "/images/building-06.png",
      title: "Cyberport HC-009w8274",
      subtitle: "Rent",
    },
    amount: {
      currency: "USD",
      value: "10,000.00",
      equivalent: "HKD 10,000.00",
    },
    bank: "Sample Bank",
    account: {
      type: "Sample HKD Savings",
      number: "(666111***888)",
    },
  },
];

const columns = ["DATE", "DESCRIPTIONS", "AMOUNT / HKD EQV", "BANK", "ACCOUNT"];

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
export default function Home() {
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
          <HorizontalTabs tabs={["Transactions", "Accounts"]} />
          <SearchAndFilter>
            <Search placeholder="Search Transactions..." />
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
        <TransactionTable data={data} />
      </PaymentsContainer>
    </Container>
  );
}
