import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

type MonthlySalesItem = {
    month: string;
    sales: number;
};

type MonthlySalesChartProps = {
    data: MonthlySalesItem[];
};

const formatMoney = (value: number) =>
    Number(value || 0).toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

// map เดือน
const monthOrder: Record<string, number> = {
    "ม.ค.": 1,
    "ก.พ.": 2,
    "มี.ค.": 3,
    "เม.ย.": 4,
    "พ.ค.": 5,
    "มิ.ย.": 6,
    "ก.ค.": 7,
    "ส.ค.": 8,
    "ก.ย.": 9,
    "ต.ค.": 10,
    "พ.ย.": 11,
    "ธ.ค.": 12,
};

export default function MonthlySalesChart({
    data,
}: MonthlySalesChartProps) {

    // sort เดือน
    const sortedData = [...data].sort(
        (a, b) => monthOrder[a.month] - monthOrder[b.month]
    );

    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-4">
                <p className="text-lg font-extrabold text-gray-800">ยอดขายรายเดือน</p>
                <p className="text-sm text-gray-400">
                    เปรียบเทียบยอดขายในแต่ละเดือน
                </p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sortedData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis
                            tickFormatter={(value) =>
                                `฿${Number(value).toLocaleString("th-TH")}`
                            }
                        />

                        <Tooltip
                            formatter={(value) =>
                                `฿${formatMoney(Number(value ?? 0))}`
                            }
                        />

                        <Bar
                            dataKey="sales"
                            radius={[8, 8, 0, 0]}
                            fill="#f472b6"
                            activeBar={{ fill: "#ec4899" }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}