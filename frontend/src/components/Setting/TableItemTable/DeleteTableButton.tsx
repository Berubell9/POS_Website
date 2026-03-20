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
};

const API_BASE = "http://localhost:3001/api";

export default function DeleteTableButton({
    table,
    onDeleted,
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
                alert(result.message || "ลบโต๊ะไม่สำเร็จ");
                return;
            }

            alert("ลบโต๊ะสำเร็จ");
            await onDeleted?.();
        } catch (error) {
            console.error("Unexpected delete table error:", error);
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