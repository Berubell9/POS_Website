import { useState } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

import ProductCard from "../components/Menu/ProductCard";
import CurrentOrder from "../components/CurrentOrderBar";
import Tabs from "../components/Menu/Tabs";
import SearchBar from "../components/Menu/SearchBar";

export default function Menu() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <div className="flex h-full text-gray-800 relative">
            {/* ฝั่งเมนู */}
            <div className="flex-1 p-4 pb-16 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="mr-4 p-2 items-center bg-pink-400 rounded-md text-white shadow-sm">
                        <RestaurantOutlinedIcon sx={{ fontSize: 30 }} />
                    </div>
                    <p className="text-3xl font-extrabold">เมนู</p>
                </div>

                {/* Content */}
                <Tabs
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                />

                <div className="mt-4 flex items-center">
                    <FormatListBulletedOutlinedIcon className="text-pink-400 mr-2" />
                    <p className="text-xl font-extrabold">รายการเมนู</p>
                </div>

                <SearchBar
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <ProductCard
                    selectedCategory={selectedCategory}
                    searchTerm={searchTerm}
                />
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