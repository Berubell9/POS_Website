import { useEffect, useMemo, useState } from "react";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

import AddCategoryButton from './AddCategoryButton'
import EditCategoryButton from './EditCategoryButton'
import DeleteCategoryButton from './DeleteCategoryButton'
import SearchBar from '../SearchBar'
import Pagination from '../../Pagination'
import Alert from "../../../components/Alert";

type Category = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category_id: number | null;
};

type CategoriesItemTableProps = {
    refreshKey?: number;
};

const API_BASE = import.meta.env.VITE_API_BASE;

export default function CategoryItemTable({
    refreshKey,
}: CategoriesItemTableProps) {
    // State
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // Notion State
    const [alert, setAlert] = useState<{
        message: string;
        type: "success" | "error" | "info" | "warning";
    } | null>(null);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    // สั่งให้โหลดข้อมูลตอนเริ่ม render หรือเมื่อ refreshKey เปลี่ยน
    useEffect(() => {
        fetchData();
    }, [refreshKey]);

    // ฟังก์ชันโหลดข้อมูลทั้งหมด
    const fetchData = async () => {
        try {
            setLoading(true);

            // ดึงข้อมูลจากในตาราง Products และCategories จาก supabase
            const [productsRes, categoriesRes] = await Promise.all([
                fetch(`${API_BASE}/api/products`),
                fetch(`${API_BASE}/api/categories`),
            ]);

            if (!productsRes.ok) {
                setAlert({
                    message: "โหลดข้อมูลสินค้าไม่สำเร็จ",
                    type: "error",
                });
                return;
            }

            if (!categoriesRes.ok) {
                setAlert({
                    message: "โหลดข้อมูลหมวดหมู่ไม่สำเร็จ",
                    type: "error",
                });
                return;
            }

            const productsData = await productsRes.json();
            const categoriesData = await categoriesRes.json();

            // Set state
            setProducts(productsData || []);
            setCategories(categoriesData || []);
            setCurrentPage(1);
        } catch (error) {
            console.error("Unexpected fetch error:", error);
            setAlert({
                message: "ดึงข้อมูลไม่สำเร็จ",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const productCountMap = useMemo(() => {
        const countMap: Record<number, number> = {};

        products.forEach((product) => {
            if (product.category_id != null) {
                countMap[product.category_id] = (countMap[product.category_id] || 0) + 1;
            }
        });

        return countMap;
    }, [products]);

    const filteredCategories = useMemo(() => {
        return categories.filter((category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    const currentCategories = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredCategories.slice(startIndex, endIndex);
    }, [filteredCategories, currentPage]);

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

            {/* หัวตาราง */}
            <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
                {/* Title */}
                <div className="flex items-center">
                    <FormatListBulletedOutlinedIcon className="text-pink-400 mr-2" />
                    <p className="text-xl font-extrabold">รายการหมวดหมู่</p>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-none">
                        <SearchBar
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <AddCategoryButton
                        onAdded={fetchData}
                        onAlert={(message, type) => setAlert({ message, type })}
                    />
                </div>
            </div>

            <table className="min-w-full">
                {/* คอลัมตาราง */}
                <thead className="bg-gray-100 text-gray-500 font-extrabold">
                    <tr>
                        <th className="hidden sm:table-cell px-4 py-3 text-left">ลำดับ</th>
                        <th className="px-4 py-3 text-left">ชื่อหมวดหมู่</th>
                        <th className="px-4 py-3 text-center">จำนวนเมนู</th>
                        <th className="px-4 py-3 text-center">จัดการ</th>
                    </tr>
                </thead>

                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan={4} className="py-8 text-xl text-center text-gray-400">
                                กำลังโหลดข้อมูล...
                            </td>
                        </tr>
                    )}
                    {!loading && currentCategories.map((category, index) => (
                        // รายการหมวดหมู่
                        <tr key={category.id} className="border-t border-gray-100">
                            {/* ลำดับ */}
                            <td className="hidden sm:table-cell px-4 py-3 text-left">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>

                            {/* ชื่อหมวดหมู่ */}
                            <td className="px-4 py-3 text-left break-all">{category.name}</td>

                            {/* จำนวนเมนู */}
                            <td className="px-4 py-3 text-center">
                                {productCountMap[category.id] || 0}
                            </td>

                            {/* จัดการ */}
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-center gap-2">
                                    {/* ปุ่มเเก้ไขหมวดหมู่ */}
                                    <EditCategoryButton
                                        category={category}
                                        onUpdated={fetchData}
                                        onAlert={(message, type) => setAlert({ message, type })}
                                    />

                                    {/* ปุ่มลบหมวดหมู่ */}
                                    <DeleteCategoryButton
                                        category={category}
                                        onDeleted={fetchData}
                                        onAlert={(message, type) => setAlert({ message, type })}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}

                    {/* ถ้าค้นหาไม่เจอ หรือมีมีข้อมูลใน Database จะ "ไม่พบหมวดหมู่" */}
                    {!loading && filteredCategories.length === 0 && (
                        <tr>
                            <td colSpan={4} className="py-8 text-xl text-center text-gray-400">
                                ไม่พบหมวดหมู่
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* เมื่อเมนูเกินจะเเบ่งเมนูไปอีกหน้า พร้อมเเสดงปุ่มให้กดหน้าถัดไป */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}
