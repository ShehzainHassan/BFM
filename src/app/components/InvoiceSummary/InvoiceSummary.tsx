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
import { useInvoiceSummaryColumns } from "../Table/InvoiceSummaryTable/InvoiceSummaryTableColumns";

export default function InvoiceSummary() {
  const { accounts, invoicesSummary } = useData();

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
        key="invoices"
        data={invoicesSummary}
        columns={useInvoiceSummaryColumns()}
        columnWidths={[
          "2.02fr",
          "2.02fr",
          "2.02fr",
          "2.02fr",
          "2.02fr",
          "1fr",
          "0.9fr",
        ]}
      />
    </PaymentsContainer>
  );
}
