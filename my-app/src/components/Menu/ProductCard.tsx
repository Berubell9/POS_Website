import { useEffect, useMemo, useState } from "react";
import supabase from "../../utils/supabase";
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

export default function ProductCard({
    refreshKey,
    selectedCategory = "ทั้งหมด",
    searchTerm = "",
    onAddToOrder,

}: ProductCardProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchData();
    }, [refreshKey]);

    const fetchData = async () => {
        try {
            setLoading(true);

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

            if (productsRes.error) {
                console.error("Error fetching products:", productsRes.error);
                return;
            }

            if (categoriesRes.error) {
                console.error("Error fetching categories:", categoriesRes.error);
                return;
            }

            setProducts((productsRes.data as Product[]) || []);
            setCategories((categoriesRes.data as Category[]) || []);
        } catch (error) {
            console.error("Unexpected fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const categoryMap = useMemo(() => {
        return Object.fromEntries(
            categories.map((category) => [category.id, category.name])
        ) as Record<number, string>;
    }, [categories]);

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