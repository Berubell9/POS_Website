import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

type TableItem = {
    id: number;
    table_number: string;
    is_active: boolean;
    created_at?: string;
};

type EditTableButtonProps = {
    table: TableItem;
    onUpdated?: () => void | Promise<void>;
};

const API_BASE = "http://localhost:3001/api";

export default function EditTableButton({
    table,
    onUpdated,
}: EditTableButtonProps) {
    const [open, setOpen] = useState(false);
    const [tableNumber, setTableNumber] = useState(table.table_number);
    const [isActive, setIsActive] = useState(table.is_active);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setTableNumber(table.table_number);
        setIsActive(table.is_active);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = async () => {
        if (!tableNumber.trim()) {
            alert("กรุณากรอกเลขโต๊ะ");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${API_BASE}/tables/${table.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    table_number: tableNumber.trim(),
                    is_active: isActive,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                console.error("Update table error:", result);
                alert(result.message || "แก้ไขโต๊ะไม่สำเร็จ");
                return;
            }

            alert("แก้ไขโต๊ะสำเร็จ");
            setOpen(false);
            await onUpdated?.();
        } catch (error) {
            console.error("Unexpected update table error:", error);
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
                            <p className="text-2xl font-extrabold">แก้ไขโต๊ะ</p>
                        </div>

                        {/* เลขโต๊ะ */}
                        <div className="mt-5 space-y-4">
                            <div className="flex flex-col items-start">
                                <label className="block font-bold">เลขโต๊ะ</label>
                                <input
                                    type="text"
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    placeholder="โปรดระบุเลขโต๊ะ"
                                    className="mt-1 w-full rounded-md border border-gray-200 p-2 text-gray-500 font-light outline-none"
                                />
                            </div>
                            
                            {/* สถานะ */}
                            <div className="flex flex-col items-start">
                                <label className="block font-bold">สถานะ</label>
                                <select
                                    value={isActive ? "true" : "false"}
                                    onChange={(e) => setIsActive(e.target.value === "true")}
                                    className="mt-1 h-11 w-full rounded-md border border-gray-200 p-2 text-gray-500 font-light outline-none"
                                >
                                    <option value="true">พร้อมใช้งาน</option>
                                    <option value="false">ปิดใช้งาน</option>
                                </select>
                            </div>
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