import { ESGNotificationsProps } from "../../../../Interfaces";
import CarbonContainer from "../CarbonContainer/CarbonContainer";
import Card from "../Card/Card";

export default function ESGNotifications({
  imgSrc = "ELECTRICITY",
  title = "TITLE",
  data,
}: ESGNotificationsProps) {
  return (
    <Card image={`/images/${imgSrc}.png`} title={title}>
      <CarbonContainer text={data?.text} carbonVal={data?.value} />
    </Card>
  );
}
