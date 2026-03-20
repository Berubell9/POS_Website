import { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";

type AddCategoryButtonProps = {
  onAdded?: () => void | Promise<void>;
};

const API_BASE = "http://localhost:3001/api";

export default function AddCategoryButton({
  onAdded,
}: AddCategoryButtonProps) {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setCategoryName("");
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      alert("กรุณากรอกชื่อหมวดหมู่");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName.trim(),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Create category error:", result);
        alert(result.message || "เพิ่มหมวดหมู่ไม่สำเร็จ");
        return;
      }

      alert("เพิ่มหมวดหมู่สำเร็จ");
      handleClose();
      await onAdded?.();
    } catch (error) {
      console.error("Unexpected create category error:", error);
      alert("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ปุ่มเปิด modal */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center rounded-md bg-green-500 px-3 py-2 text-white shadow-md transition hover:bg-green-600"
      >
        <AddOutlinedIcon sx={{ fontSize: 22 }} />
        <p className="ml-1 hidden sm:inline">เพิ่มหมวดหมู่</p>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center">
              <PlaylistAddOutlinedIcon
                sx={{ fontSize: 28 }}
                className="mr-1 text-pink-400"
              />
              <p className="text-2xl font-extrabold">เพิ่มหมวดหมู่</p>
            </div>

            {/* Form */}
            <div className="mt-5">
              <label className="block font-bold">ชื่อหมวดหมู่</label>
              <input
                type="text"
                placeholder="โปรดระบุชื่อหมวดหมู่"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-200 p-2 text-gray-500 font-light outline-none"
              />
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-red-500 shadow-md transition hover:bg-red-100"
              >
                ยกเลิก
              </button>

              <button
                onClick={handleAddCategory}
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