import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

// กำหนดตัว Type ของ Category เเละProduct เพื่อมาเปรียบเทียบ id เพื่อให้ Category แสดงขึ้นมา
type Category = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category_id: number | null;
};

type EditMenuButtonProps = {
    product: Product;
    onUpdated?: () => void;
    onAlert?: (message: string, type: "success" | "error" | "info" | "warning") => void;
};

const API_BASE = import.meta.env.VITE_API_BASE;

export default function EditMenuButton({
    product,
    onUpdated,
    onAlert,
}: EditMenuButtonProps) {
    // Open Modal
    const [open, setOpen] = useState(false);

    // Form States
    const [categories, setCategories] = useState<Category[]>([]);
    const [productName, setProductName] = useState(product.name);
    const [productPrice, setProductPrice] = useState(String(product.price));
    const [productCategoryId, setProductCategoryId] = useState(
        product.category_id ? String(product.category_id) : ""
    );
    const [newImageFile, setNewImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState(product.image);
    const [loading, setLoading] = useState(false);

    // ดึงข้อมูล Categories และข้อมูลเดิมของ Product เมื่อเปิด Modal
    useEffect(() => {
        if (open) {
            fetchCategories();
            setProductName(product.name);
            setProductPrice(String(product.price));
            setProductCategoryId(product.category_id ? String(product.category_id) : "");
            setPreviewUrl(product.image);
            setNewImageFile(null);
        }
    }, [open, product]);

    // ดึงข้อมูลจากตาราง Categories ใน supabase
    const fetchCategories = async () => {
        try {
            // ดึงข้อมูลจากในตาราง Categories จาก supabase
            const res = await fetch(`${API_BASE}/api/categories`);

            if (!res.ok) {
                onAlert?.("โหลดข้อมูลหมวดหมู่ไม่สำเร็จ", "error");
                return;
            }

            const data = await res.json();
            setCategories(data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            onAlert?.("ดึงข้อมูลหมวดหมู่ไม่สำเร็จ", "error");
            return;
        }
    };

    // เเก้ไขตรงที่ใส่รูปเมื่อมีการเพิ่มรูปเข้ามาใหม่ ให้เอาของเก่าออก เเล้วเเสดงอันใหม่
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setNewImageFile(file);

        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // เมื่อกดปุ่มบันทึก จะมีแจ้งเตือน Error เมื่อใส่ข้อมูลไม่ครบ
    const handleUpdate = async () => {
        if (!productName.trim()) {
            onAlert?.("กรุณากรอกชื่อเมนู", "warning");
            return;
        }

        if (!productCategoryId) {
            onAlert?.("กรุณาเลือกหมวดหมู่", "warning");
            return;
        }

        if (!productPrice.trim() || isNaN(Number(productPrice))) {
            onAlert?.("กรุณากรอกราคาให้ถูกต้อง", "warning");
            return;
        }

        try {
            setLoading(true);

            let imageUrl = product.image;

            // ถ้ามีเลือกรูปใหม่ ให้อัปโหลดรูปใหม่
            if (newImageFile) {
                const formData = new FormData();
                formData.append("image", newImageFile);

                // Upload Image ลงใน Storage (Bucket) ชื่อ product-images
                const uploadRes = await fetch(`${API_BASE}/api/product-images`, {
                    method: "POST",
                    body: formData,
                });

                const uploadResult = await uploadRes.json();

                if (!uploadRes.ok) {
                    console.error("Upload image error:", uploadResult);
                    onAlert?.("อัปโหลดรูปใหม่ไม่สำเร็จ", "error");
                }

                imageUrl = uploadResult.publicUrl;
            }

            // ส่งข้อมูลไปที่ backend เพื่อแก้ไขเมนู id
            const updateRes = await fetch(`${API_BASE}/api/products/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: productName.trim(),
                    price: Number(productPrice),
                    category_id: Number(productCategoryId),
                    image: imageUrl,
                }),
            });

            const updateResult = await updateRes.json();

            if (!updateRes.ok) {
                console.error("Update product error:", updateResult);
                onAlert?.("แก้ไขเมนูไม่สำเร็จ", "error");
                return;
            }

            onAlert?.("แก้ไขเมนูสำเร็จ", "success");
            setOpen(false);
            await onUpdated?.();
        } catch (error) {
            console.error("Unexpected update error:", error);
            onAlert?.("เกิดข้อผิดพลาดในการอัปเดตเมนู", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* ปุ่มกดเรียก Modal */}
            <button
                onClick={() => setOpen(true)}
                className="flex items-center rounded-md bg-yellow-400 px-3 py-2 text-white shadow-sm hover:bg-yellow-500 transition"
            >
                <EditOutlinedIcon sx={{ fontSize: 18 }} />
                <p className="ml-1 hidden sm:inline">แก้ไข</p>
            </button>

            {/* Modal */}
            {open && (
                // พื้นหลังดำ
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    
                    {/* พื้นหลังขวา */}
                    <div
                        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Header */}
                        <div className="flex items-center">
                            <EditNoteOutlinedIcon sx={{ fontSize: 30 }} className="text-pink-400" />
                            <p className="ml-1 text-2xl font-extrabold">แก้ไขเมนู</p>
                        </div>

                        <div className="mt-5 space-y-4">
                            {/* เลือกรูปภาพ */}
                            <div>
                                <label className="block font-bold">รูปภาพเมนู</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-2 block w-full text-gray-400 font-light file:mr-4 file:py-1 file:px-3 file:rounded-full file:border file:border-pink-300 file:font-semibold file:bg-pink-50 file:text-pink-400 hover:file:bg-pink-100 file:shadow-sm"
                                />
                                {/* แสดงรูปภาพ */}
                                {previewUrl && (
                                    <img
                                        src={previewUrl}
                                        alt="preview"
                                        className="mt-3 w-full h-40 rounded-md object-contain border border-gray-200"
                                    />
                                )}
                            </div>

                            {/* ชื่อเมนู */}
                            <div>
                                <label className="block font-bold">ชื่อเมนู</label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder="ระบุชื่อเมนู"
                                    className="mt-1 w-full text-gray-500 font-light rounded-md border border-gray-200 p-2 outline-none"
                                />
                            </div>

                            {/* หมวดหมู่ */}
                            <div>
                                <label className="block font-bold">หมวดหมู่</label>
                                <select
                                    value={productCategoryId}
                                    onChange={(e) => setProductCategoryId(e.target.value)}
                                    className="mt-1 w-full text-gray-500 font-light rounded-md border border-gray-200 p-2 h-11 outline-none"
                                >
                                    <option>เลือกหมวดหมู่</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* ราคา */}
                            <div>
                                <label className="block font-bold">ราคา (บาท)</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="โปรดระบุราคา"
                                    value={productPrice}
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value === "" || Number(value) >= 0) {
                                            setProductPrice(value);
                                        }
                                    }}
                                    className="mt-1 w-full text-gray-500 font-light rounded-md border border-gray-200 p-2 outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            {/* ปุ่มยกเลิก */}
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-red-500 shadow-md hover:bg-red-100 transition"
                            >
                                ยกเลิก
                            </button>

                            {/* ปุ่มบันทึก */}
                            <button
                                onClick={handleUpdate}
                                disabled={loading}
                                className="rounded-md bg-green-500 px-4 py-2 text-white shadow-md hover:bg-green-600 transition disabled:opacity-60"
                            >
                                {loading ? "กำลังบันทึก..." : "บันทึก"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
