import supabase from "../services/supabase.js";
import multer from "multer";

// เก็บ url รูปที่อัพโหลดลงบน Bucket หรือ storage ชื่อ product-images
const upload = multer({ storage: multer.memoryStorage() });

export const uploadMiddleware = upload.single("image");

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const fileExt = req.file.originalname.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error } = await supabase.storage
            .from("product-images")
            .upload(filePath, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: false,
            });

        if (error) {
            return res.status(500).json({
                message: "Upload failed",
                error: error.message,
            });
        }

        const {
            data: { publicUrl },
        } = supabase.storage.from("product-images").getPublicUrl(filePath);

        return res.status(200).json({
            message: "Upload successful",
            publicUrl,
        });
    } catch (err) {
        console.error("Unexpected upload error:", err);
        return res.status(500).json({
            message: "Unexpected server error",
        });
    }
};