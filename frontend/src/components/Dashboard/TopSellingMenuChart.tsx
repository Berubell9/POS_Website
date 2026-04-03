import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

type TopMenuItem = {
    name: string;
    qty: number;
};

type TopSellingMenuChartProps = {
    data: TopMenuItem[];
};

export default function TopSellingMenuChart({
    data,
}: TopSellingMenuChartProps) {
    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-4">
                <p className="text-lg font-extrabold text-gray-800">
                    เมนูขายดี 5 อันดับ
                </p>
                <p className="text-sm text-gray-400">
                    จัดอันดับเมนูตามจำนวนที่ขายได้
                </p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ left: 24 }}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis type="number" />

                        <YAxis
                            dataKey="name"
                            type="category"
                            width={140}
                            tick={{ fontSize: 12 }}
                        />

                        <Tooltip formatter={(value) => `${Number(value ?? 0)} ชิ้น`} />

                        <Bar
                            dataKey="qty"
                            radius={[0, 8, 8, 0]}
                            fill="#f472b6"
                            activeBar={{ fill: "#ec4899" }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}