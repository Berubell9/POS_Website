type TabsProps = {
    value: string;
    onChange: (value: string) => void;
    counts: Record<string, number>;
};

const tabs = ["ทั้งหมด", "รอดำเนินการ", "กำลังทำ", "เสร็จสิ้น", "พร้อมเสิร์ฟ", "ยกเลิก"];

export default function Tabs({ value, onChange, counts }: TabsProps) {
    return (
        <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:flex lg:flex-wrap">
                {tabs.map((tab) => {
                    const count = counts[tab] ?? 0;

                    return (
                        <button
                            key={tab}
                            onClick={() => onChange(tab)}
                            className={`flex items-center justify-between rounded-md px-4 py-2 transition
                                ${value === tab
                                    ? "bg-pink-400 text-white"
                                    : "border border-pink-300 bg-pink-50 text-pink-400 hover:bg-pink-100"
                                }`}
                        >
                            <span>{tab}</span>

                            <span className={`ml-2
                                ${value === tab
                                    ? "text-white"
                                    : "text-pink-400"
                                }`}
                            >
                                ({count})
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}