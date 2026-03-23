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
            product_name_snapshot: item.product_name_snapshot,
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
            .select(`*,Order_Item (*)`)
            .order("id", { ascending: false });

        if (error) {
            return res.status(500).json({
                message: "Failed to fetch orders",
                error: error.message,
            });
        }

        return res.json(data);
    } catch (err) {
        console.error("getOrders error:", err);
        return res.status(500).json({
            message: "Unexpected server error",
        });
    }
};