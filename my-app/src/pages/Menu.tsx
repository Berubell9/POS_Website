import { useState } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import ProductCard from "../components/Menu/ProductCard";
import CurrentOrder from "../components/CurrentOrderBar";
import Tabs from "../components/Menu/Tabs";
import SearchBar from "../components/Menu/SearchBar";

export default function Menu() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="flex h-full text-gray-800 relative">
            {/* ฝั่งเมนู */}
            <div className="flex-1 p-6 pb-6 overflow-y-auto">
                {/* Header */}
                <p className="text-3xl font-extrabold mb-5">เมนู</p>
                
                {/* ค้นหาเมนู */}
                <SearchBar />

                {/* แยกประเภทเมนู */}
                <Tabs />

                {/* การ์ดเมนู */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
                    <ProductCard/>
                </div>
            </div>

            {/* Current Order Bar */}
            <CurrentOrder
                isMobileOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

            {/* ปุ่มตะกร้าเปิด Current Order Bar สำหรับมือถือ */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="xl:hidden fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-pink-400 text-white shadow-md flex items-center justify-center hover:bg-pink-500 transition"
            >
                <ShoppingCartOutlinedIcon />
            </button>
        </div>
    );
}