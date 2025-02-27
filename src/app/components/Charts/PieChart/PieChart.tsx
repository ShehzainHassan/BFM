import { Cell, Pie, PieChart, Text } from "recharts";
import styled from "styled-components";
import { Label as RechartsLabel } from "recharts";
import { BFMPalette } from "@/Theme";
import { MediumBoldHeading } from "@/Typography";

type DataItem = {
  name: string;
  value: number;
  month: string;
};
interface ChartProps {
  data: DataItem[];
  COLORS: string[];
  total?: string;
}
const PieContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PieGraph({ data, COLORS, total }: ChartProps) {
  const processedData = data.map((entry) => ({
    ...entry,
    value: Math.abs(entry.value),
  }));
  console.log(total?.length);
  return (
    <PieContainer>
      <PieChart width={200} height={200}>
        <Pie
          data={processedData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          dataKey="value">
          {processedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <RechartsLabel
            content={() => (
              <foreignObject x="25%" y="40%" width="100" height="100">
                {total && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}>
                    <MediumBoldHeading color={BFMPalette.black800}>
                      {total.split(" ")[0]}
                    </MediumBoldHeading>

                    <MediumBoldHeading color={BFMPalette.black800}>
                      {total.split(" ").slice(1).join(" ")}
                    </MediumBoldHeading>
                  </div>
                )}
              </foreignObject>
            )}
          />
        </Pie>
      </PieChart>
    </PieContainer>
  );
}
