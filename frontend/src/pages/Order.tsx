import { useEffect, useMemo, useState } from "react";
import OrderCard from "../components/Order/OrderCard";
import SearchBar from "../components/Order/SearchBar";
import Tabs from "../components/Order/Tabs";
import DateFilter from "../components/Order/DateFilter";
import { printReceipt } from "../components/Order/printReceipt";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

type OrderItem = {
    id: number;
    product_id: number;
    product_name: string;
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

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH");
};

const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

const getNextStatus = (status: string) => {
    if (status === "รอดำเนินการ") return "กำลังทำ";
    if (status === "กำลังทำ") return "พร้อมเสิร์ฟ";
    if (status === "พร้อมเสิร์ฟ") return "เสร็จสิ้น";
    return null;
};

export default function Order() {
    const [orders, setOrders] = useState<OrderRow[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("ทั้งหมด");
    const [loading, setLoading] = useState(false);

    // filter date
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedPreset, setSelectedPreset] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const res = await fetch(`${API_BASE}/orders`);
            if (!res.ok) throw new Error("โหลดออเดอร์ไม่สำเร็จ");

            const data = await res.json();
            setOrders(data || []);
        } catch (error) {
            console.error("fetchOrders error:", error);
        } finally {
            setLoading(false);
        }
    };

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
        } catch (error) {
            console.error("Unexpected updateOrderStatus error:", error);
            alert("เกิดข้อผิดพลาด");
        }
    };

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const keyword = searchTerm.trim().toLowerCase();

            const matchSearch =
                keyword === "" ||
                order.order_number?.toLowerCase().includes(keyword) ||
                String(order.tables?.table_number || order.table_id || "")
                    .toLowerCase()
                    .includes(keyword) ||
                order.status?.toLowerCase().includes(keyword) ||
                String(order.queue_number || "").includes(keyword) ||
                String(order.queue_number || "").padStart(3, "0").includes(keyword);

            const matchStatus =
                selectedStatus === "ทั้งหมด" || order.status === selectedStatus;

            const orderDate = new Date(order.created_at);
            let matchDate = true;

            // เลือกวันที่แบบระบุเอง
            if (selectedDate) {
                const selected = new Date(selectedDate);
                matchDate =
                    orderDate.getFullYear() === selected.getFullYear() &&
                    orderDate.getMonth() === selected.getMonth() &&
                    orderDate.getDate() === selected.getDate();
            }

            // เลือกแบบ preset
            if (selectedPreset) {
                const now = new Date();

                if (selectedPreset === "today") {
                    matchDate =
                        orderDate.getFullYear() === now.getFullYear() &&
                        orderDate.getMonth() === now.getMonth() &&
                        orderDate.getDate() === now.getDate();
                }

                if (selectedPreset === "yesterday") {
                    const yesterday = new Date();
                    yesterday.setDate(now.getDate() - 1);

                    matchDate =
                        orderDate.getFullYear() === yesterday.getFullYear() &&
                        orderDate.getMonth() === yesterday.getMonth() &&
                        orderDate.getDate() === yesterday.getDate();
                }

                if (selectedPreset === "7days") {
                    const past = new Date();
                    past.setHours(0, 0, 0, 0);
                    past.setDate(past.getDate() - 7);
                    matchDate = orderDate >= past;
                }

                if (selectedPreset === "30days") {
                    const past = new Date();
                    past.setHours(0, 0, 0, 0);
                    past.setDate(past.getDate() - 30);
                    matchDate = orderDate >= past;
                }
            }

            return matchSearch && matchStatus && matchDate;
        });
    }, [orders, searchTerm, selectedStatus, selectedDate, selectedPreset]);

    const statusCounts = useMemo(() => {
        const map: Record<string, number> = {
            ทั้งหมด: orders.length,
            รอดำเนินการ: 0,
            กำลังทำ: 0,
            พร้อมเสิร์ฟ: 0,
            เสร็จสิ้น: 0,
            ยกเลิก: 0,
        };

        orders.forEach((order) => {
            if (map[order.status] !== undefined) {
                map[order.status]++;
            }
        });

        return map;
    }, [orders]);

    return (
        <div className="relative flex h-full text-gray-800">
            <div className="flex-1 overflow-y-auto p-4 pb-6">
                {/* Header */}
                <div className="flex items-center rounded-xl bg-white p-4 shadow-sm">
                    <div className="mr-4 rounded-md bg-pink-400 p-2 text-white shadow-sm">
                        <DescriptionOutlinedIcon sx={{ fontSize: 30 }} />
                    </div>
                    <p className="text-3xl font-extrabold">ออเดอร์</p>
                </div>

                {/* Content */}
                <Tabs
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                    counts={statusCounts}
                />

                <div className="mt-4 flex items-center">
                    <FormatListBulletedOutlinedIcon className="mr-2 text-pink-400" />
                    <p className="text-xl font-extrabold">รายการออเดอร์</p>
                </div>

                <div className="mt-4 p-4 bg-white rounded-lg shadow-sm flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex-1">
                        <SearchBar
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <DateFilter
                        date={selectedDate}
                        preset={selectedPreset}
                        onDateChange={setSelectedDate}
                        onPresetChange={setSelectedPreset}
                    />
                </div>

                {loading ? (
                    <div className="mt-4 text-xl rounded-xl bg-white py-10 text-center text-gray-400 shadow-sm">
                        กำลังโหลดข้อมูล...
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="mt-4 text-xl rounded-xl bg-white py-10 text-center text-gray-400 shadow-sm">
                        ไม่พบรายการออเดอร์
                    </div>
                ) : (
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {filteredOrders.map((order) => (
                            <OrderCard
                                key={order.id}
                                queueNumber={String(order.queue_number).padStart(3, "0")}
                                orderNumber={order.order_number}
                                tableNumber={
                                    order.tables?.table_number
                                        ? String(order.tables.table_number)
                                        : String(order.table_id)
                                }
                                status={order.status}
                                dateText={formatDate(order.created_at)}
                                timeText={formatTime(order.created_at)}
                                vat={order.vat_amount}
                                total={order.total_amount}
                                items={order.items || []}
                                onPrint={() => printReceipt(order)}
                                onNextStep={() => {
                                    const next = getNextStatus(order.status);
                                    if (next) {
                                        updateOrderStatus(order.id, next);
                                    }
                                }}
                                onCancel={() => updateOrderStatus(order.id, "ยกเลิก")}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}