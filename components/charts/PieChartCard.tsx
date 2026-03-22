"use client";

import {
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import type { ChartDatum } from "./BarChartCard";

interface PieChartCardProps {
  title: string;
  data: ChartDatum[];
  emptyLabel: string;
}

const PIE_COLORS = [
  "#234f9cff", // primary-500
  "#041859", // primary-700
  "#0EA5E9",
  "#22C55E",
  "#F97316",
  "#EAB308",
  "#EC4899",
  "#14B8A6",
];

export function PieChartCard({ title, data, emptyLabel }: PieChartCardProps) {
  const hasData = data && data.length > 0;

  if (!hasData) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{emptyLabel}</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;

  const dataWithPercentages = data.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="h-64 flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-1/2 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={dataWithPercentages}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {dataWithPercentages.map((entry, index) => (
                  <Cell
                    // eslint-disable-next-line react/no-array-index-key
                    key={`slice-${entry.name}-${index}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#E5E7EB" }}
                // value/name can be number | string | (number | string)[] per Recharts types
                formatter={(value: any, _name: any, props: any) => {
                  const percentage = props?.payload?.percentage as string | undefined;
                  return [`${value} (${percentage ?? "0.0"}%)`, "Jugadores"];
                }}
              />
            </RePieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 w-full md:w-1/2 max-h-56 overflow-y-auto pr-1">
          <ul className="space-y-2 text-sm text-gray-700">
            {dataWithPercentages.map((item, index) => (
              <li key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                  />
                  <span className="truncate mr-2">{item.name}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {item.value} · {item.percentage}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
