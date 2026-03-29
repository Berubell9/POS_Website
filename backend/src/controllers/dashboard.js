import supabase from "../services/supabase.js";

const thaiMonthsShort = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
];

export const getDashboardCharts = async (req, res) => {
    try {
        const [ordersRes, orderItemsRes] = await Promise.all([
            supabase
                .from("Orders")
                .select("id, total_amount, created_at, status")
                .eq("status", "เสร็จสิ้น")
                .order("created_at", { ascending: true }),

            supabase
                .from("Order_Item")
                .select("id, order_id, product_name, quantity"),
        ]);

        if (ordersRes.error) {
            return res.status(500).json({
                message: "Failed to fetch orders",
                error: ordersRes.error.message,
            });
        }

        if (orderItemsRes.error) {
            return res.status(500).json({
                message: "Failed to fetch order items",
                error: orderItemsRes.error.message,
            });
        }

        const orders = ordersRes.data || [];
        const orderItems = orderItemsRes.data || [];

        const completedOrderIds = new Set(orders.map((order) => order.id));
        const completedOrderItems = orderItems.filter((item) =>
            completedOrderIds.has(item.order_id)
        );

        // summary
        const now = new Date();

        const currentMonthOrders = orders.filter((order) => {
            const date = new Date(order.created_at);
            return (
                date.getFullYear() === now.getFullYear() &&
                date.getMonth() === now.getMonth()
            );
        });

        const summary = {
            monthlySales: currentMonthOrders.reduce(
                (sum, order) => sum + Number(order.total_amount || 0),
                0
            ),
            monthlyOrderCount: currentMonthOrders.length,
            totalSales: orders.reduce(
                (sum, order) => sum + Number(order.total_amount || 0),
                0
            ),
            totalOrderCount: orders.length,
        };

        // daily sales 7 วันล่าสุด
        const dailyMap = {};

        orders.forEach((order) => {
            const date = new Date(order.created_at);
            const key = date.toISOString().split("T")[0];
            dailyMap[key] = (dailyMap[key] || 0) + Number(order.total_amount || 0);
        });

        const dailySales = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);

            const key = d.toISOString().split("T")[0];
            const label = d.toLocaleDateString("th-TH", {
                day: "2-digit",
                month: "2-digit",
            });

            dailySales.push({
                date: label,
                sales: dailyMap[key] || 0,
            });
        }

        // monthly sales 12 เดือนล่าสุด
        const monthlyMap = {};

        orders.forEach((order) => {
            const date = new Date(order.created_at);
            const year = date.getFullYear();
            const month = date.getMonth();
            const key = `${year}-${String(month + 1).padStart(2, "0")}`;

            monthlyMap[key] = (monthlyMap[key] || 0) + Number(order.total_amount || 0);
        });

        const monthlySales = [];

        for (let i = 11; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const year = d.getFullYear();
            const monthIndex = d.getMonth();
            const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;

            monthlySales.push({
                month: thaiMonthsShort[monthIndex],
                sales: monthlyMap[key] || 0,
            });
        }

        // top 5 menus
        const topMenuMap = {};

        completedOrderItems.forEach((item) => {
            const name = item.product_name || "ไม่ระบุชื่อเมนู";
            topMenuMap[name] = (topMenuMap[name] || 0) + Number(item.quantity || 0);
        });

        const topMenus = Object.entries(topMenuMap)
            .map(([name, qty]) => ({ name, qty }))
            .sort((a, b) => b.qty - a.qty)
            .slice(0, 5);

        return res.status(200).json({
            summary,
            dailySales,
            monthlySales,
            topMenus,
        });
    } catch (err) {
        console.error("Unexpected getDashboardCharts error:", err);
        return res.status(500).json({
            message: "Unexpected server error",
            error: err.message,
        });
    }
};