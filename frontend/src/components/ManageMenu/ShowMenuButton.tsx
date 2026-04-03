import { useEffect, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category_id: number | null;
};

type Category = {
    id: number;
    name: string;
};

type Props = {
    product: Product;
    onUpdated?: () => void;
    onAlert?: (message: string, type: "success" | "error" | "info" | "warning") => void;
};

const API_BASE = "http://localhost:3001/api";

export default function ShowMenuButton({
    product,
    onAlert,
}: Props) {

    // Open Modal
    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    // เมื่อ Modal แล้วให้ดึง Categories มาแสดง
    useEffect(() => {
        if (open) {
            fetchCategories();
        }
    }, [open, product]);

    // ดึง Categories จาก supabase
    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_BASE}/categories`);

            if (!res.ok) {
                onAlert?.("โหลดข้อมูลหมวดหมู่ไม่สำเร็จ", "error");
                return;
            }

            const data: Category[] = await res.json();

            const found = data?.find((c) => c.id === product.category_id);
            setCategoryName(found ? found.name : "-");
        } catch (error) {
            console.error("Error fetching categories:", error);
            onAlert?.("ดึงข้อมูลหมวดหมูไม่สำเร็จ", "error");
            setCategoryName("-");
        }
    };

    return (
        <div>
            {/* ปุ่มเปิด modal */}
            <button
                onClick={() => setOpen(true)}
                className="flex items-center bg-sky-500 text-white px-3 py-2 rounded-md shadow-md hover:bg-sky-600 transition"
            >
                <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
                <p className="ml-1 hidden sm:inline">ดูเมนู</p>
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
                            <ArticleOutlinedIcon sx={{ fontSize: 26 }} className="mr-1 text-pink-400" />
                            <p className="text-2xl font-extrabold">รายละเอียดเมนู</p>
                        </div>

                        <div className="mt-2 space-y-4">
                            {/* แสดงรูป */}
                            <div>
                                <p className="font-bold mb-1">รูปภาพเมนู</p>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-40 object-contain border border-gray-400 rounded-md"
                                />
                            </div>

                            {/* ชื่อเมนู */}
                            <div>
                                <p className="font-bold mb-1">ชื่อเมนู</p>
                                <p className="font-light border rounded-md p-2 bg-gray-100 text-gray-400">{product.name}</p>
                            </div>

                            {/* หมวดหมู่ */}
                            <div>
                                <p className="font-bold mb-1">หมวดหมู่</p>
                                <p className="font-light border rounded-md p-2 bg-gray-100 text-gray-400">{categoryName}</p>
                            </div>

                            {/* ราคา */}
                            <div>
                                <p className="font-bold mb-1">ราคา (บาท)</p>
                                <p className="font-light border rounded-md p-2 bg-gray-100 text-gray-400">{product.price}</p>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            {/* ปุ่มปิด */}
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-red-500 shadow-md hover:bg-red-100 transition"
                            >
                                ปิด
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}