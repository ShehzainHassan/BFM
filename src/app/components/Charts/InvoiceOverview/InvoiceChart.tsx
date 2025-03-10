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
import { invoiceData } from "./InvoiceData";

export default function InvoiceChart() {
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
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="value2"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
        <Bar
          dataKey="value3"
          fill="#ff7300"
          activeBar={<Rectangle fill="cyan" stroke="red" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
