import { useState } from "react";

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("ทั้งหมด");

    const tabs = [
        { label: "ทั้งหมด" },
        { label: "รอดำเนินการ" },
        { label: "กำลังทำ", },
        { label: "พร้อมเสิร์ฟ", },
        { label: "เสร็จสิ้น", },
        { label: "ยกเลิก",}
    ];

    return (
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
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
                    {tab.label}
                </button>
            ))}
        </div>
    );
}