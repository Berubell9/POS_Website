import { useMemo, useState, useEffect } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

import ProductCard from "../components/Menu/ProductCard";
import CurrentOrder from "../components/CurrentOrderBar/CurrentOrder";
import Tabs from "../components/Menu/Tabs";
import SearchBar from "../components/Menu/SearchBar";

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category_id: number | null;
};

type Order = {
    productId: number;
    name: string;
    price: number;
    image: string;
    qty: number;
};

const API_BASE = "http://localhost:3001/api";

export default function Menu() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
    const [searchTerm, setSearchTerm] = useState("");
    const [orderItems, setOrderItems] = useState<Order[]>([]);
    const [selectedTableId, setSelectedTableId] = useState("");
    const [submittingOrder, setSubmittingOrder] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // โหลดจาก localStorage ครั้งแรก
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("cart");
            const savedTableId = localStorage.getItem("selectedTableId");

            if (savedCart) {
                setOrderItems(JSON.parse(savedCart));
            }

            if (savedTableId) {
                setSelectedTableId(savedTableId);
            }
        } catch (error) {
            console.error("Failed to load localStorage:", error);
        } finally {
            setIsHydrated(true);
        }
    }, []);

    // บันทึก cart หลังจากโหลดเสร็จแล้วเท่านั้น
    useEffect(() => {
        if (!isHydrated) return;

        try {
            localStorage.setItem("cart", JSON.stringify(orderItems));
        } catch (error) {
            console.error("Failed to save cart:", error);
        }
    }, [orderItems, isHydrated]);

    // บันทึกโต๊ะที่เลือก หลังจากโหลดเสร็จแล้วเท่านั้น
    useEffect(() => {
        if (!isHydrated) return;

        try {
            localStorage.setItem("selectedTableId", selectedTableId);
        } catch (error) {
            console.error("Failed to save selectedTableId:", error);
        }
    }, [selectedTableId, isHydrated]);

    const addToOrder = (product: Product) => {
        setOrderItems((prev) => {
            const found = prev.find((item) => item.productId === product.id);

            if (found) {
                return prev.map((item) =>
                    item.productId === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            return [
                ...prev,
                {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    qty: 1,
                },
            ];
        });
    };

    const increaseQty = (productId: number) => {
        setOrderItems((prev) =>
            prev.map((item) =>
                item.productId === productId ? { ...item, qty: item.qty + 1 } : item
            )
        );
    };

    const decreaseQty = (productId: number) => {
        setOrderItems((prev) =>
            prev
                .map((item) =>
                    item.productId === productId ? { ...item, qty: item.qty - 1 } : item
                )
                .filter((item) => item.qty > 0)
        );
    };

    const removeItem = (productId: number) => {
        setOrderItems((prev) => prev.filter((item) => item.productId !== productId));
    };

    const clearAll = () => {
        setOrderItems([]);
    };

    const itemCount = useMemo(() => {
        return orderItems.reduce((sum, item) => sum + item.qty, 0);
    }, [orderItems]);

    const subtotal = useMemo(() => {
        return orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    }, [orderItems]);

    const vat = useMemo(() => {
        return subtotal * 0.07;
    }, [subtotal]);

    const total = useMemo(() => {
        return subtotal + vat;
    }, [subtotal, vat]);

    const confirmOrder = async () => {
        if (!selectedTableId) {
            alert("กรุณาเลือกโต๊ะ");
            return;
        }

        if (orderItems.length === 0) {
            alert("กรุณาเพิ่มเมนูก่อนยืนยันออเดอร์");
            return;
        }

        try {
            setSubmittingOrder(true);

            const payload = {
                table_id: Number(selectedTableId),
                subtotal,
                vat,
                total,
                items: orderItems.map((item) => ({
                    product_id: item.productId,
                    product_name_snapshot: item.name,
                    qty: item.qty,
                    unit_price: item.price,
                    line_total: item.price * item.qty,
                })),
            };

            console.log("confirmOrder payload:", payload);

            const res = await fetch(`${API_BASE}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            console.log("confirmOrder result:", result);

            if (!res.ok) {
                console.error("Create order error:", result);
                alert(result.message || "บันทึกออเดอร์ไม่สำเร็จ");
                return;
            }

            alert("บันทึกออเดอร์สำเร็จ");
            setOrderItems([]);
            setSelectedTableId("");
            setIsCartOpen(false);
            localStorage.removeItem("cart");
            localStorage.removeItem("selectedTableId");
        } catch (error) {
            console.error("Unexpected create order error:", error);
            alert("เกิดข้อผิดพลาด");
        } finally {
            setSubmittingOrder(false);
        }
    };

    return (
        <div className="relative flex h-full text-gray-800">
            {/* รายการเมนู */}
            <div className="flex-1 overflow-y-auto p-4 pb-16">
                <div className="flex items-center rounded-xl bg-white p-4 shadow-sm">
                    <div className="mr-4 rounded-md bg-pink-400 p-2 text-white shadow-sm">
                        <RestaurantOutlinedIcon sx={{ fontSize: 30 }} />
                    </div>
                    <p className="text-3xl font-extrabold">เมนู</p>
                </div>

                <Tabs value={selectedCategory} onChange={setSelectedCategory} />

                <div className="mt-4 flex items-center">
                    <FormatListBulletedOutlinedIcon className="mr-2 text-pink-400" />
                    <p className="text-xl font-extrabold">รายการเมนู</p>
                </div>

                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <ProductCard
                    selectedCategory={selectedCategory}
                    searchTerm={searchTerm}
                    onAddToOrder={addToOrder}
                />
            </div>

            {/* รายการออเดอร์ */}
            <CurrentOrder
                items={orderItems}
                selectedTableId={selectedTableId}
                onSelectTable={setSelectedTableId}
                itemCount={itemCount}
                subtotal={subtotal}
                vat={vat}
                total={total}
                submittingOrder={submittingOrder}
                onIncreaseQty={increaseQty}
                onDecreaseQty={decreaseQty}
                onRemoveItem={removeItem}
                onClearAll={clearAll}
                onConfirmOrder={confirmOrder}
                isMobileOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

            {/* ปุ่มตะกร้า เเสดงเมื่อเป็น Responsive ในมือถือ */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-pink-400 text-white shadow-md transition hover:bg-pink-500 xl:hidden"
            >
                <ShoppingCartOutlinedIcon />

                {itemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1 text-sm font-bold text-white">
                        {itemCount > 99 ? "99+" : itemCount}
                    </span>
                )}
            </button>
        </div>
    );
}