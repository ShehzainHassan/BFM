"use client";
import { useData } from "@/DataContext";
import { BFMPalette } from "@/Theme";
import useTranslation from "@/translations";
import { H1 } from "@/Typography";
import styled from "styled-components";
import NavButton from "../Button/Primary/NavButton";
import { generateInvoiceNumber } from "@/utils";
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  background-color: ${BFMPalette.purple1000};
  width: 100%;
  height: 150px;
  gap: 16px;
  padding: 32px;
`;
const SubContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  padding: 4px;
  background-color: ${BFMPalette.purple950};
`;

const NavContent = styled("p")<{ $isSelected: boolean }>`
  font-weight: 600;
  line-height: 20px;
  font-size: 14px;
  color: ${BFMPalette.white};
  border-radius: 6px;
  padding: 8px 12px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? BFMPalette.purple500 : "transparent"};
  &:hover {
    background-color: ${({ $isSelected }) =>
      !$isSelected ? BFMPalette.purple1000 : ""};
  }
  cursor: pointer;
`;

const Header = styled("div")`
  display: flex;
  justify-content: space-between;
`;
const ButtonsContainer = styled("div")`
  display: flex;
  gap: 16px;
`;

interface NavbarProps {
  navItems: { label: string }[];
}
export default function Navbar({ navItems }: NavbarProps) {
  const { t } = useTranslation();
  const {
    selectedTab,
    setSelectedTab,
    isCreatingInvoice,
    setIsCreatingInvoice,
    items,
    invoiceSubject,
    invoiceDetails,
    dueDate,
    hasPaymentChecked,
    bankDetails,
    companyName,
    companyAddress,
    discount,
    subTotal,
    finalTotal,
  } = useData();
  const saveInvoice = () => {
    const storedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
    const newInvoice = {
      invoiceNumber: generateInvoiceNumber(),
      companyName: companyName,
      address: companyAddress,
      invoiceDate: "01 October 2024",
      dueDate: dueDate,
      invoiceDetail: invoiceDetails,
      items: items || [],
      subTotal: subTotal,
      discount: discount,
      amountDue: finalTotal,
    };
    const updatedInvoices = [...storedInvoices, newInvoice];

    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  };
  const getPageTitle = () => {
    if (
      selectedTab === t("navbar.tabs.dashboard") ||
      selectedTab === t("navbar.tabs.analytics")
    )
      return t("navbar.titles.dashboard");
    if (selectedTab === t("navbar.tabs.invoices") && !isCreatingInvoice)
      return t("navbar.titles.invoices");
    if (selectedTab === t("navbar.tabs.calendar"))
      return t("navbar.titles.calendar");
    if (selectedTab === t("navbar.tabs.esg")) return t("navbar.titles.esg");
    if (isCreatingInvoice) {
      return t("navbar.titles.create_Invoice");
    }

    return "Page Title";
  };
  const validateInvoice = (): boolean => {
    if (items.length > 0) {
      const allItemsValid = items.every(
        (item) =>
          item.description && item.qty > 0 && item.price > 0 && item.currency
      );
      if (!allItemsValid) {
        return false;
      }
    }
    if (!invoiceSubject.trim() || !invoiceDetails.trim() || !dueDate.trim()) {
      return false;
    }
    if (hasPaymentChecked) {
      if (
        !bankDetails.bankName.trim() ||
        !bankDetails.name.trim() ||
        !bankDetails.accountNumber.trim() ||
        !bankDetails.SWIFTCode.trim() ||
        !bankDetails.bankAddress.trim()
      ) {
        return false;
      }
    }
    return true;
  };

  const pageTitle = getPageTitle();

  return (
    <Container>
      <Header>
        <H1 color={BFMPalette.white}>{pageTitle}</H1>
        <ButtonsContainer>
          {(selectedTab === t("navbar.tabs.calendar") ||
            selectedTab === t("navbar.tabs.esg")) && (
            <NavButton
              $textColor={BFMPalette.purple600}
              $bgColor={BFMPalette.white}
              imagePosition="right"
              imageSrc="/images/clock.png">
              {t("nav_buttons.schedule")}
            </NavButton>
          )}
          {(selectedTab === t("navbar.tabs.calendar") ||
            selectedTab === t("navbar.tabs.esg")) && (
            <NavButton
              $textColor={BFMPalette.white}
              $borderColor={BFMPalette.purple500}
              $bgColor={BFMPalette.purple500}
              imageSrc="/images/plus.png">
              {t("nav_buttons.createEvent")}
            </NavButton>
          )}
          {selectedTab === t("navbar.tabs.invoices") && !isCreatingInvoice && (
            <NavButton
              $textColor={BFMPalette.white}
              $borderColor={BFMPalette.purple500}
              $bgColor={BFMPalette.purple500}
              imageSrc="/images/plus.png"
              onClick={() => setIsCreatingInvoice(true)}>
              {t("nav_buttons.createInvoice")}
            </NavButton>
          )}
          {selectedTab === t("navbar.tabs.invoices") && isCreatingInvoice && (
            <NavButton
              $bgColor={BFMPalette.white}
              $textColor={BFMPalette.black400}>
              {t("nav_buttons.cancel")}
            </NavButton>
          )}
          {selectedTab === t("navbar.tabs.invoices") && isCreatingInvoice && (
            <NavButton
              $textColor={BFMPalette.white}
              $borderColor={BFMPalette.purple500}
              imagePosition="right"
              imageSrc="/images/arrow-right.png"
              isDisabled={!validateInvoice()}
              onClick={saveInvoice}>
              {t("nav_buttons.save_Invoice")}
            </NavButton>
          )}
        </ButtonsContainer>
      </Header>

      <SubContainer>
        {navItems.map(({ label }) => (
          <NavContent
            key={label}
            $isSelected={selectedTab === label}
            onClick={() => setSelectedTab(label)}>
            {label}
          </NavContent>
        ))}
      </SubContainer>
    </Container>
  );
}
