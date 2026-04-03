import supabase from "../services/supabase.js";

/*
 * POST /api/orders
 * สร้างออเดอร์ใหม่
 */
export const createOrder = async (req, res) => {
    try {
        // รับค่าจาก frontend
        const { table_id, subtotal, vat, total, items } = req.body;

        // ตรวจว่ามีการเลือกโต๊ะหรือไม่
        if (!table_id) {
            return res.status(400).json({
                message: "Table is required",
            });
        }

        // ตรวจว่ามีรายการสินค้าในออเดอร์หรือไม่
        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Order items are required",
            });
        }

        // หา queue ล่าสุดของ "วันนี้" เพื่อให้เลขคิวเริ่มใหม่ทุกวัน
        const now = new Date();

        // เวลาเริ่มต้นของวัน
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);

        // เวลาสิ้นสุดของวัน
        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);

        // ดึง queue_number ล่าสุดของออเดอร์ในวันนี้
        const { data: todayOrders, error: queueError } = await supabase
            .from("Orders")
            .select("queue_number")
            .gte("created_at", startOfDay.toISOString())
            .lte("created_at", endOfDay.toISOString())
            .order("queue_number", { ascending: false })
            .limit(1); // เอาแค่ 1 รายการล่าสุด

        // ถ้ามีปัญหาในการหาเลขคิว
        if (queueError) {
            console.error("queueError:", queueError);
            return res.status(500).json({
                message: "Failed to generate queue number",
                error: queueError.message,
            });
        }

        // ถ้าวันนี้มีออเดอร์แล้ว ให้เอาคิวล่าสุด + 1
        // ถ้ายังไม่มีออเดอร์เลย ให้เริ่มที่ 1
        const nextQueue =
            todayOrders && todayOrders.length > 0
                ? todayOrders[0].queue_number + 1
                : 1;
                
        // ORD-YYYYMMDD-เลขคิว ex.ORD-20260324-001
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const datePart = `${year}${month}${day}`;

        // ORD-YYYYMMDD-เลขคิว ex.ORD-20260324-001
        const orderNumber = `ORD-${datePart}-${String(nextQueue).padStart(3, "0")}`;

        // 1) บันทึกข้อมูลออเดอร์หลักลงตาราง Orders
        const { data: orderData, error: orderError } = await supabase
            .from("Orders")
            .insert([
                {
                    order_number: orderNumber,
                    table_id,
                    status: "รอดำเนินการ",
                    sub_total: subtotal,
                    vat_amount: vat,
                    total_amount: total,
                    queue_number: nextQueue,
                },
            ])
            .select()
            .single();

        // ถ้าบันทึกออเดอร์หลักไม่สำเร็จ
        if (orderError) {
            console.error("orderError:", orderError);
            return res.status(500).json({
                message: "Failed to create order",
                error: orderError.message,
            });
        }

        // 2) บันทึกรายการสินค้าในออเดอร์ลงตาราง Order_Item
        const orderItemsPayload = items.map((item) => ({
            order_id: orderData.id,
            product_id: item.product_id,
            product_name: item.product_name,
            product_image: item.product_image,
            unit_price: item.unit_price,
            quantity: item.qty,
            total: item.line_total,
        }));

        const { error: itemsError } = await supabase
            .from("Order_Item")
            .insert(orderItemsPayload);

        // ถ้าบันทึกรายการสินค้าไม่สำเร็จ
        if (itemsError) {
            console.error("itemsError:", itemsError);
            return res.status(500).json({
                message: "Failed to create order items",
                error: itemsError.message,
            });
        }

        // ส่งผลลัพธ์กลับว่าเพิ่มออเดอร์สำเร็จ
        return res.status(201).json({
            message: "Order created successfully",
            data: orderData,
        });
    } catch (err) {
        console.error("Unexpected createOrder error:", err);
        return res.status(500).json({
            message: "Unexpected server error",
            error: err.message,
        });
    }
};

/*
 * GET /api/orders
 * ดึงข้อมูลออเดอร์ทั้งหมด
*/
export const getOrders = async (req, res) => {
    try {
        // ดึงข้อมูลจาก Orders พร้อม join ตารางโต๊ะ และรายการสินค้า
        const { data, error } = await supabase
            .from("Orders")
            .select(`
                *,
                tables:table_id (
                id,
                table_number
            ),
                items:Order_Item (
                id,
                product_id,
                product_name,
                product_image,
                unit_price,
                quantity,
                total
                )
            `)
            .order("id", { ascending: false });
        
        // ถ้าดึงข้อมูลไม่สำเร็จ
        if (error) {
            console.error("getOrders error:", error);
            return res.status(500).json({
                message: "Failed to fetch orders",
                error: error.message,
            });
        }

    // ส่งข้อมูลออเดอร์ทั้งหมดกลับไป
        return res.status(200).json(data || []);
    } catch (err) {
        console.error("Unexpected getOrders error:", err);
        return res.status(500).json({
            message: "Unexpected server error",
            error: err.message,
        });
    }
};

/*
 * อัปเดตสถานะของออเดอร์
*/
export const updateOrderStatus = async (req, res) => {
    try {
        // รับ id ออเดอร์จาก params และ status ใหม่จาก body
        const { id } = req.params;
        const { status } = req.body;

        // ตรวจว่ามีการส่ง status มาหรือไ
        if (!status) {
            return res.status(400).json({
                message: "Status is required",
            });
        }

        // กำหนดสถานะที่อนุญาตให้เปลี่ยนได้
        const allowedStatuses = ["รอดำเนินการ", "กำลังทำ", "พร้อมเสิร์ฟ", "เสร็จสิ้น", "ยกเลิก"];

        // ถ้าสถานะที่ส่งมาไม่อยู่ในรายการที่กำหนด
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status",
            });
        }

        // อัปเดตสถานะของออเดอร์ที่ id ตรงกัน
        const { data, error } = await supabase
            .from("Orders")
            .update({ status })
            .eq("id", id)
            .select()
            .single();

        // ถ้าอัปเดตไม่สำเร็จ
        if (error) {
            console.error("updateOrderStatus error:", error);
            return res.status(500).json({
                message: "Failed to update order status",
                error: error.message,
            });
        }

        // ส่งผลลัพธ์กลับว่าอัปเดตสำเร็จ
        return res.status(200).json({
            message: "Order status updated successfully",
            data,
        });
    } catch (err) {
        console.error("Unexpected updateOrderStatus error:", err);
        return res.status(500).json({
            message: "Unexpected server error",
            error: err.message,
        });
    }
};