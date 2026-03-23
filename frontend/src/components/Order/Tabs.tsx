type TabsProps = {
    value: string;
    onChange: (value: string) => void;
};

const tabs = ["ทั้งหมด", "รอดำเนินการ", "กำลังทำ", "เสร็จแล้ว", "ยกเลิก"];

export default function Tabs({ value, onChange }: TabsProps) {
    return (
        <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onChange(tab)}
                        className={`rounded-md px-4 py-2 text-sm font-medium transition ${value === tab
                                ? "bg-pink-400 text-white"
                                : "border border-pink-200 bg-pink-50 text-pink-400 hover:bg-pink-100"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}