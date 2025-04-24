import { useInvoice } from "@/InvoiceContext";
import { BFMPalette } from "@/Theme";
import { TableTitle } from "@/Typography";
import Image from "next/image";
import { useState } from "react";
import {
  Filter,
  Header,
  PaymentsContainer,
  SearchAndFilter,
} from "../Dashboard/Dashboard";
import Search from "../Search/Search";
import { useInvoiceSummaryColumns } from "../Table/InvoiceSummaryTable/InvoiceSummaryTableColumns";
import DataTable from "../Table/Table";

export default function InvoiceSummary() {
  const { invoicesSummary } = useInvoice();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <PaymentsContainer>
      <Header>
        <TableTitle color={BFMPalette.black800}>Invoice Summary</TableTitle>
        <SearchAndFilter>
          <Search
            placeholder="Search by invoice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

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
      <DataTable
        key="invoices"
        data={invoicesSummary}
        columns={useInvoiceSummaryColumns()}
        searchQuery={searchQuery}
        searchColumns={["invoiceNo"]}
        columnWidths={[
          "2.0fr",
          "2.0fr",
          "2.0fr",
          "2.0fr",
          "2.0fr",
          "1.7fr",
          "1.3fr",
        ]}
      />
    </PaymentsContainer>
  );
}
