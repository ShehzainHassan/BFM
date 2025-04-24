import { BFMPalette } from "@/Theme";
import { SmallH3, SmallH5 } from "@/Typography";
import styled from "styled-components";
import { BankDetails } from "../../../Interfaces/Interfaces";

const TableWrapper = styled.div`
  background-color: ${BFMPalette.white};
`;

const TableContainer = styled.div`
  border: 1px solid ${BFMPalette.gray100};
  border-radius: 8px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  border-bottom: 1px solid ${BFMPalette.gray100};
  &:last-child {
    border-bottom: none;
  }
`;

const LabelCell = styled.div`
  padding: 6px 12px;
  background-color: ${BFMPalette.gray300};
  flex: 1;
`;

const ValueCell = styled.div`
  padding: 6px 12px;
  background-color: ${BFMPalette.white25};
  flex: 2;
`;

type InfoTableProps = {
  data: BankDetails;
};
export default function PaymentsTable({ data }: InfoTableProps) {
  const formattedData = [
    { label: "Bank Name", value: data.bankName },
    { label: "Name", value: data.name },
    { label: "Account Number", value: data.accountNumber },
    { label: "SWIFT Code", value: data.SWIFTCode },
    { label: "Bank Address", value: data.bankAddress },
  ];

  return (
    <TableWrapper>
      <TableContainer>
        {formattedData.map((row, index) => (
          <Row key={index}>
            <LabelCell>
              <SmallH3>{row.label}</SmallH3>
            </LabelCell>
            <ValueCell>
              <SmallH5 color={BFMPalette.black400}>{row.value}</SmallH5>
            </ValueCell>
          </Row>
        ))}
      </TableContainer>
    </TableWrapper>
  );
}
