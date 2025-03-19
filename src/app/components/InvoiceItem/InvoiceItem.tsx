import Image from "next/image";
import { useState } from "react";
import InputWithLabel from "../InputWithLabel/Input";
import InputCurrency from "../InputCurrency/InputCurrency";
import styled from "styled-components";
import { BFMPalette } from "@/Theme";
import { H3Secondary } from "@/Typography";
import { useData } from "@/DataContext";

const AdditionalInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 16px 16px 16px;
  border-radius: 12px;
  border: 1px solid ${BFMPalette.gray100};
  background-color: ${BFMPalette.white25};
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${BFMPalette.white25};
  width: fit-content;
  border: none;
`;

export default function InvoiceItem() {
  const {
    currency,
    handleCurrencyChange,
    items,
    addItem,
    removeItem,
    updateItem,
  } = useData();

  return (
    <Container>
      {items.map((item) => (
        <AdditionalInfoContainer key={item.id}>
          <Image
            src="/images/dots-grid.png"
            alt="drag"
            width={24}
            height={24}
          />
          <InputWithLabel
            label="Description"
            showError={false}
            showLabel={false}
            showAsterik={false}
            placeholder="Enter item descriptions"
            value={item.description}
            onChange={(e) => updateItem(item.id, "description", e.target.value)}
          />
          <InputWithLabel
            showLabel={false}
            showAsterik={false}
            placeholder="Qty"
            type="number"
            value={item.qty}
            onChange={(e) => updateItem(item.id, "qty", e.target.value)}
          />
          <InputCurrency
            showLabel={false}
            showAsterik={false}
            price={item.price}
            onChangeAmount={(e) => updateItem(item.id, "price", e.target.value)}
            currency={currency}
            onChangeCurrency={(newCurrency) =>
              handleCurrencyChange(newCurrency)
            }
          />
          <Image
            style={{ cursor: "pointer" }}
            src="/images/delete.png"
            alt="delete"
            width={20}
            height={20}
            onClick={() => removeItem(item.id)}
          />
        </AdditionalInfoContainer>
      ))}
      <AddButton onClick={addItem}>
        <Image src="/images/add.png" alt="add" width={16} height={16} />
        <H3Secondary color={BFMPalette.purple600}>Add new items</H3Secondary>
      </AddButton>
    </Container>
  );
}
