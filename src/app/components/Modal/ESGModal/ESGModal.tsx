import { BFMPalette } from "@/Theme";
import {
  H2,
  H3Secondary,
  Header,
  MediumSpacedText,
  TextTitle,
} from "@/Typography";
import useIsMobile from "@/useIsMobile";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { ESGNotification } from "../../../../../Interfaces";
import HorizontalTabs from "../../HorizontalTabs/HorizontalTabs";
import DetailsModal from "../Modal";

type ESGModalProps = {
  closeModal: () => void;
  notification: ESGNotification | null;
};

const TabsContainer = styled("div")`
  padding: 20px;
  padding-bottom: 0;
`;
const ModalContent = styled("div")`
  padding: 20px;
  overflow-y: auto;
`;
const OverviewContent = styled("div")`
  display: flex;
  flex-direction: column;
`;
const AlertContainer = styled("div")`
  border-radius: 12px;
  border: 1px solid ${BFMPalette.green600};
  background-color: ${BFMPalette.green90};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const SubContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Button = styled(H3Secondary)`
  cursor: pointer;
`;
const TitleContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px 0;
`;
const UrlText = styled(MediumSpacedText)`
  word-break: break-all;
  overflow-wrap: anywhere;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const URL = styled(UrlText)`
  padding-left: 44px;
`;
const Circle = styled("div")`
  width: 36px;
  height: 36px;
  background-color: ${BFMPalette.green50};
  border-radius: 1000px;
  padding: 8px;
`;
const TaskContainer = styled("div")`
  display: flex;
  flex-direction: column;
  padding: 16px;
  padding-bottom: 0;
`;
const Line = styled("div")`
  border-bottom: 1px solid ${BFMPalette.gray100};
  padding-bottom: 16px;
`;
const Task = styled("div")`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const TaskDescription = styled(MediumSpacedText)`
  padding-left: 44px;
`;
const Tasks = styled("div")`
  display: flex;
  flex-direction: column;
  border: 1px solid ${BFMPalette.gray100};
  border-radius: 12px;
  background-color: ${BFMPalette.white};
`;
export default function ESGModal({ closeModal, notification }: ESGModalProps) {
  const tabs = ["Overview", "Tasks"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const link = notification?.didYouKnow?.match(/href='(.*?)'/);
  const descriptionLink = notification?.description?.match(/href='(.*?)'/);
  const descriptionUrl = descriptionLink ? descriptionLink[1] : null;
  const learnMoreUrl = link ? link[1] : null;

  let bannerSrc = "";

  switch (notification?.type) {
    case "ELECTRIC_VEHICLE":
      bannerSrc = "/images/cars.png";
      break;
    case "EFFICIENT_AIR_CONDITIONER":
      bannerSrc = "/images/efficient_air.png";
      break;
    case "EFFICIENT_LIGHTING":
      bannerSrc = "/images/efficient_lightning.png";
      break;
    case "REDUCE_FREIGHT_EMISSIONS":
      bannerSrc = "/images/reduce_freight.png";
      break;
    default:
      bannerSrc = "/images/cars.png";
  }
  const isMobile = useIsMobile(768);
  return (
    <DetailsModal
      width={!isMobile ? "600px" : "100%"}
      height={!isMobile ? "828px" : "100vh"}
      marginTop={isMobile ? "40px" : "0"}
      headerText="Switch your fleet to electric vehicles"
      modalIsOpen={true}
      closeModal={closeModal}>
      <TabsContainer>
        <HorizontalTabs
          tabs={tabs}
          width="100%"
          selectedTab={selectedTab}
          onTabChange={(tab) => setSelectedTab(tab)}
        />
      </TabsContainer>

      <ModalContent>
        {selectedTab === tabs[0] ? (
          <OverviewContent>
            <Image
              src={bannerSrc}
              alt="banner"
              layout="responsive"
              width={560}
              height={200}
            />
            <TitleContainer>
              <TextTitle color={BFMPalette.black800}>
                {notification?.title || ""}
              </TextTitle>
              <MediumSpacedText
                dangerouslySetInnerHTML={{
                  __html: notification?.description || "",
                }}
                color={BFMPalette.black800}
              />
              {descriptionUrl && (
                <UrlText
                  onClick={() => window.open(descriptionUrl, "_blank")}
                  color={BFMPalette.black800}>
                  {descriptionUrl}
                </UrlText>
              )}
            </TitleContainer>

            <AlertContainer>
              <Image
                src="/images/check.png"
                alt="tick"
                width={40}
                height={40}
              />
              <SubContainer>
                <H2 color={BFMPalette.black400}>Did you know?</H2>
                <MediumSpacedText
                  dangerouslySetInnerHTML={{
                    __html: notification?.didYouKnow || "",
                  }}
                />
              </SubContainer>
              {learnMoreUrl && (
                <Button
                  onClick={() => window.open(learnMoreUrl, "_blank")}
                  color={BFMPalette.purple600}>
                  Learn more
                </Button>
              )}
            </AlertContainer>
          </OverviewContent>
        ) : (
          <Tasks>
            {notification?.tasks.map((task, index) => {
              const linkMatch = task.description?.match(/href=['"](.*?)['"]/);
              const taskLink = linkMatch ? linkMatch[1] : null;
              return (
                <TaskContainer key={task.title}>
                  <Task>
                    <Circle>
                      <Image
                        src="/images/task.png"
                        alt="tick"
                        width={20}
                        height={20}
                      />
                    </Circle>
                    <Header color={BFMPalette.black800}>{task.title}</Header>
                  </Task>

                  <TaskDescription color={BFMPalette.black800}>
                    {task.description.replace(/<a[^>]*>.*?<\/a>/gi, "")}
                  </TaskDescription>

                  {taskLink && (
                    <URL
                      onClick={() => window.open(taskLink, "_blank")}
                      color={BFMPalette.black800}>
                      {taskLink}
                    </URL>
                  )}
                  {index !== notification.tasks.length - 1 && <Line />}
                </TaskContainer>
              );
            })}
          </Tasks>
        )}
      </ModalContent>
    </DetailsModal>
  );
}
