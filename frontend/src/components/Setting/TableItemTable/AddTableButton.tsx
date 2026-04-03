import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";

type AddTableButtonProps = {
    onAdded?: () => void | Promise<void>;
    onAlert?: (message: string, type: "success" | "error" | "info" | "warning") => void;
};

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AddTableButton({
    onAdded,
    onAlert
}: AddTableButtonProps) {
    const [open, setOpen] = useState(false);
    const [tableNumber, setTableNumber] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setTableNumber("");
        setIsActive(true);
    };

    const handleClose = () => {
        resetForm();
        setOpen(false);
    };

    const handleAddTable = async () => {
        if (!tableNumber.trim()) {
            onAlert?.("กรุณากรอกเลขโต๊ะ", "warning");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${API_BASE}/api/tables`, {
                method: "POST",
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
                console.error("Create table error:", result);
                onAlert?.("เพิ่มโต๊ะไม่สำเร็จ", "error");
                return;
            }

            onAlert?.("เพิ่มโต๊ะสำเร็จ", "success");
            handleClose();
            await onAdded?.();
        } catch (error) {
            console.error("Unexpected create table error:", error);
            alert("");
            onAlert?.("เกิดข้อผิดพลาดในการเพิ่มโต๊ะ", "error");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center rounded-md bg-green-500 px-3 py-2 text-white shadow-md transition hover:bg-green-600"
            >
                <AddOutlinedIcon sx={{ fontSize: 22 }} />
                <p className="ml-1 hidden sm:inline">เพิ่มโต๊ะ</p>
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div
                        className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center">
                            <PlaylistAddOutlinedIcon
                                sx={{ fontSize: 28 }}
                                className="mr-1 text-pink-400"
                            />
                            <p className="text-2xl font-extrabold">เพิ่มโต๊ะ</p>
                        </div>

                        <div className="mt-5 space-y-4">
                            <div>
                                <label className="block font-bold">เลขโต๊ะ</label>
                                <input
                                    type="text"
                                    placeholder="โปรดระบุเลขโต๊ะ"
                                    value={tableNumber}
                                    onChange={(e) => setTableNumber(e.target.value)}
                                    className="mt-1 w-full rounded-md border border-gray-200 p-2 text-gray-500 font-light outline-none"
                                />
                            </div>

                            <div>
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
                                onClick={handleAddTable}
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
