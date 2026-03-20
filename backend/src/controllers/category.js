import supabase from "../services/supabase.js";

/*
 * GET /api/categories
 * ดึงข้อมูลหมวดหมู่ทั้งหมด
 * (Get all categories)
*/
export const getCategories = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("Categories")
            .select("id, name")
            .order("id", { ascending: true });

        if (error) {
            console.error("Error fetching categories:", error);
            return res.status(500).json({
                message: "Failed to fetch categories",
                error: error.message,
            });
        }

        return res.status(200).json(data || []);
    } catch (err) {
        console.error("Unexpected error in getCategories:", err);
        return res.status(500).json({
            message: "Unexpected server error",
        });
    }
};

/*
 * GET /api/categories/:id
 * ดึงข้อมูลหมวดหมู่ตาม id
 * (Get all category by ID)
*/
export const getCategoryById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("Categories")
            .select("id, name")
            .order("id", { ascending: true });

        if (error) {
            console.error("Error fetching category by id:", error);
            return res.status(404).json({
                message: "Category not found",
                error: error.message,
            });
        }

        return res.status(200).json(data);
    } catch (err) {
        console.error("Unexpected error in getCategoryById:", err);
        return res.status(500).json({
            message: "Unexpected server error",
        });
    }
};

/*
 * POST /api/categories
 * เพิ่มหมวดหมู่ใหม่
 * (Create a new category)
*/
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !String(name).trim()) {
            return res.status(400).json({
                message: "Category name is required",
            });
        }

        const { data, error } = await supabase
            .from("Categories")
            .insert([{ name: String(name).trim() }])
            .select()
            .single();

        if (error) {
            console.error("Error creating category:", error);
            return res.status(500).json({
                message: "Failed to create category",
                error: error.message,
            });
        }

        return res.status(201).json({
            message: "Category created successfully",
            data,
        });

    } catch (err) {
        console.error("Unexpected error in createCategory:", err);
        return res.status(500).json({
            message: "Unexpected server error",
        });
    }
};

/*
 * PUT /api/categories/:id
 * เเก้ไขหมวดหมู่
 * (Update category by ID)
*/
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name || !String(name).trim()) {
            return res.status(400).json({
                message: "Category name is required",
            });
        }

        const { data, error } = await supabase
            .from("Categories")
            .update({ name: String(name).trim() })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error("Error updating category:", error);
            return res.status(500).json({
                message: "Failed to update category",
                error: error.message,
            });
        }

        return res.status(200).json({
            message: "Category updated successfully",
            data,
        });

    } catch (err) {
        console.error("Unexpected error in updateCategory:", err);
        return res.status(500).json({
            message: "Unexpected server error",
        });
    }
};

/*
 * DELETE /api/categories/:id
 * ลบหมวดหมู่
 * (Delete a cetegory by ID)
*/
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // เช็กก่อนว่าหมวดหมู่นี้ถูกใช้อยู่ใน Products ไหม
        const { data: productsUsingCategory, error: productCheckError } = await supabase
            .from("Products")
            .select("id")
            .eq("category_id", id)
            .limit(1);

        if (productCheckError) {
            console.error("Error checking related products:", productCheckError);
            return res.status(500).json({
                message: "Failed to check related products",
                error: productCheckError.message,
            });
        }

        if (productsUsingCategory && productsUsingCategory.length > 0) {
            return res.status(400).json({
                message: "Cannot delete category because it is being used by products",
            });
        }

        const { error } = await supabase
            .from("Categories")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting category:", error);
            return res.status(500).json({
                message: "Failed to delete category",
                error: error.message,
            });
        }

        return res.status(200).json({
            message: "Category deleted successfully",
        });

    } catch (err) {
        console.error("Unexpected error in deleteCategory:", err);
        return res.status(500).json({
            message: "Unexpected server error",
        });
    }
};