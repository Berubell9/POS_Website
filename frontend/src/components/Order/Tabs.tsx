import { useState } from "react";

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("ทั้งหมด");

    const tabs = [
        { label: "ทั้งหมด" },
        { label: "รอดำเนินการ" },
        { label: "กำลังทำ", },
        { label: "พร้อมเสิร์ฟ", },
        { label: "เสร็จสิ้น", },
        { label: "ยกเลิก", }
    ];

    return (
        <div className='mt-4 p-4 bg-white rounded-lg shadow-sm'>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">            {tabs.map((tab) => (
                <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={`px-4 py-2 rounded-md transition
                    ${activeTab === tab.label
                            ? "bg-pink-400 text-white"
                            : "bg-pink-50 text-pink-400 border border-pink-300 hover:bg-pink-100"
                        }`}
                >
                    {tab.label}
                </button>
            ))}
            </div>
        </div>
    );
}