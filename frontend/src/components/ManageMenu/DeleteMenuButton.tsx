import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

type Product = {
    id: number;
    name: string;
    image: string;
};

type DeleteMenuButtonProps = {
    product: Product;
    onDeleted?: () => void | Promise<void>;
    onAlert?: (message: string, type: "success" | "error" | "info" | "warning") => void;
};

const API_BASE = "http://localhost:3001/api";

export default function DeleteMenuButton({
    product,
    onDeleted,
    onAlert,
}: DeleteMenuButtonProps) {
    const handleDelete = async () => {
        const confirmed = window.confirm(`ต้องการลบเมนู "${product.name}" ใช่หรือไม่`);
        if (!confirmed) return;

        try {
            const res = await fetch(`${API_BASE}/products/${product.id}`, {
                method: "DELETE",
            });

            const result = await res.json();

            if (!res.ok) {
                console.error("Delete product error:", result);
                onAlert?.("ลบเมนูไม่สำเร็จ", "error");
                return;
            }

            onAlert?.("ลบเมนูสำเร็จ", "success");
            await onDeleted?.();
        } catch (error) {
            console.error("Unexpected delete error:", error);
            onAlert?.("เกิดข้อผิดพลาดในการลบเมนู", "error");
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