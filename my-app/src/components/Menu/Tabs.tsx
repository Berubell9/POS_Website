import { useState } from "react";

export default function Tabs() {
    const [activeTab, setActiveTab] = useState("ทั้งหมด");

    const tabs = [
        "ทั้งหมด",
        "แป้งเครป",
        "ท็อปปิ้ง",
        "ซอส"
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-5">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 text-center rounded-md shadow-md transition
            ${activeTab === tab
                        ? "bg-pink-400 text-white"
                        : "bg-white text-pink-400 border border-pink-400 hover:bg-pink-50"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}