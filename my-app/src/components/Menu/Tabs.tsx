import { useState } from "react";
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import IcecreamOutlinedIcon from '@mui/icons-material/IcecreamOutlined';
import BreakfastDiningOutlinedIcon from '@mui/icons-material/BreakfastDiningOutlined';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("ทั้งหมด");

    const tabs = [
        { label: "ทั้งหมด", icon: <AppsOutlinedIcon sx={{ fontSize: 18 }} /> },
        { label: "แป้งเครป", icon: <CakeOutlinedIcon  sx={{ fontSize: 18 }} /> },
        { label: "ท็อปปิ้ง", icon: <AddCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} /> },
        { label: "ไอศกรีม", icon: <IcecreamOutlinedIcon sx={{ fontSize: 18 }} /> },
        { label: "ซอส", icon: <BreakfastDiningOutlinedIcon sx={{ fontSize: 18 }} /> },
        { label: "เครื่องดื่ม", icon: <LocalCafeOutlinedIcon sx={{ fontSize: 18 }} /> }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-5">
            {/* เลือกหมวดหมู่ */}
            {tabs.map((tab) => (
                <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={`flex items-center justify-center gap-1 py-2 rounded-3xl shadow-sm transition
            ${activeTab === tab.label
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-50"
                        }`}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </div>
    );
}