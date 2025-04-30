"use client";

import { useEffect, useState } from "react";
import { useInvoiceItem } from "@/InvoiceItemContext";
import { BFMPalette } from "@/Theme";
import { H3Secondary } from "@/Typography";
import Image from "next/image";
import styled from "styled-components";
import InputCurrency from "../../InputCurrency/InputCurrency";
import InputWithLabel from "../../InputWithLabel/Input";
import { Item } from "@/Interfaces/Interfaces";

const AdditionalInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 8fr 2fr 1fr 0.5fr;
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
  cursor: pointer;
`;

export default function InvoiceItem() {
  const {
    currency,
    handleCurrencyChange,
    items,
    addItem,
    removeItem,
    updateItem,
  } = useInvoiceItem();

  const [localItems, setLocalItems] = useState(() =>
    items.map((item) => ({ ...item }))
  );

  useEffect(() => {
    setLocalItems(items.map((item) => ({ ...item })));
  }, [items]);

  const handleLocalChange = (
    id: number,
    field: string,
    value: Item[keyof Item]
  ) => {
    setLocalItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const commitChange = (id: number) => {
    const editedItem = localItems.find((item) => item.id === id);
    if (editedItem) {
      updateItem(id, "description", editedItem.description);
      updateItem(id, "qty", editedItem.qty.toString());
      updateItem(id, "price", editedItem.price.toString());
    }
  };

  return (
    <Container>
      {localItems.map((item) => (
        <AdditionalInfoContainer key={item.id}>
          <Image
            src="/images/dots-grid.png"
            alt="drag"
            width={24}
            height={24}
          />
          <InputWithLabel
            label="Description"
            showLabel={false}
            showAsterik={false}
            placeholder="Enter item descriptions"
            value={item.description}
            onChange={(e) =>
              handleLocalChange(item.id, "description", e.target.value)
            }
            onBlur={() => commitChange(item.id)}
          />
          <InputWithLabel
            showLabel={false}
            showAsterik={false}
            placeholder="Qty"
            type="number"
            minimum={1}
            value={isNaN(Number(item.qty)) ? 1 : item.qty}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1 || e.target.value === "") {
                handleLocalChange(item.id, "qty", e.target.value);
              }
            }}
            onBlur={() => commitChange(item.id)}
          />

          <InputCurrency
            $maxWidth="150px"
            showLabel={false}
            showAsterik={false}
            price={item.price}
            onChangeAmount={(e) => {
              const value = Number(e.target.value);
              if (value >= 0 || e.target.value === "") {
                handleLocalChange(item.id, "price", e.target.value);
              }
            }}
            onBlur={() => commitChange(item.id)}
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
