import CarbonContainer from "../CarbonContainer/CarbonContainer";
import Card from "../Card/Card";
type payload = {
  text: string;
  value: string;
};
interface ESGNotificationsProps {
  imgSrc?: string;
  title?: string;
  data?: payload;
}

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
