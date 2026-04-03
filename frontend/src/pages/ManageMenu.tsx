import { useState } from "react";
import ProductItemTable from "../components/ManageMenu/ProductItemTable";
import Tabs from "../components/ManageMenu/Tabs";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

export default function ManageMenu() {
    const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <div className="flex h-full text-gray-800 relative">
            <div className="flex-1 p-4 pb-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="mr-4 p-2 items-center bg-pink-400 rounded-md text-white shadow-sm">
                        <MenuBookOutlinedIcon sx={{ fontSize: 30 }} />
                    </div>
                    <p className="text-3xl font-extrabold">จัดการเมนู</p>
                </div>

                {/* หมวดหมู่ */}
                <Tabs
                    refreshKey={refreshKey}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                />

                {/* ตารางเมนู */}
                <ProductItemTable
                    refreshKey={refreshKey}
                    selectedCategory={selectedCategory}
                    onAdded={() => setRefreshKey((prev) => prev + 1)}
                />
            </div>
        </div>
    );
}