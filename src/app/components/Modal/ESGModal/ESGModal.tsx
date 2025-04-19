import { useState } from "react";
import HorizontalTabs from "../../HorizontalTabs/HorizontalTabs";
import DetailsModal from "../Modal";
import styled from "styled-components";

const TabsContainer = styled("div")`
  padding: 20px;
`;
export default function ESGModal() {
  const tabs = ["Overview", "Tasks"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <DetailsModal
      headerText="Switch your fleet to electric vehicles"
      modalIsOpen={true}
      closeModal={() => console.log("")}>
      <TabsContainer>
        <HorizontalTabs
          tabs={tabs}
          width="100%"
          selectedTab={selectedTab}
          onTabChange={(tab) => {
            setSelectedTab(tab);
          }}
        />
      </TabsContainer>
    </DetailsModal>
  );
}
