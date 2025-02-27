import { Cell, Pie, PieChart, Text } from "recharts";
import styled from "styled-components";
import { Label as RechartsLabel } from "recharts";
import { BFMPalette } from "@/Theme";
import { H3Secondary, H4, MediumBoldHeading } from "@/Typography";

type DataItem = {
  name: string;
  value: number;
  month: string;
};
interface ChartProps {
  data: DataItem[];
  COLORS: string[];
  total?: string;
  amount?: number;
  unit?: string;
  text?: string;
}
const PieContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function PieGraph({
  data,
  COLORS,
  total,
  amount,
  unit,
  text,
}: ChartProps) {
  const processedData = data.map((entry) => ({
    ...entry,
    value: Math.abs(entry.value),
  }));
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {amount && (
                      <H3Secondary color={BFMPalette.black800}>
                        {amount}
                      </H3Secondary>
                    )}
                    {unit && <H4 color={BFMPalette.gray700}>{unit}</H4>}
                  </div>

                  {text && <H4>{text}</H4>}
                </div>
              </foreignObject>
            )}
          />
        </Pie>
      </PieChart>
    </PieContainer>
  );
}
