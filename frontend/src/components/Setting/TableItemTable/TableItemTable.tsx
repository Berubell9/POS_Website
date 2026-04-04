import { useEffect, useMemo, useState } from "react";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

import SearchBar from "../SearchBar";
import Pagination from "../../Pagination";
import AddTableButton from "./AddTableButton";
import EditTableButton from "./EditTableButton";
import DeleteTableButton from "./DeleteTableButton";
import Alert from "../../../components/Alert";

type TableItem = {
    id: number;
    table_number: string;
    is_active: boolean;
    created_at?: string;
};

type TableItemTableProps = {
    refreshKey?: number;
};

const API_BASE = import.meta.env.VITE_API_BASE;

export default function TableItemTable({ refreshKey }: TableItemTableProps) {
    const [tables, setTables] = useState<TableItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // Notion State
    const [alert, setAlert] = useState<{
        message: string;
        type: "success" | "error" | "info" | "warning";
    } | null>(null);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [refreshKey]);

    const fetchData = async () => {
        try {
            setLoading(true);

            const res = await fetch(`${API_BASE}/api/tables`);

            if (!res.ok) {
                throw new Error("โหลดข้อมูลโต๊ะไม่สำเร็จ");
            }

            const data: TableItem[] = await res.json();
            setTables(data || []);
            setCurrentPage(1);
        } catch (error) {
            console.error("Unexpected fetch tables error:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredTables = useMemo(() => {
        return tables.filter((table) =>
            table.table_number.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tables, searchTerm]);

    const totalPages = Math.ceil(filteredTables.length / itemsPerPage);

    const currentTables = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredTables.slice(startIndex, endIndex);
    }, [filteredTables, currentPage]);

    return (
        <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm">
            {/* เเจ้งเตือน */}
            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={() => setAlert(null)}
                />
            )}

            <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center">
                    <FormatListBulletedOutlinedIcon className="mr-2 text-pink-400" />
                    <p className="text-xl font-extrabold">รายการโต๊ะ</p>
                </div>

                <div className="flex w-full items-center gap-3 sm:w-auto">
                    <div className="flex-1 sm:flex-none">
                        <SearchBar
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <AddTableButton onAdded={fetchData} />
                </div>
            </div>

            <table className="min-w-full">
                <thead className="bg-gray-100 text-gray-500 font-extrabold">
                    <tr>
                        <th className="hidden sm:table-cell  px-4 py-3 text-left">ลำดับ</th>
                        <th className="px-4 py-3 text-left">เลขโต๊ะ</th>
                        <th className="px-4 py-3 text-center">สถานะ</th>
                        <th className="px-4 py-3 text-center">จัดการ</th>
                    </tr>
                </thead>

                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan={5} className="py-8 text-xl text-center text-gray-400">
                                กำลังโหลดข้อมูล...
                            </td>
                        </tr>
                    )}

                    {!loading &&
                        currentTables.map((table, index) => (
                            <tr key={table.id} className="border-t border-gray-100">
                                <td className="hidden sm:table-cell px-4 py-3 text-left">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>

                                <td className="px-4 py-3 text-left break-all">{table.table_number}</td>

                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-semibold ${table.is_active
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {table.is_active ? "พร้อมใช้งาน" : "ปิดใช้งาน"}
                                    </span>
                                </td>

                                <td className="px-4 py-3 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <EditTableButton table={table} onUpdated={fetchData} />
                                        <DeleteTableButton table={table} onDeleted={fetchData} />
                                    </div>
                                </td>
                            </tr>
                        ))}

                    {!loading && filteredTables.length === 0 && (
                        <tr>
                            <td colSpan={5} className="py-8 text-xl text-center text-gray-400">
                                ไม่พบข้อมูลโต๊ะ
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
