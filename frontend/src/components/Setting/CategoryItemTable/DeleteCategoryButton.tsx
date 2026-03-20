import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

type Category = {
    id: number;
    name: string;
};

type DeleteCategoryButtonProps = {
    category: Category;
    onDeleted?: () => void | Promise<void>;
};

const API_BASE = "http://localhost:3001/api";

export default function DeleteCategoryButton({
    category,
    onDeleted,
}: DeleteCategoryButtonProps) {
    const handleDelete = async () => {
        const confirmed = window.confirm(
            `ต้องการลบหมวดหมู่ "${category.name}" ใช่หรือไม่`
        );
        if (!confirmed) return;

        try {
            const res = await fetch(`${API_BASE}/categories/${category.id}`, {
                method: "DELETE",
            });

            const result = await res.json();

            if (!res.ok) {
                console.error("Delete category error:", result);
                alert(result.message || "ลบหมวดหมู่ไม่สำเร็จ");
                return;
            }

            alert("ลบหมวดหมู่สำเร็จ");
            await onDeleted?.();
        } catch (error) {
            console.error("Unexpected delete category error:", error);
            alert("เกิดข้อผิดพลาด");
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="flex items-center rounded-md bg-red-500 px-3 py-2 text-white shadow-sm transition hover:bg-red-600"
        >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
            <p className="ml-1 hidden sm:inline">ลบ</p>
        </button>
    );
}