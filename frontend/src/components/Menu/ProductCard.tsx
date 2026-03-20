import { useEffect, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

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

type ProductCardProps = {
    refreshKey?: number;
    selectedCategory?: string;
    searchTerm?: string;
    onAddToOrder?: (product: Product) => void;
};

const API_BASE = "http://localhost:3001/api";

export default function ProductCard({
    refreshKey,
    selectedCategory = "ทั้งหมด",
    searchTerm = "",
    onAddToOrder,
}: ProductCardProps) {
    // State
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    
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
                fetch(`${API_BASE}/products`),
                fetch(`${API_BASE}/categories`),
            ]);

            if (!productsRes.ok) {
                throw new Error("โหลดข้อมูลสินค้าไม่สำเร็จ");
            }

            if (!categoriesRes.ok) {
                throw new Error("โหลดข้อมูลหมวดหมู่ไม่สำเร็จ");
            }

            const productsData = await productsRes.json();
            const categoriesData = await categoriesRes.json();

            // Set state
            setProducts(productsData || []);
            setCategories(categoriesData || []);
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
        ) as Record<number, string>;
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

    if (loading) {
        return (
            <div className="mt-10 text-center text-gray-400">
                กำลังโหลดข้อมูล...
            </div>
        );
    }

    if (filteredProducts.length === 0) {
        return (
            <div className="mt-4 py-10 px-4 text-xl text-center text-gray-400 bg-white rounded-lg shadow-sm">
                ไม่พบเมนู
            </div>
        );
    }

    return (
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
                <div
                    key={product.id}
                    className="w-full rounded-xl bg-white shadow-sm overflow-hidden flex flex-col h-full"
                >
                    {/* รูป */}
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-50 w-full object-cover"
                    />

                    <div className="flex1">
                        {/* ชื่อเมนู */}
                        <p className="ml-4 mt-4 line-clamp-2 font-bold">{product.name}</p>

                        {/* ประเภท */}
                        <p className="ml-4 mt-1 text-sm font-light text-gray-500">
                            {product.category_id ? categoryMap[product.category_id] || "-" : "-"}
                        </p>
                    </div>

                    <div className="mx-4 mb-4 mt-2 flex items-end justify-between">
                        {/* ราคา */}
                        <p className="text-2xl font-extrabold text-pink-400">
                            ฿{product.price}
                        </p>

                        {/* ปุ่มเพิ่มออเดอร์ */}
                        <button
                            type="button"
                            onClick={() => onAddToOrder?.(product)}
                            className="flex items-center rounded-full bg-green-500 p-2 text-white shadow-md hover:bg-green-600"
                        >
                            <AddIcon sx={{ fontSize: 22 }} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}