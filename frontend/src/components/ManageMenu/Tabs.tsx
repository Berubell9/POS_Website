import { useEffect, useMemo, useState } from "react";

type Product = {
    id: number;
    category_id: number | null;
};

type Category = {
    id: number;
    name: string;
};

type Props = {
    value: string;
    onChange: (category: string) => void;
    refreshKey?: number;
};

type TabItem = {
    id: number;
    name: string;
};

const API_BASE = "http://localhost:3001/api";

export default function Tabs({ 
    value, 
    onChange, 
    refreshKey }: Props) {
        
    // State
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    // แสดงข้อมูลเมื่อเปิดหน้าต่างที่มี Tab ขึ้นมา
    useEffect(() => {
        fetchData();
    }, [refreshKey]);
    
    // ดึงข้อมูล
    const fetchData = async () => {
        try {
            const [categoryRes, productRes] = await Promise.all([
                fetch(`${API_BASE}/categories`),
                fetch(`${API_BASE}/products`),
            ]);

            if (!categoryRes.ok) {
                throw new Error("โหลดหมวดหมู่ไม่สำเร็จ");
            }

            if (!productRes.ok) {
                throw new Error("โหลดสินค้าไม่สำเร็จ");
            }

            const categoryData: Category[] = await categoryRes.json();
            const productData: Product[] = await productRes.json();

            setCategories(categoryData || []);
            setProducts(productData || []);
        } catch (error) {
            console.error("Error fetching tabs data:", error);
        }
    };
    
    // ให้ id=0 เป็นทั้งหมด
    const tabs: TabItem[] = useMemo(
        () => [{ id: 0, name: "ทั้งหมด" }, ...categories],
        [categories]
    );
    
    // นับจำนวนเมนูในหมวดหมู่นั้น
    const countMap = useMemo(() => {
        return products.reduce<Record<number, number>>((acc, product) => {
            if (product.category_id != null) {
                acc[product.category_id] = (acc[product.category_id] || 0) + 1;
            }
            return acc;
        }, {});
    }, [products]);

    return (
        <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
            <div className="gap-2 grid-cols-2 grid lg:flex lg:flex-wrap md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {tabs.map((tab) => {
                    const count = tab.id === 0 ? products.length : countMap[tab.id] || 0;
                    const isActive = value === tab.name;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onChange(tab.name)}
                            className={`flex items-center justify-between rounded-md px-3 py-2 transition 
                                ${isActive
                                    ? "bg-pink-400 text-white"
                                    : "border border-pink-300 bg-pink-50 text-pink-400 hover:bg-pink-100"
                                }`}
                        >
                            <span className="truncate">{tab.name}</span>

                            <span
                                className={`ml-2 ${isActive
                                        ? "text-white"
                                        : "text-pink-400"
                                    }`}
                            >
                                ({count})
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}