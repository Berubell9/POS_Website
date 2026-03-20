import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

type Category = {
    id: number;
    name: string;
};

type EditCategoryButtonProps = {
    category: Category;
    onUpdated?: () => void | Promise<void>;
};

const API_BASE = "http://localhost:3001/api";

export default function EditCategoryButton({
    category,
    onUpdated,
}: EditCategoryButtonProps) {
    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState(category.name);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setCategoryName(category.name);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = async () => {
        if (!categoryName.trim()) {
            alert("กรุณากรอกชื่อหมวดหมู่");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${API_BASE}/categories/${category.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: categoryName.trim(),
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                console.error("Update category error:", result);
                alert(result.message || "แก้ไขหมวดหมู่ไม่สำเร็จ");
                return;
            }

            alert("แก้ไขหมวดหมู่สำเร็จ");
            setOpen(false);
            await onUpdated?.();
        } catch (error) {
            console.error("Unexpected update category error:", error);
            alert("เกิดข้อผิดพลาด");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleOpen}
                className="flex items-center rounded-md bg-yellow-400 px-3 py-2 text-white shadow-sm transition hover:bg-yellow-500"
            >
                <EditOutlinedIcon sx={{ fontSize: 18 }} />
                <p className="ml-1 hidden sm:inline">แก้ไข</p>
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onClick={handleClose}
                >
                    <div
                        className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center">
                            <EditNoteOutlinedIcon
                                sx={{ fontSize: 28 }}
                                className="mr-1 text-pink-400"
                            />
                            <p className="text-2xl font-extrabold">แก้ไขหมวดหมู่</p>
                        </div>

                        <div className="mt-5">
                            <label className="block font-bold">ชื่อหมวดหมู่</label>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="โปรดระบุชื่อหมวดหมู่"
                                className="mt-1 w-full rounded-md border border-gray-200 p-2 text-gray-500 font-light outline-none"
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={handleClose}
                                className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-red-500 shadow-md transition hover:bg-red-100"
                            >
                                ยกเลิก
                            </button>

                            <button
                                onClick={handleUpdate}
                                disabled={loading}
                                className="rounded-md bg-green-500 px-4 py-2 text-white shadow-md transition hover:bg-green-600 disabled:opacity-60"
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