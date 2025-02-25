import { Cell, Pie, PieChart } from "recharts";
import styled from "styled-components";
import { Label as RechartsLabel } from "recharts";
import { BFMPalette } from "@/Theme";

type DataItem = {
  name: string;
  value: number;
  month: string;
};
interface ChartProps {
  data: DataItem[];
  COLORS: string[];
  total?: number;
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
              <foreignObject x="30%" y="40%" width="100" height="100">
                {total && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: BFMPalette.black800,
                    }}>
                    {total} kg CO2 <br />
                    Total
                  </div>
                )}
              </foreignObject>
            )}
            position="center"
          />
        </Pie>
      </PieChart>
    </PieContainer>
  );
}
