import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Card from "../components/Menu/Card";
import CurrentOrder from "../components/CurrentOrderBar";
import Tabs from "../components/Menu/Tabs";
import SearchBar from "../components/Menu/SearchBar";

export default function Menu() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="flex h-full text-gray-800 relative">
            {/* ฝั่งเมนู */}
            <div className="flex-1 p-6 pb-6 overflow-y-auto">
                <p className="text-3xl font-extrabold mb-5">เมนู</p>
                <SearchBar />
                <Tabs />
                <Card />
            </div>

            {/* Current Order */}
            <CurrentOrder
                isMobileOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />

            {/* ปุ่มตะกร้าลอยเปิด Current Order สำหรับมือถือ */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="xl:hidden fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-pink-400 text-white shadow-md flex items-center justify-center hover:bg-pink-500 transition"
            >
                <ShoppingCartIcon />
            </button>
        </div>
    );
}