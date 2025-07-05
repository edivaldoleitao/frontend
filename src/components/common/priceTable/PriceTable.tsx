import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { PriceEntry } from "../../../features/productDetail/components";

interface PriceTableProps {
  data: PriceEntry[];
}

const PriceTable: React.FC<PriceTableProps> = ({ data }) => {
  const reversedData = [...data].reverse();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Histórico de preço nos últimos meses
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={reversedData}>
            <XAxis
              dataKey="collection_date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#666" }}
              domain={["dataMin - 10", "dataMax + 10"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e40af",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: "white" }}
              itemStyle={{ color: "white" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1e40af"
              strokeWidth={3}
              dot={{ fill: "#1e40af", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#1e40af", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceTable;
