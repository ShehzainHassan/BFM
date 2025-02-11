import { Cell, Pie, PieChart } from "recharts";
import styled from "styled-components";
import { Label as RechartsLabel } from "recharts";
import { BFMPalette } from "@/Theme";

type DataItem = {
  name: string;
  value: number;
};
interface ChartProps {
  data: DataItem[];
  COLORS: string[];
}

export default function PieGraph({ data, COLORS }: ChartProps) {
  const PieContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  return (
    <PieContainer>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <RechartsLabel
            content={() => (
              <foreignObject x="25%" y="35%" width="100" height="100">
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: BFMPalette.black800,
                  }}>
                  586.75 kg CO2 <br />
                  Total
                </div>
              </foreignObject>
            )}
            position="center"
          />
        </Pie>
      </PieChart>
    </PieContainer>
  );
}
