import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

type DailySalesItem = {
    date: string;
    sales: number;
};

type DailySalesChartProps = {
    data: DailySalesItem[];
};

const formatMoney = (value: number) =>
    Number(value || 0).toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

export default function DailySalesChart({ data }: DailySalesChartProps) {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-4">
                <p className="text-lg font-extrabold text-gray-800">ยอดขายรายวัน</p>
                <p className="text-sm text-gray-400">สรุปยอดขายในแต่ละวัน</p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(value) => `฿${Number(value).toLocaleString("th-TH")}`} />
                        <Tooltip
                            formatter={(value) => `฿${formatMoney(Number(value ?? 0))}`}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#f472b6"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}