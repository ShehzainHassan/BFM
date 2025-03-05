import styled from "styled-components";
import Comparison, { Payload } from "../Spending Comparison/Comparison";
import Card from "../Card/Card";
import Image from "next/image";
import { BFMPalette } from "@/Theme";
import { H2 } from "@/Typography";
import ButtonSecondary from "../Button/Secondary/ButtonSecondary";
import DueDate, { DueDatePayload } from "../DueDate/DueDate";
import useTranslation from "@/translations";

interface Notification {
  id: number;
  title: string;
  type: string;
  payload: Record<string, any>;
  description?: string;
}
interface NotificationsProps {
  notifications: Notification[];
}
const Container = styled("div")`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: linear-gradient(
    to right,
    ${BFMPalette.purple150} ${BFMPalette.white}
  );
`;
const CardContainer = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  background: linear-gradient(
    to right,
    ${BFMPalette.white},
    ${BFMPalette.white100}
  );
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;
const TitleContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 1px solid ${BFMPalette.purple200};
  background: linear-gradient(
    to right,
    ${BFMPalette.purple175},
    ${BFMPalette.white}
  );
`;
const ButtonContainer = styled("div")`
  display: flex;
  justify-content: flex-end;
`;
export default function Notifications({ notifications }: NotificationsProps) {
  const { t } = useTranslation();
  return (
    <Container>
      <TitleContainer>
        <Image src="/images/icon.png" alt="icon" width={40} height={40} />
        <H2 color={BFMPalette.black800}>{t("notification_title.dashboard")}</H2>
      </TitleContainer>
      <CardContainer>
        {notifications.map((notification) => {
          switch (notification.type) {
            case "CompareSpend":
              const spendingData = notification.payload as Payload;
              return (
                <Comparison key={notification.id} spendingData={spendingData} />
              );
            case "InvoiceDueSoon":
              return (
                <Card
                  key={notification.id}
                  image="/images/Frame 3.png"
                  title={notification.title}
                  description={notification.description}>
                  <DueDate payload={notification.payload as DueDatePayload} />
                  <ButtonContainer>
                    <ButtonSecondary />
                  </ButtonContainer>
                </Card>
              );

            default:
              return (
                <Card
                  key={notification.id}
                  image="/images/Frame 3.png"
                  title={notification.title}
                  description={notification.description}>
                  <ButtonContainer>
                    <ButtonSecondary />
                  </ButtonContainer>
                </Card>
              );
          }
        })}
      </CardContainer>
    </Container>
  );
}
