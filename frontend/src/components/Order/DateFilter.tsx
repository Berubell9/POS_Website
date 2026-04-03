type DateFilterProps = {
    date: string;
    preset: string;
    onDateChange: (value: string) => void;
    onPresetChange: (value: string) => void;
};

export default function DateFilter({
    date,
    preset,
    onDateChange,
    onPresetChange,
}: DateFilterProps) {
    return (
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">

            {/* เลือกวันที่เอง */}
            <input
                type="date"
                value={date}
                onChange={(e) => {
                    onDateChange(e.target.value);
                    onPresetChange(""); // reset preset ถ้าเลือกวันเอง
                }}
                className="h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-gray-500 outline-none transition"
            />

            {/* เลือกแบบ preset */}
            <select
                value={preset}
                onChange={(e) => {
                    onPresetChange(e.target.value);
                    onDateChange(""); // reset date ถ้าเลือก preset
                }}
                className="h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-gray-500 outline-none transition"
            >
                <option value="">ทุกวัน</option>
                <option value="today">วันนี้</option>
                <option value="yesterday">เมื่อวาน</option>
                <option value="7days">7 วันที่ผ่านมา</option>
                <option value="30days">30 วันที่ผ่านมา</option>
            </select>
        </div>
    );
}