import supabase from "../services/supabase.js";

// ชื่อเดือน
const thaiMonthsShort = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
];

// ดึงข้อมูลสำหรับ Dashboard
export const getDashboardCharts = async (req, res) => {
    try {
        const [ordersRes, orderItemsRes] = await Promise.all([
            // ดึง Orders เอาเฉพาะออเดอร์ที่สถานะ "เสร็จสิ้น" แล้ว (ไม่เอาที่ยกเลิกมาคิด)
            supabase
                .from("Orders")
                .select("id, total_amount, created_at, status")
                .eq("status", "เสร็จสิ้น")
                .order("created_at", { ascending: true }),
            // ดึง Order_Item รายการสินค้าในแต่ละออเดอร์
            supabase
                .from("Order_Item")
                .select("id, order_id, product_name, quantity"),
        ]);

        // ถ้าดึงข้อมูล Orders ไม่สำเร็จ
        if (ordersRes.error) {
            return res.status(500).json({
                message: "Failed to fetch orders",
                error: ordersRes.error.message,
            });
        }

        // ถ้าดึงข้อมูล Order_Item ไม่สำเร็จ
        if (orderItemsRes.error) {
            return res.status(500).json({
                message: "Failed to fetch order items",
                error: orderItemsRes.error.message,
            });
        }

        // กันกรณี data เป็น null
        const orders = ordersRes.data || [];
        const orderItems = orderItemsRes.data || [];

        // สร้าง Set ของ order id ที่เสร็จสิ้นแล้ว
        // เพื่อใช้กรองเฉพาะรายการสินค้าในออเดอร์ที่เสร็จสิ้น
        const completedOrderIds = new Set(orders.map((order) => order.id));
        const completedOrderItems = orderItems.filter((item) =>
            completedOrderIds.has(item.order_id)
        );

        // * Summary * //
        const now = new Date();
        // กรองเฉพาะออเดอร์ของ "เดือนปัจจุบัน"
        const currentMonthOrders = orders.filter((order) => {
            const date = new Date(order.created_at);
            return (
                date.getFullYear() === now.getFullYear() &&
                date.getMonth() === now.getMonth()
            );
        });

        // สรุปข้อมูลสำหรับการ์ดบน Dashboard
        const summary = {
            // ยอดขายเดือนนี้
            monthlySales: currentMonthOrders.reduce(
                (sum, order) => sum + Number(order.total_amount || 0),
                0
            ),
            // จำนวนออเดอร์เดือนนี้
            monthlyOrderCount: currentMonthOrders.length,
            // ยอดขายทั้งหมด
            totalSales: orders.reduce(
                (sum, order) => sum + Number(order.total_amount || 0),
                0
            ),
            // จำนวนออเดอร์ทั้งหมด
            totalOrderCount: orders.length,
        };

        // * daily sales 7 วันล่าสุด * //
        // สร้าง object เก็บยอดขายรายวัน
        const dailyMap = {};

        orders.forEach((order) => {
            const date = new Date(order.created_at);
            const key = date.toISOString().split("T")[0];
            dailyMap[key] = (dailyMap[key] || 0) + Number(order.total_amount || 0);
        });

        // สร้างข้อมูลกราฟ 7 วันล่าสุด
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

        // * monthly sales 12 เดือนล่าสุด * //
        // สร้าง object เก็บยอดขายรายเดือน
        const monthlyMap = {};

        orders.forEach((order) => {
            const date = new Date(order.created_at);
            const year = date.getFullYear();
            const month = date.getMonth();
            const key = `${year}-${String(month + 1).padStart(2, "0")}`;

            monthlyMap[key] = (monthlyMap[key] || 0) + Number(order.total_amount || 0);
        });

        // สร้างข้อมูลกราฟ 12 เดือนล่าสุด
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

        // * top 5 menus * //
        // สร้าง object เก็บยอดขายรวมของแต่ละเมนู
        const topMenuMap = {};

        completedOrderItems.forEach((item) => {
            const name = item.product_name || "ไม่ระบุชื่อเมนู";
            topMenuMap[name] = (topMenuMap[name] || 0) + Number(item.quantity || 0);
        });

        const topMenus = Object.entries(topMenuMap)
            // แปลง object -> array
            .map(([name, qty]) => ({ name, qty }))
            // เรียงจากมากไปน้อย
            .sort((a, b) => b.qty - a.qty)
            // แล้วตัดเหลือ 5 อันดับแรก
            .slice(0, 5);

        // * ส่งข้อมูลทั้งหมดกลับไปให้ frontend * //
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