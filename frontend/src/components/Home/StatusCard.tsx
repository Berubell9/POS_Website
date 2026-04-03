import { useEffect, useMemo, useState } from "react";

import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const API_BASE = import.meta.env.API_BASE;

type Order = {
    id: number;
    status: string;
    total_amount: number;
    created_at: string;
};

type StatusCardProps = {
    refreshKey?: number;
    onAlert?: (message: string, type: "success" | "error" | "info" | "warning") => void;

};

// ให้เงินมีลูกน้ำคั่น
const formatMoney = (value: number) =>
    Number(value || 0).toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

export default function StatusCard({ 
    refreshKey,
    onAlert,
}: StatusCardProps) {

    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetchOrders();
    }, [refreshKey]);

    // ดึงข้อมูลออเดอร์
    const fetchOrders = async () => {
        try {
            const res = await fetch(`${API_BASE}/orders`);
            const data = await res.json();
            setOrders(data || []);
        } catch (err) {
            console.error("fetchOrders error:", err);
            onAlert?.("ดึงข้อมูลสถานะไม่สำเร็จ", "error");
            return;
        }
    };

    // filter วันนี้
    const todayOrders = useMemo(() => {
        const today = new Date();

        return orders.filter((o) => {
            const d = new Date(o.created_at);
            return (
                d.getFullYear() === today.getFullYear() &&
                d.getMonth() === today.getMonth() &&
                d.getDate() === today.getDate()
            );
        });
    }, [orders]);

    // ยอดขายวันนี้
    const totalSales = useMemo(() => {
        return todayOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
    }, [todayOrders]);

    // จำนวนออเดอร์
    const totalOrders = todayOrders.length;

    // รอดำเนินการ 
    const pendingCount = useMemo(() => {
        return todayOrders.filter((o) => o.status === "รอดำเนินการ").length;
    }, [todayOrders]);

    // เสร็จสิ้น 
    const doneCount = useMemo(() => {
        return todayOrders.filter((o) => o.status === "เสร็จสิ้น").length;
    }, [todayOrders]);

    return (
        <div className="mt-4 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {/* ยอดขายวันนี้ */}
            <div className="min-h-25 rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                        <LocalAtmOutlinedIcon className="text-green-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-sm text-gray-400 md:text-base">ยอดขายวันนี้</p>
                </div>
                <p className="text-xl font-extrabold text-green-900 md:text-2xl">
                    ฿{formatMoney(totalSales)}
                </p>
            </div>

            {/* จำนวนออเดอร์วันนี้ */}
            <div className="min-h-25 rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100">
                        <ShoppingBagOutlinedIcon className="text-sky-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-sm text-gray-400 md:text-base">จำนวนออเดอร์วันนี้</p>
                </div>
                <p className="text-xl font-extrabold text-sky-900 md:text-2xl">
                    {totalOrders}
                </p>
            </div>

            {/* รอดำเนินการ */}
            <div className="min-h-25 rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                        <AccessTimeOutlinedIcon className="text-yellow-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-sm text-gray-400 md:text-base">รอดำเนินการ</p>
                </div>
                <p className="text-xl font-extrabold text-yellow-900 md:text-2xl">
                    {pendingCount}
                </p>
            </div>

            {/* เสร็จสิ้น */}
            <div className="min-h-25 rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                        <CheckCircleOutlineOutlinedIcon className="text-indigo-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-sm text-gray-400 md:text-base">ออเดอร์เสร็จสิ้น</p>
                </div>
                <p className="text-xl font-extrabold text-indigo-900 md:text-2xl">
                    {doneCount}
                </p>
            </div>
        </div>
    );
}
