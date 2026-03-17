import { useEffect, useState } from "react";
import supabase from "../../utils/supabase";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";

type Category = {
    id: number;
    name: string;
};

type AddMenuButtonProps = {
    onAdded?: () => void;
};

export default function AddMenuButton({ onAdded }: AddMenuButtonProps) {
    // Open Modal
    const [open, setOpen] = useState(false);
    
    // Form States
    const [categories, setCategories] = useState<Category[]>([]);
    const [newProductImageFile, setNewProductImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [newProductName, setNewProductName] = useState("");
    const [newProductCategoryId, setNewProductCategoryId] = useState("");
    const [newProductPrice, setNewProductPrice] = useState("");
    const [loading, setLoading] = useState(false);

    // ดึงข้อมูล Categories เมื่อเปิด Modal
    useEffect(() => {
        if (open) {
            fetchCategories();
        }
    }, [open]);

    // ดึงข้อมูลจากตาราง Categories ใน supabase
    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from("Categories")
            .select("id, name")
            .order("id", { ascending: true });

        console.log("fetch from table: Categories");
        console.log("categories data:", data);
        console.log("categories error:", error);

        if (error) {
            console.error("Error fetching categories:", error);
            return;
        }

        setCategories(data || []);
    };

    // รีเซ็ตฟอร์มเมื่อกดปุ่มเข้ามาใหม่
    const resetForm = () => {
        setNewProductImageFile(null);
        setPreviewUrl("");
        setNewProductName("");
        setNewProductCategoryId("");
        setNewProductPrice("");
    };

    // เมื่อหน้าต่างปิดให้ resetForm
    const handleClose = () => {
        resetForm();
        setOpen(false);
    };

    // เเก้ไขตรงที่ใส่รูปเมื่อมีการเพิ่มรูปเข้ามาใหม่ ให้เอาของเก่าออก เเล้วเเสดงอันใหม่
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // ล้างรูปเก่าออกจาก Memory
        const file = e.target.files?.[0] ?? null;
        setNewProductImageFile(file);

        if (file) {
            const localPreview = URL.createObjectURL(file);
            setPreviewUrl(localPreview);
        } else {
            setPreviewUrl("");
        }
    };

    // เมื่อกดปุ่มบันทึก จะมีแจ้งเตือน Error เมื่อใส่ข้อมูลไม่ครบ
    const addProduct = async () => {
        if (!newProductName.trim()) {
            alert("กรุณากรอกชื่อเมนู");
            return;
        }

        if (!newProductCategoryId) {
            alert("กรุณาเลือกหมวดหมู่");
            return;
        }

        if (!newProductPrice.trim() || isNaN(Number(newProductPrice))) {
            alert("กรุณากรอกราคาให้ถูกต้อง");
            return;
        }

        if (!newProductImageFile) {
            alert("กรุณาเลือกรูปภาพ");
            return;
        }

        try {
            setLoading(true);
            
            // Upload Image ลงใน Storage (Bucket) ชื่อ product-images
            const fileExt = newProductImageFile.name.split(".").pop();
            const fileName = `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2)}.${fileExt}`;
            const filePath = `products/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("product-images")
                .upload(filePath, newProductImageFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (uploadError) {
                console.error("Upload image error:", uploadError);
                alert("อัปโหลดรูปไม่สำเร็จ");
                return;
            }

            // Get Public URL จากใน Storage (Bucket) ชื่อ product-images  
            const {
                data: { publicUrl },
            } = supabase.storage.from("product-images").getPublicUrl(filePath);
            
            // Object สำหรับเตรียมข้อมูลเมนูใหม่ก่อนจะส่งเข้า Database
            const newProductData = {
                name: newProductName.trim(),
                price: Number(newProductPrice),
                category_id: Number(newProductCategoryId),
                image: publicUrl,
                is_available: true,
            };

            // Insert ข้อมูลทั้งหมดลง Database ชื่อ Products 
            const { error: insertError } = await supabase
                .from("Products")
                .insert([newProductData]);

            if (insertError) {
                console.error("Insert product error:", insertError);
                alert("เพิ่มเมนูไม่สำเร็จ");
                return;
            }

            alert("เพิ่มเมนูสำเร็จ");
            handleClose();
            onAdded?.();
        } catch (error) {
            console.error("Error adding product:", error);
            alert("เกิดข้อผิดพลาด");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* ปุ่มกดเรียก Modal */}
            <button
                onClick={() => setOpen(true)}
                className="flex items-center bg-green-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-green-600 transition"
            >
                <AddOutlinedIcon sx={{ fontSize: 22 }} />
                <p className="ml-1 hidden sm:inline">เพิ่มเมนู</p>
            </button>

            {/* Modal */}
            {open && (
                // พื้นหลังดำ
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={handleClose}
                >

                    {/* พื้นหลังขาว */}
                    <div
                        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center ">
                            <PostAddOutlinedIcon sx={{ fontSize: 28 }}  className="text-pink-400"/>
                            <p className="ml-1 text-2xl font-extrabold">เพิ่มเมนู</p>
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
                                    placeholder="โปรดระบุชื่อเมนู"
                                    value={newProductName}
                                    onChange={(e) => setNewProductName(e.target.value)}
                                    className="mt-1 w-full text-gray-500 font-light rounded-md border border-gray-200 p-2 outline-none"
                                />
                            </div>
                            
                            {/* หมวดหมู่ */}
                            <div>
                                <label className="block font-bold">หมวดหมู่</label>
                                <select
                                    value={newProductCategoryId}
                                    onChange={(e) => setNewProductCategoryId(e.target.value)}
                                    className="mt-1 w-full text-gray-500 font-light rounded-md border border-gray-200 p-2 h-11 outline-none"
                                >
                                    <option>เลือกหมวดหมู่</option>
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>ไม่พบข้อมูลหมวดหมู่</option>
                                    )}
                                </select>
                            </div>
                            
                            {/* ราคา */}
                            <div>
                                <label className="block font-bold">ราคา (บาท)</label>
                                <input
                                    type="text"
                                    placeholder="โปรดระบุราคา"
                                    value={newProductPrice}
                                    onChange={(e) => setNewProductPrice(e.target.value)}
                                    className="mt-1 w-full text-gray-500 font-light rounded-md border border-gray-200 p-2 outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            {/* ปุ่มยกเลิก */}
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 shadow-md rounded-md text-red-500 bg-red-50 border border-red-300 hover:bg-red-100 transition"
                            >
                                ยกเลิก
                            </button>
                            
                            {/* ปุ่มบันทึก */}
                            <button
                                onClick={addProduct}
                                disabled={loading}
                                className="px-4 py-2 shadow-md rounded-md bg-green-500 text-white hover:bg-green-600 transition disabled:opacity-60"
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