import supabase from "../services/supabase.js";

export const createOrder = async (req, res) => {
    try {
        const { table_id, subtotal, vat, total, items } = req.body;

        if (!table_id) {
            return res.status(400).json({
                message: "Table is required",
            });
        }

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Order items are required",
            });
        }

        // หา queue ล่าสุดของ "วันนี้"
        const now = new Date();

        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);

        const { data: todayOrders, error: queueError } = await supabase
            .from("Orders")
            .select("queue_number")
            .gte("created_at", startOfDay.toISOString())
            .lte("created_at", endOfDay.toISOString())
            .order("queue_number", { ascending: false })
            .limit(1);

        if (queueError) {
            console.error("queueError:", queueError);
            return res.status(500).json({
                message: "Failed to generate queue number",
                error: queueError.message,
            });
        }

        const nextQueue =
            todayOrders && todayOrders.length > 0
                ? todayOrders[0].queue_number + 1
                : 1;

        const orderNumber = `ORD-${Date.now()}`;

        // 1) insert order
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

        if (orderError) {
            console.error("orderError:", orderError);
            return res.status(500).json({
                message: "Failed to create order",
                error: orderError.message,
            });
        }

        // 2) insert order items
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

        if (itemsError) {
            console.error("itemsError:", itemsError);
            return res.status(500).json({
                message: "Failed to create order items",
                error: itemsError.message,
            });
        }

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

export const getOrders = async (req, res) => {
    try {
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

        if (error) {
            console.error("getOrders error:", error);
            return res.status(500).json({
                message: "Failed to fetch orders",
                error: error.message,
            });
        }

        return res.status(200).json(data || []);
    } catch (err) {
        console.error("Unexpected getOrders error:", err);
        return res.status(500).json({
            message: "Unexpected server error",
            error: err.message,
        });
    }
};