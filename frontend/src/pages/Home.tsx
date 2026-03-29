import { useEffect, useMemo, useState } from "react";
import StatusCard from "../components/Home/StatusCard";
import OrderColumn from "../components/Home/OrderColumn";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

type OrderItem = {
    id: number;
    product_id: number;
    product_name: string;
    product_image: string;
    unit_price: number;
    quantity: number;
    total: number;
};

type OrderRow = {
    id: number;
    order_number: string;
    queue_number: number;
    table_id: number;
    status: string;
    sub_total: number;
    vat_amount: number;
    total_amount: number;
    created_at: string;
    tables?: {
        id: number;
        table_number: string;
    } | null;
    items?: OrderItem[];
};

const API_BASE = "http://localhost:3001/api";

export default function Home() {
    const [orders, setOrders] = useState<OrderRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const res = await fetch(`${API_BASE}/orders`);
            if (!res.ok) {
                throw new Error("โหลดออเดอร์ไม่สำเร็จ");
            }

            const data = await res.json();
            setOrders(data || []);
        } catch (error) {
            console.error("fetchOrders error:", error);
        } finally {
            setLoading(false);
        }
    };

    const mappedOrders = useMemo(() => {
        return orders.map((order) => ({
            id: order.id,
            queueNumber: String(order.queue_number ?? order.id).padStart(3, "0"),
            tableNumber: order.tables?.table_number
                ? String(order.tables.table_number)
                : String(order.table_id),
            status: order.status,
            items: order.items || [],
        }));
    }, [orders]);

    const updateOrderStatus = async (orderId: number, nextStatus: string) => {
        try {
            const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: nextStatus }),
            });

            const result = await res.json();

            if (!res.ok) {
                console.error("updateOrderStatus error:", result);
                alert(result.message || "อัปเดตสถานะไม่สำเร็จ");
                return;
            }

            fetchOrders();
            setRefreshKey((prev) => prev + 1);
        } catch (error) {
            console.error("Unexpected updateOrderStatus error:", error);
            alert("เกิดข้อผิดพลาด");
        }
    };

    const pendingOrders = useMemo(
        () =>
            mappedOrders
                .filter((order) => order.status === "รอดำเนินการ")
                .sort((a, b) => Number(a.queueNumber) - Number(b.queueNumber)),
        [mappedOrders]
    );

    const cookingOrders = useMemo(
        () =>
            mappedOrders
                .filter((order) => order.status === "กำลังทำ")
                .sort((a, b) => Number(a.queueNumber) - Number(b.queueNumber)),
        [mappedOrders]
    );

    const readyOrders = useMemo(
        () =>
            mappedOrders
                .filter((order) => order.status === "พร้อมเสิร์ฟ")
                .sort((a, b) => Number(a.queueNumber) - Number(b.queueNumber)),
        [mappedOrders]
    );

    return (
        <div className="relative flex h-full text-gray-800">
            <div className="flex-1 overflow-y-auto p-4 pb-6">
                <div className="flex items-center rounded-xl bg-white p-4 shadow-sm">
                    <div className="mr-4 rounded-md bg-pink-400 p-2 text-white shadow-sm">
                        <StorefrontOutlinedIcon sx={{ fontSize: 30 }} />
                    </div>
                    <p className="text-3xl font-extrabold">หน้าแรก</p>
                </div>

                <StatusCard refreshKey={refreshKey} />

                {loading ? (
                    <div className="mt-4 text-xl rounded-xl bg-white py-10 text-center text-gray-400 shadow-sm">
                        กำลังโหลดข้อมูล...
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-4 pb-6 text-gray-800 lg:grid-cols-3">
                        <OrderColumn
                            title="รอดำเนินการ"
                            color="yellow"
                            orders={pendingOrders}
                            actionLabel="ขั้นตอนถัดไป"
                            actionVariant="pink"
                            onAction={(orderId) => updateOrderStatus(orderId, "กำลังทำ")}
                        />

                        <OrderColumn
                            title="กำลังทำ"
                            color="sky"
                            orders={cookingOrders}
                            actionLabel="พร้อมเสิร์ฟ"
                            actionVariant="sky"
                            onAction={(orderId) => updateOrderStatus(orderId, "พร้อมเสิร์ฟ")}
                        />

                        <OrderColumn
                            title="พร้อมเสิร์ฟ"
                            color="green"
                            orders={readyOrders}
                            actionLabel="เสร็จสิ้น"
                            actionVariant="green"
                            onAction={(orderId) => updateOrderStatus(orderId, "เสร็จสิ้น")}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}