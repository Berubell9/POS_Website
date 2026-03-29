import { useCallback, useEffect, useMemo, useState } from "react";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

import StatusCard from "../components/Dashboard/StatusCard";
import DailySalesChart from "../components/Dashboard/DailySalesChart";
import MonthlySalesChart from "../components/Dashboard/MonthlySalesChart";
import TopSellingMenuChart from "../components/Dashboard/TopSellingMenuChart";

const API_BASE = "http://localhost:3001/api";

type DailySalesItem = {
    date: string;
    sales: number;
};

type MonthlySalesItem = {
    month: string;
    sales: number;
};

type TopMenuItem = {
    name: string;
    qty: number;
};

type Summary = {
    monthlySales: number;
    monthlyOrderCount: number;
    totalSales: number;
    totalOrderCount: number;
};

export default function Dashboard() {
    const [dailySales, setDailySales] = useState<DailySalesItem[]>([]);
    const [monthlySales, setMonthlySales] = useState<MonthlySalesItem[]>([]);
    const [topMenus, setTopMenus] = useState<TopMenuItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState<Summary>({
        monthlySales: 0,
        monthlyOrderCount: 0,
        totalSales: 0,
        totalOrderCount: 0,
    });

    const fetchDashboardCharts = useCallback(async () => {
        try {
            setLoading(true);

            const res = await fetch(`${API_BASE}/dashboard/charts`);
            if (!res.ok) {
                throw new Error("โหลดข้อมูลกราฟไม่สำเร็จ");
            }

            const data = await res.json();

            setSummary(data.summary || {
                monthlySales: 0,
                monthlyOrderCount: 0,
                totalSales: 0,
                totalOrderCount: 0,
            });
            setDailySales(data.dailySales || []);
            setMonthlySales(data.monthlySales || []);
            setTopMenus(data.topMenus || []);
        } catch (error) {
            console.error("fetchDashboardCharts error:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardCharts();

        const handleFocus = () => {
            fetchDashboardCharts();
        };

        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("focus", handleFocus);
        };
    }, [fetchDashboardCharts]);

    const filledDailySales = useMemo(() => {
        const result: DailySalesItem[] = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);

            const dateLabel = date.toLocaleDateString("th-TH", {
                day: "2-digit",
                month: "2-digit",
            });

            const found = dailySales.find((item) => item.date === dateLabel);

            result.push({
                date: dateLabel,
                sales: found ? found.sales : 0,
            });
        }

        return result;
    }, [dailySales]);

    return (
        <div className="relative flex h-full text-gray-800">
            <div className="flex-1 overflow-y-auto p-4 pb-6">
                {/* Header */}
                <div className="flex items-center rounded-xl bg-white p-4 shadow-sm">
                    <div className="mr-4 rounded-md bg-pink-400 p-2 text-white shadow-sm">
                        <AssessmentOutlinedIcon sx={{ fontSize: 30 }} />
                    </div>
                    <p className="text-3xl font-extrabold">ยอดขาย</p>
                </div>

                {/* Content */}
                <StatusCard summary={summary} />

                {loading ? (
                    <div className="mt-4 text-xl rounded-xl bg-white py-10 text-center text-gray-400 shadow-sm">
                        กำลังโหลดข้อมูลกราฟ...
                    </div>
                ) : (
                    <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <DailySalesChart data={filledDailySales} />
                        <TopSellingMenuChart data={topMenus} />

                        <div className="xl:col-span-2">
                            <MonthlySalesChart data={monthlySales} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}