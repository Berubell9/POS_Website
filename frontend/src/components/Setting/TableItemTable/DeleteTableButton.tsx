import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

type TableItem = {
    id: number;
    table_number: string;
    is_active: boolean;
    created_at?: string;
};

type DeleteTableButtonProps = {
    table: TableItem;
    onDeleted?: () => void | Promise<void>;
    onAlert?: (message: string, type: "success" | "error" | "info" | "warning") => void;
};

const API_BASE = "http://localhost:3001/api";

export default function DeleteTableButton({
    table,
    onDeleted,
    onAlert
}: DeleteTableButtonProps) {
    const handleDelete = async () => {
        const confirmed = window.confirm(
            `ต้องการลบโต๊ะ "${table.table_number}" ใช่หรือไม่`
        );
        if (!confirmed) return;

        try {
            const res = await fetch(`${API_BASE}/tables/${table.id}`, {
                method: "DELETE",
            });

            const result = await res.json();

            if (!res.ok) {
                console.error("Delete table error:", result);
                onAlert?.("ลบโต๊ะไม่สำเร็จ", "error");
                return;
            }

            onAlert?.("ลบโต๊ะสำเร็จ", "success");
            await onDeleted?.();
        } catch (error) {
            console.error("Unexpected delete table error:", error);
            alert("");
            onAlert?.("เกิดข้อผิดพลาดในการลบโต๊ะ", "error");
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