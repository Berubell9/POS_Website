import supabase from "../services/supabase.js";

/*
 * GET /api/tables
 * ดึงข้อมูลโต๊ะทั้งหมด
*/
export const getTables = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("Tables")
            .select("id, table_number, is_active, created_at")
            .order("id", { ascending: true });

        if (error) {
            return res.status(500).json({
                message: "Failed to fetch tables",
                error: error.message,
            });
        }

        return res.status(200).json(data || []);
    } catch (err) {
        console.error("Unexpected error in getTables:", err);
        return res.status(500).json({
            message: "Unexpected server error",
        });
    }
};

/*
 * POST /api/tables
 * เพิ่มโต๊ะใหม่
*/
export const createTable = async (req, res) => {
    try {
        const { table_number, is_active } = req.body;

        if (!table_number || !String(table_number).trim()) {
            return res.status(400).json({
                message: "Table number is required",
            });
        }

        const { data, error } = await supabase
            .from("Tables")
            .insert([
                {
                    table_number: String(table_number).trim(),
                    is_active,
                },
            ])
            .select()
            .single();

        if (error) {
            return res.status(500).json({
                message: "Failed to create table",
                error: error.message,
            });
        }

        return res.status(201).json({
            message: "Table created successfully",
            data,
        });
    } catch (err) {
        console.error("Unexpected error in createTable:", err);
        return res.status(500).json({
            message: "Unexpected server error",
        });
    }
};

/*
 * PUT /api/tables/:id
 * เเก้ไขข้อมูลโต๊ะ
*/
export const updateTable = async (req, res) => {
    try {
        const { id } = req.params;
        const { table_number, is_active } = req.body;

        if (!table_number || !String(table_number).trim()) {
            return res.status(400).json({
                message: "Table number is required",
            });
        }

        const { data, error } = await supabase
            .from("Tables")
            .update({
                table_number: String(table_number).trim(),
                is_active,
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return res.status(500).json({
                message: "Failed to update table",
                error: error.message,
            });
        }

        return res.status(200).json({
            message: "Table updated successfully",
            data,
        });
    } catch (err) {
        console.error("Unexpected error in updateTable:", err);
        return res.status(500).json({
            message: "Unexpected server error",
        });
    }
};

/*
 * DELETE /api/tables/:id
 * ลบโต๊ะ
*/
export const deleteTable = async (req, res) => {
    try {
        const { id } = req.params;

        const { error } = await supabase
            .from("Tables")
            .delete()
            .eq("id", id);

        if (error) {
            return res.status(500).json({
                message: "Failed to delete table",
                error: error.message,
            });
        }

        return res.status(200).json({
            message: "Table deleted successfully",
        });
    } catch (err) {
        console.error("Unexpected error in deleteTable:", err);
        return res.status(500).json({
            message: "Unexpected server error",
        });
    }
};