import { useEffect, useMemo, useState } from "react";
import supabase from "../../utils/supabase";
import DeleteMenuButton from "./DeleteMenuButton";
import EditMenuButton from "./EditMenuButton";
import Pagination from "./Pagination";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AddMenuButton from "./AddMenuButton";
import SearchBar from "./SearchBar";
import ShowMenuButton from "./ShowMenuButton";

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category_id: number | null;
};

type Category = {
    id: number;
    name: string;
};

// props ที่ component ProductItemTable รับเข้ามา
type ProductItemProps = {
    refreshKey?: number;
    selectedCategory: string;
    onAdded?: () => void;
};

export default function ProductItemTable({
    // props ที่ส่งเข้ามา มาใช้งานใน component
    refreshKey,
    selectedCategory,
}: ProductItemProps) {
    // State
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // State ของ Pagination กำหนดไว้มาถ้ามี 5 เมนูขึ้นไปในตารางให้ตัดไปหน้าถัดไป
    const itemsPerPage = 5;
    // State ของหน้าปัจจุบัน
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
                supabase
                    .from("Products")
                    .select("id, name, price, image, category_id")
                    .order("id", { ascending: true }),
                supabase
                    .from("Categories")
                    .select("id, name")
                    .order("id", { ascending: true }),
            ]);

            // เช็ก error
            if (productsRes.error) {
                console.error("Error fetching products:", productsRes.error);
                return;
            }
            if (categoriesRes.error) {
                console.error("Error fetching categories:", categoriesRes.error);
                return;
            }

            // เซ็ต state
            setProducts((productsRes.data as Product[]) || []);
            setCategories((categoriesRes.data as Category[]) || []);
            setCurrentPage(1);
        } catch (error) {
            console.error("Unexpected fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    // แปลง categories array ให้กลายเป็น object เพื่อใช้ค้นหาง่ายขึ้น
    const categoryMap = useMemo(() => {
        return Object.fromEntries(
            categories.map((category) => [category.id, category.name])
        );
    }, [categories]);

    // กรองสำหรับใช้ค้นหาเมนู
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // ค้นหาจากชื่อสินค้า
            const matchSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase());
            
            // ค้นหาจากชื่อหมวดหมู่
            const categoryName =
                product.category_id ? categoryMap[product.category_id] || "" : "";

            // เช็คว่าตรงกับหมวดหมู่ที่เลือกไหม ถ้าเลือกหมวดหมู่ไหนก็แสดงเมนูในหมวดหมู่นั้น
            const matchCategory =
                selectedCategory === "ทั้งหมด" ||
                categoryName === selectedCategory;

            // ต้องผ่านทั้ง 2 เงื่อนไข
            return matchSearch && matchCategory;
        });
    }, [products, searchTerm, selectedCategory, categoryMap]);
    
    // คำนวณจำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // เมนูเฉพาะหน้าปัจจุบัน
    const currentProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, currentPage]);

    return (
        <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm">
            {/* หัวตาราง */}
            <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
                {/* Title */}
                <div className="flex items-center">
                    <FormatListBulletedOutlinedIcon className="text-pink-400 mr-2" />
                    <p className="text-xl font-extrabold">รายการเมนู</p>
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
                    <AddMenuButton onAdded={fetchData}/>
                </div>
            </div>

            <table className="min-w-full">
                {/* คอลัมตาราง */}
                <thead className="bg-gray-100 text-gray-500 font-extrabold">
                    <tr>
                        <th className="hidden sm:table-cell px-4 py-3 text-left">ลำดับ</th>
                        <th className="hidden lg:table-cell px-4 py-3 text-left">รูปภาพ</th>
                        <th className="px-4 py-3 text-left">ชื่อเมนู</th>
                        <th className="hidden lg:table-cell px-4 py-3 text-left">หมวดหมู่</th>
                        <th className="hidden sm:table-cell px-4 py-3 text-center">ราคา</th>
                        <th className="px-4 py-3 text-center">จัดการ</th>
                    </tr>
                </thead>

                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan={6} className="py-8 text-center text-gray-400">
                                กำลังโหลดข้อมูล...
                            </td>
                        </tr>
                    )}

                    {!loading && currentProducts.map((product, index) => (
                            // รายการเมนู
                            <tr key={product.id} className="border-t border-gray-100">
                                {/* ลำดับ */}
                                <td className="hidden sm:table-cell px-4 py-3 text-left">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>

                                {/* รูปภาพ */}
                                <td className="hidden lg:table-cell px-4 py-3 justify-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-14 w-14 rounded-md object-cover"
                                    />
                                </td>

                                {/* ชื่อเมนู */}
                                <td className="px-4 py-3 text-left">{product.name}</td>
                                
                                {/* หมวดหมู่ */}
                                <td className="hidden lg:table-cell px-4 py-3 text-left">
                                    {product.category_id
                                        ? categoryMap[product.category_id] || "-"
                                        : "-"}
                                </td>

                                {/* ราคา */}
                                <td className="hidden sm:table-cell px-4 py-3 text-center">฿{product.price}</td>
                                
                                {/* จัดการ */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-2">
                                        {/* ปุ่มเเสดงเมนู */}
                                        <ShowMenuButton product={product} onUpdated={fetchData} />
                                        
                                        {/* ปุ่มเเก้ไขเมนู */}
                                        <EditMenuButton product={product} onUpdated={fetchData} />
                                        
                                        {/* ปุ่มลบเมนู */}
                                        <DeleteMenuButton product={product} onDeleted={fetchData}/>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    {/* ถ้าค้นหาไม่เจอ หรือมีมีข้อมูลใน Database จะ "ไม่พบเมนู" */}
                    {!loading && filteredProducts.length === 0 && (
                        <tr>
                            <td colSpan={6} className="py-8 text-center text-gray-400">
                                ไม่พบเมนู
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
    );
}