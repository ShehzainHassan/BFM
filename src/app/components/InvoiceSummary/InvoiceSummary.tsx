import { TableTitle } from "@/Typography";
import {
  Filter,
  Header,
  PaymentsContainer,
  SearchAndFilter,
} from "../Dashboard/Dashboard";
import Search from "../Search/Search";
import Image from "next/image";
import { BFMPalette } from "@/Theme";
import DataTable from "../Table/Table";
import { AccountData } from "../Table/Accounts/accounts";
import { useData } from "@/DataContext";
import { useAccountsColumns } from "../Table/Accounts/AccountsColumns";

export default function InvoiceSummary() {
  const { accounts } = useData();

  return (
    <PaymentsContainer>
      <Header>
        <TableTitle color={BFMPalette.black800}>Invoice Summary</TableTitle>
        <SearchAndFilter>
          <Search placeholder="Search by invoice..." />

          <Filter>
            <Image
              src="/images/filter.png"
              alt="filter"
              width={20}
              height={20}
              style={{ cursor: "pointer" }}
            />
          </Filter>
        </SearchAndFilter>
      </Header>
      <DataTable
        key="accounts"
        data={accounts}
        columns={useAccountsColumns()}
        searchColumns={["bank", "account"]}
        columnWidths={["2.5fr", "2.5fr", "2.5fr", "2.5fr", "2fr"]}
      />
    </PaymentsContainer>
  );
}
