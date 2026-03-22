"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export interface ChartDatum {
  name: string;
  value: number;
}

interface BarChartCardProps {
  title: string;
  data: ChartDatum[];
  emptyLabel: string;
  yAxisLabel?: string;
}

const BAR_COLORS = [
  "#234f9cff", // primary-500 (branding)
  "#041859", // primary-700 (branding)
  "#0EA5E9", // sky-500
  "#22C55E", // emerald-500
  "#F97316", // orange-500
  "#EAB308", // yellow-500
  "#EC4899", // pink-500
  "#14B8A6", // teal-500
];

export function BarChartCard({ title, data, emptyLabel, yAxisLabel }: BarChartCardProps) {
  const hasData = data && data.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {!hasData ? (
        <p className="text-sm text-gray-500">{emptyLabel}</p>
      ) : (
        <div className="relative h-64">
          {yAxisLabel && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-xs text-gray-500 -rotate-90 whitespace-nowrap">
              {yAxisLabel}
            </span>
          )}
          <div className="h-full pl-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  axisLine={{ stroke: "#D1D5DB" }}
                  tickLine={{ stroke: "#D1D5DB" }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={40}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  axisLine={{ stroke: "#D1D5DB" }}
                  tickLine={{ stroke: "#D1D5DB" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    borderColor: "#E5E7EB",
                  }}
                  // value can be number | string | (number | string)[] per Recharts types
                  formatter={(value: any) => [value, "Valor"]}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell
                      // eslint-disable-next-line react/no-array-index-key
                      key={`bar-${entry.name}-${index}`}
                      fill={BAR_COLORS[index % BAR_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
