import useTranslation from "@/translations";
import { ESGNotificationsProps } from "../../../../Interfaces";
import CarbonContainer from "../CarbonContainer/CarbonContainer";
import Card from "../Card/Card";

export default function ESGNotifications({
  type = "ELECTRIC_VEHICLE",
  title = "TITLE",
}: ESGNotificationsProps) {
  const { t } = useTranslation();

  let imageSrc = "/images/CAR.png";
  switch (type) {
    case "EFFICIENT_AIR_CONDITIONER":
      imageSrc = "/images/temperature.png";
      break;
    case "EFFICIENT_LIGHTING":
      imageSrc = "/images/lighting.png";
      break;
    case "REDUCE_FREIGHT_EMISSIONS":
      imageSrc = "/images/TRUCK.png";
      break;
    case "ELECTRIC_VEHICLE":
    default:
      imageSrc = "/images/CAR.png";
      break;
  }

  return (
    <Card image={imageSrc} title={title} expandable={true}>
      <CarbonContainer
        text={t("esg.notifications.label")}
        carbonVal={t("esg.notifications.carbonVal")}
      />
    </Card>
  );
}
