import { useEffect, useState } from "react";

type Category = {
    id: number;
    name: string;
};

type Props = {
    value: string;
    onChange: (category: string) => void;
};

const API_BASE = "http://localhost:3001/api";

export default function Tabs({ value, onChange }: Props) {

    const [categories, setCategories] = useState<Category[]>([]);

    // แสดงข้อมูลเมื่อเปิดหน้าต่างที่มี Tab ขึ้นมา
    useEffect(() => {
        fetchCategories();
    }, []);

    // ดึงข้อมูล Categories
    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_BASE}/categories`);

            if (!res.ok) {
                throw new Error("โหลดหมวดหมู่ไม่สำเร็จ");
            }

            const data: Category[] = await res.json();
            setCategories(data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // ให้ id=0 เป็นทั้งหมด
    const tabs = [
        { id: 0, name: "ทั้งหมด" },
        ...categories
    ];

    return (
        <div className='mt-4 p-4 bg-white rounded-lg shadow-sm'>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.name)}
                        className={`px-4 py-2 rounded-md transition
                        ${value === tab.name
                                ? "bg-pink-400 text-white"
                                : "bg-pink-50 text-pink-400 border border-pink-300 hover:bg-pink-100"
                            }`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
        </div>
    );
}