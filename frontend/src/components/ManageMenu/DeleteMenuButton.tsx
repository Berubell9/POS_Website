import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

type Product = {
    id: number;
    name: string;
    image: string;
};

type DeleteMenuButtonProps = {
    product: Product;
    onDeleted?: () => void | Promise<void>;
};

const API_BASE = "http://localhost:3001/api";

export default function DeleteMenuButton({
    product,
    onDeleted,
}: DeleteMenuButtonProps) {
    const handleDelete = async () => {
        // เเจ้งเตือนถามก่อนลบ
        const confirmed = window.confirm(`ต้องการลบเมนู "${product.name}" ใช่หรือไม่`);
        if (!confirmed) return;

        try {
            // ดึงข้อมูลจาก Products
            const res = await fetch(`${API_BASE}/products/${product.id}`, {
                method: "DELETE",
            });

            const result = await res.json();

            if (!res.ok) {
                console.error("Delete product error:", result);
                alert(result.message || "ลบเมนูไม่สำเร็จ");
                return;
            }

            alert("ลบเมนูสำเร็จ");
            await onDeleted?.();
        } catch (error) {
            console.error("Unexpected delete error:", error);
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