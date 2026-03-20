// ref : https://medium.com/@harshada_27642/crud-app-with-supabase-and-express-testing-on-postman-67a92168c96f

import supabase from "../services/supabase.js";

/*
 * GET /api/products
 * ดึงสินค้าทั้งหมด
 * (Get all products)
*/
export const getProducts = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("Products")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

/*
 * GET /api/products/:id
 * ดึงสินค้าตาม id 
 * (Get product by ID)
 */
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from("Products")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

/*
 * POST /api/products
 * เพิ่มสินค้าใหม่ 
 * (Create a new product)
 */
export const createProduct = async (req, res) => {
    const { name, price, image, category_id } = req.body;

    try {
        const { data, error } = await supabase
            .from("Products")
            .insert([
                {
                    name,
                    price,
                    image,
                    category_id,
                    is_available: true,
                },
            ])
            .select();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json(data[0]);

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

/*
 * PUT /api/products/:id
 * แก้ไขสินค้า 
 * (Update a product by ID)
 */
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image, category_id, is_available } = req.body;

    try {
        const { data, error } = await supabase
            .from("Products")
            .update({
                name,
                price,
                image,
                category_id,
                is_available,
            })
            .eq("id", id)
            .select();

        if (error) {
            return res.status(500).json({
                message: "Update failed",
                error: error.message,
            });
        }

        res.json({
            message: "Update success",
            data,
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
        });
    }
};

/*
 * DELETE /api/products/:id
 * ลบสินค้า 
 * (Delete a product by ID)
 */
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // 1) หา product ก่อน เพื่อเอา image path
        const { data: product, error: findError } = await supabase
            .from("Products")
            .select("id, image")
            .eq("id", id)
            .single();

        if (findError || !product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        // 2) ลบ row จาก Products
        const { error: deleteError } = await supabase
            .from("Products")
            .delete()
            .eq("id", id);

        if (deleteError) {
            return res.status(500).json({
                message: "Failed to delete product",
                error: deleteError.message,
            });
        }

        // 3) ลบรูปจาก storage
        if (product.image) {
            const marker = "/storage/v1/object/public/product-images/";
            const index = product.image.indexOf(marker);

            if (index !== -1) {
                const filePath = product.image.substring(index + marker.length);

                const { error: storageError } = await supabase.storage
                    .from("product-images")
                    .remove([filePath]);

                if (storageError) {
                    console.error("Delete image error:", storageError);
                }
            }
        }

        return res.status(200).json({
            message: "Product deleted successfully",
        });
        
    } catch (err) {
        console.error("Unexpected error in deleteProduct:", err);
        return res.status(500).json({
            message: "Unexpected server error",
        });
    }
};