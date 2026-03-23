import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';

export default function OrderCard() {
    return (
        <div className=" mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col h-full">
                {/* วันที่ เวลา */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                    <p>วันที่ : 11/03/2569</p>
                    <p>เวลา : 11:00</p>
                </div>

                {/* คิว + สถานะ */}
                <div className="flex items-start justify-between gap-3 mt-2">
                    <p className="font-extrabold text-xl text-gray-800 wrap-break-words">
                        คิวที่ #A001
                    </p>

                    <div className="shrink-0 flex items-center gap-1 text-sm text-yellow-800 px-2 py-1 bg-yellow-100 rounded-full whitespace-nowrap">
                        <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />
                        <p>รอดำเนินการ</p>
                    </div>
                </div>

                {/* หมายเลขโต๊ะ เเละหมายเลขออเดอร์ */}
                <div className="mt-2 text-sm text-gray-400 space-y-2">
                    <p>เลขออเดอร์ : </p>
                    <p>โต๊ะ : </p>
                </div>

                {/* รายการทั้งหมด */}
                <div className="mt-4 space-y-2 max-h-48 overflow-y-auto pr-1">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 min-w-0">
                            <p className="truncate text-sm text-gray-800">
                                ชื่อเมนู bbbbbbbbbbbbbbbbbbbbb
                            </p>
                            <p className="text-xs text-pink-800 px-2 py-1 bg-pink-100 rounded-full whitespace-nowrap">
                                x2
                            </p>
                        </div>

                        <p className="ml-2 text-sm font-semibold text-gray-800 whitespace-nowrap">
                            ฿5000
                        </p>
                    </div>
                    {/* ตัวอย่าง */}
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 min-w-0">
                            <p className="truncate text-sm text-gray-800">ชื่อเมนู b</p>
                            <p className="text-xs text-pink-800 px-2 py-1 bg-pink-100 rounded-full whitespace-nowrap">
                                x2
                            </p>
                        </div>

                        <p className="ml-2 text-sm font-semibold text-gray-800 whitespace-nowrap">
                            ฿50
                        </p>
                    </div>
                </div>

                {/* สรุปยอด */}
                <div className="space-y-2 py-3 mt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <p>VAT 7%</p>
                        <p>฿20</p>
                    </div>

                    <div className="flex items-center justify-between font-bold text-lg">
                        <p className="text-gray-800">รวมทั้งหมด</p>
                        <p className="text-pink-400">฿200</p>
                    </div>
                </div>

                {/* ปุ่ม */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                    <button
                        type="button"
                        className="w-full py-2 items-center rounded-lg border border-sky-300 bg-sky-50 text-sky-400 text-sm font-medium shadow-sm hover:bg-sky-100 transition"
                    >
                        <LocalPrintshopOutlinedIcon sx={{ fontSize: 18 }} className="mr-1"/>
                        พิมพ์ใบเสร็จ
                    </button>

                    <button
                        type="button"
                        className="w-full py-2 items-center rounded-lg border border-pink-300 bg-pink-50 text-pink-400 text-sm font-medium shadow-sm hover:bg-pink-100 transition"
                    >
                        ขั้นตอนถัดไป
                    </button>

                    <button
                        type="button"
                        className="w-full py-2 rounded-lg bg-red-500 text-white text-sm font-medium shadow-sm hover:bg-red-600 transition"
                    >
                        ยกเลิกออเดอร์
                    </button>
                </div>
            </div>
        </div>
    );
}