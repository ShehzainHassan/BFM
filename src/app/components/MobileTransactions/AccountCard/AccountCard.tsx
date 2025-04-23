import { HKD_EQUIVALANT } from "@/constants";
import { BFMPalette } from "@/Theme";
import { H2, H3Secondary, H5 } from "@/Typography";
import { formatCurrency } from "@/utils";
import { AccountData } from "../../../../../Interfaces";
import {
  Amount,
  AmountContainer,
  Card,
  Container,
  Description_BtnContainer,
  DescriptionContainer,
  MainContainer,
} from "../TransactionCard/TransactionCard";

type AccountCardProps = {
  data: AccountData;
};
export default function AccountCard({ data }: AccountCardProps) {
  return (
    <MainContainer>
      <Container>
        <Card>
          <Description_BtnContainer>
            <DescriptionContainer>
              <H2 color={BFMPalette.black800}>{data.account}</H2>
            </DescriptionContainer>
          </Description_BtnContainer>
        </Card>
        <Amount>
          <AmountContainer>
            <H5>Amount</H5>
            <H3Secondary color={BFMPalette.black800}>
              {formatCurrency(`${HKD_EQUIVALANT}${data.amount.value}`, 2)}
            </H3Secondary>
          </AmountContainer>
          <AmountContainer>
            <H5>HKD Equivalent</H5>
            <H3Secondary color={BFMPalette.black800}>
              {formatCurrency(
                `${HKD_EQUIVALANT}${data.amount.HKDEquivalent}`,
                2
              )}
            </H3Secondary>
          </AmountContainer>
        </Amount>
      </Container>
    </MainContainer>
  );
}
