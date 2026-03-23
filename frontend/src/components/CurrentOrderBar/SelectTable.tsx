import { useEffect, useState } from "react";

type Table = {
    id: number;
    table_number: string;
    is_active: boolean;
};

type SelectTableProps = {
    value: string;
    onChange: (value: string) => void;
};

const API_BASE = "http://localhost:3001/api";

export default function SelectTable({
    value,
    onChange,
}: SelectTableProps) {
    const [tables, setTables] = useState<Table[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            setLoading(true);

            const res = await fetch(`${API_BASE}/tables`);
            if (!res.ok) throw new Error("โหลดโต๊ะไม่สำเร็จ");

            const data = await res.json();

            setTables((data || []).filter((t: Table) => t.is_active));
        } catch (error) {
            console.error("Fetch tables error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <label className="block font-semibold">หมายเลขโต๊ะ</label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 h-11 w-full rounded-md border border-gray-200 p-2 text-gray-500 outline-none"
            >
                <option>เลือกหมายเลขโต๊ะ</option>

                {loading && <option disabled>กำลังโหลด...</option>}

                {!loading &&
                    tables.map((table) => (
                        <option key={table.id} value={table.id} disabled={!table.is_active}>
                            โต๊ะ {table.table_number} {table.is_active ? "" : "(ปิด)"}
                        </option>
                    ))}
            </select>
        </div>
    );
}