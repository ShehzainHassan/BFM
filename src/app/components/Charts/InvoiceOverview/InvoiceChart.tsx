import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Invoice } from "./InvoiceData";
import { BFMPalette } from "@/Theme";

interface InvoiceChartProps {
  invoiceData: Invoice[];
}
export default function InvoiceChart({ invoiceData }: InvoiceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={invoiceData}
        margin={{ top: 40, right: 24, left: 40, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="value1"
          fill={BFMPalette.purple200}
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="value2"
          fill={BFMPalette.skin600}
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
        <Bar
          dataKey="value3"
          fill={BFMPalette.purple800}
          activeBar={<Rectangle fill="cyan" stroke="red" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
