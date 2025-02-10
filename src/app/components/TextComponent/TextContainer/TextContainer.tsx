import styled from "styled-components";
import TextComponent from "../TextComponent";

export default function TextContainer() {
  const Container = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;
  return (
    <Container>
      <TextComponent
        title="Current Balance"
        timePeriod="since last month"
        percentage={8}
        value="HKD 1,300,000.00"
      />
      <TextComponent
        title="Total income"
        timePeriod="since last month"
        percentage={2}
        value="HKD 240,000.00"
      />
      <TextComponent
        title="Total Expenses"
        timePeriod="since last month"
        percentage={8}
        value="HKD 90,000.00"
      />
    </Container>
  );
}
