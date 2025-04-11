import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import { BodyText, H2, H3Secondary, H5 } from "@/Typography";
import styled from "styled-components";
import {
  AccountData,
  Transaction,
  TransactionCardProps,
} from "../../../../../Interfaces";
import { formatCurrency, formatDate, formatString } from "@/utils";
import { HKD_EQUIVALANT } from "@/constants";
import DetailsModal from "../../Modal/Modal";
import TransactionDetails from "../../TransactionDetails/TransactionDetails";
import { useState } from "react";

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
  border: 1px solid ${BFMPalette.gray100};
  background-color: ${BFMPalette.white25};
  border-radius: 12px;
`;

export const Icon = styled("img")`
  width: 40px;
  height: 40px;
`;
export const DescriptionContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const Button = styled("img")`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid ${BFMPalette.gray100};
`;
export const Card = styled("div")`
  display: flex;
  gap: 10px;
  padding: 12px;
  border-bottom: 1px solid ${BFMPalette.gray200};
`;
export const Description_BtnContainer = styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;
export const Amount = styled("div")`
  display: flex;
  gap: 24px;
  padding: 12px;
`;
export const AmountContainer = styled("div")`
  display: flex;
  flex-direction: column;
`;
export const MainContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px 0px;
`;
export default function TransactionCard({
  data,
}: TransactionCardProps<Transaction>) {
  const [selected, setSelected] = useState("Details");
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (type: string) => {
    setSelected(type);
    setOpenModal(true);
  };
  return (
    <MainContainer>
      <H3Secondary color={BFMPalette.black800}>
        {formatDate(data.date)}
      </H3Secondary>
      <Container>
        <Card>
          <Icon src={data.description.imgSrc} alt="icon" />
          <Description_BtnContainer>
            <DescriptionContainer>
              <H2 color={BFMPalette.black800}>{data.description.title}</H2>
              <BodyText>
                {formatString(data.description.subtitle, true)}
              </BodyText>
            </DescriptionContainer>
            <Button
              src="/images/chevron-right.png"
              alt="icon"
              onClick={() => setOpenModal(true)}
            />
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
      <DetailsModal
        marginTop="40px"
        width="100%"
        position="middle"
        headerText="Transaction Details"
        modalIsOpen={openModal}
        closeModal={() => setOpenModal(false)}>
        <TransactionDetails selected={selected} selectedRow={data} />
      </DetailsModal>
    </MainContainer>
  );
}
