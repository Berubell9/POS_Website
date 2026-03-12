import { useMemo, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditMenuButton from "./EditMenuButton";

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
};

export default function ProductItem() {
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: "เเป้งเครปรสวานิลา",
            price: 45,
            category: "แป้งเครป",
            image: "/crepe.png",
        },
        {
            id: 2,
            name: "ฝอยทอง",
            price: 55,
            category: "ท็อปปิ้ง",
            image: "/crepe.png",
        },
        {
            id: 3,
            name: "ซอสช็อกโกแลต",
            price: 15,
            category: "ซอส",
            image: "/crepe.png",
        },
        {
            id: 4,
            name: "กล้วย",
            price: 10,
            category: "ท็อปปิ้ง",
            image: "/crepe.png",
        },
        {
            id: 5,
            name: "วิปครีม",
            price: 20,
            category: "ท็อปปิ้ง",
            image: "/crepe.png",
        },
        {
            id: 6,
            name: "เเป้งเครปรสช็อกโกแลต",
            price: 50,
            category: "แป้งเครป",
            image: "/crepe.png",
        },
        {
            id: 7,
            name: "ซอสสตรอว์เบอร์รี",
            price: 15,
            category: "ซอส",
            image: "/crepe.png",
        },
        {
            id: 8,
            name: "โอรีโอ",
            price: 25,
            category: "ท็อปปิ้ง",
            image: "/crepe.png",
        },
    ]);

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const currentProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return products.slice(startIndex, endIndex);
    }, [products, currentPage]);

    return (
        <div className="mt-5 bg-white rounded-md shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                {/* ตารางเเสดงเมนู */}
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="text-left px-4 py-3">ลำดับ</th>
                            <th className="text-left px-4 py-3">รูปภาพ</th>
                            <th className="text-left px-4 py-3">ชื่อเมนู</th>
                            <th className="text-left px-4 py-3">หมวดหมู่</th>
                            <th className="text-left px-4 py-3">ราคา</th>
                            <th className="text-center px-4 py-3">จัดการ</th>
                        </tr>
                    </thead>

                    {/* เมนูในตารางเเต่ละรายการ */}
                    <tbody>
                        {currentProducts.map((product, index) => (
                            <tr key={product.id} className="border-t border-gray-100">
                                <td className="px-4 py-3">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </td>

                                <td className="px-4 py-3">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-14 h-14 rounded-md object-cover"
                                    />
                                </td>

                                <td className="px-4 py-3 font-semibold">{product.name}</td>
                                <td className="px-4 py-3">{product.category}</td>
                                <td className="px-4 py-3">฿{product.price}</td>

                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <EditMenuButton />
                                        <button className="flex items-center px-3 py-2 rounded-md bg-red-500 text-white shadow-sm hover:bg-red-600 transition">
                                            <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
                                            <p className="ml-1 hidden sm:inline">ลบ</p>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {/* ถ้าไม่มีเมนูให้เเสดง "ไม่มีข้อมูลเมนู" */}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-400">
                                    ไม่มีข้อมูลเมนู
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* pagination โดยกำหนดว่า 1 หน้าแสดง 5 รายการ แล้วค่อย render ปุ่มเลขหน้า */}
            {products.length > itemsPerPage && (
                <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm rounded-md border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        ก่อนหน้า
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, index) => {
                            const page = index + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-9 h-9 rounded-md text-sm font-medium transition ${currentPage === page
                                            ? "bg-pink-400 text-white"
                                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm rounded-md border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        ถัดไป
                    </button>
                </div>
            )}
        </div>
    );
}