import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";

type OrderItem = {
    id: number;
    product_id: number;
    product_name: string;
    unit_price: number;
    quantity: number;
    total: number;
};

type OrderCardProps = {
    queueNumber: string;
    orderNumber: string;
    tableNumber: string;
    status: string;
    dateText: string;
    timeText: string;
    vat: number;
    total: number;
    items: OrderItem[];
    onPrint?: () => void;
    onNextStep?: () => void;
    onCancel?: () => void;
};

const formatMoney = (value: number) =>
    Number(value || 0).toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

export default function OrderCard({
    queueNumber,
    orderNumber,
    tableNumber,
    status,
    dateText,
    timeText,
    vat,
    total,
    items,
    onPrint,
    onNextStep,
    onCancel,
}: OrderCardProps) {
    const statusClassName =
        status === "รอดำเนินการ"
            ? "bg-yellow-100 text-yellow-800"
            : status === "กำลังทำ"
                ? "bg-sky-100 text-sky-700"
                : status === "พร้อมเสิร์ฟ"
                    ? "bg-green-100 text-green-700"
                    : status === "เสร็จสิ้น"
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-red-100 text-red-600";

    const getNextStatus = (status: string) => {
        if (status === "รอดำเนินการ") return "กำลังทำ";
        if (status === "กำลังทำ") return "พร้อมเสิร์ฟ";
        if (status === "พร้อมเสิร์ฟ") return "เสร็จสิ้น";
        return null;
    };

    const getNextLabel = (status: string) => {
        if (status === "พร้อมเสิร์ฟ") return "เสร็จสิ้น";
        if (status === "เสร็จสิ้น") return "-";
        return "ขั้นตอนถัดไป";
    };

    return (
        <div className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-sm">
            {/* วันที่ เวลา */}
            <div className="flex items-center justify-between text-sm text-gray-400">
                <p>วันที่ : {dateText}</p>
                <p>เวลา : {timeText}</p>
            </div>

            {/* คิว + สถานะ */}
            <div className="mt-2 flex items-start justify-between gap-3">
                <p className="warp-break-words text-xl font-extrabold text-gray-800">
                    คิวที่ {queueNumber}
                </p>

                <div
                    className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-sm whitespace-nowrap ${statusClassName}`}
                >
                    <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />
                    <p>{status}</p>
                </div>
            </div>

            {/* หมายเลขโต๊ะ และหมายเลขออเดอร์ */}
            <div className="mt-2 space-y-2 text-sm text-gray-400">
                <p>เลขออเดอร์ : {orderNumber}</p>
                <p>โต๊ะ : {tableNumber}</p>
            </div>

            {/* รายการทั้งหมด */}
            <div className="mt-4 max-h-48 space-y-2 overflow-y-auto pr-1">
                {items.length === 0 ? (
                    <div className="py-6 text-center text-sm text-gray-400">
                        ไม่มีรายการเมนู
                    </div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="flex w-full items-center justify-between"
                        >
                            <div className="flex min-w-0 items-center gap-2">
                                <p className="truncate text-sm text-gray-800">
                                    {item.product_name}
                                </p>
                                <p className="rounded-full bg-pink-100 px-2 py-1 text-xs text-pink-800 whitespace-nowrap">
                                    x{item.quantity}
                                </p>
                            </div>

                            <p className="ml-2 text-sm font-semibold text-gray-800 whitespace-nowrap">
                                ฿{formatMoney(item.total)}
                            </p>
                        </div>
                    ))
                )}
            </div>

            
            <div className="mt-auto">
                {/* สรุปยอด */}
                <div className="mt-4 space-y-2 border-t border-gray-200 py-3">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <p>VAT 7%</p>
                        <p>฿{formatMoney(vat)}</p>
                    </div>

                    <div className="flex items-center justify-between text-lg font-bold">
                        <p className="text-gray-800">รวมทั้งหมด</p>
                        <p className="text-pink-400">฿{formatMoney(total)}</p>
                    </div>
                </div>

                {/* ปุ่ม */}
                <div className="mt-2 flex flex-col gap-2 xl:flex-row">
                    <button
                        type="button"
                        onClick={onPrint}
                        className="flex w-full items-center justify-center rounded-lg border border-sky-300 bg-sky-50 py-2 text-sm font-medium text-sky-400 shadow-sm transition hover:bg-sky-100"
                    >
                        <LocalPrintshopOutlinedIcon sx={{ fontSize: 18 }} className="mr-1" />
                        พิมพ์ใบเสร็จ
                    </button>

                    {getNextStatus(status) && (
                        <button
                            type="button"
                            onClick={onNextStep}
                            className="flex col-span-full w-full items-center justify-center rounded-lg border border-pink-300 bg-pink-50 py-2 text-sm font-medium text-pink-400 shadow-sm transition hover:bg-pink-100"
                        >
                            {getNextLabel(status)}
                        </button>
                    )}

                    {status !== "ยกเลิก" && status !== "เสร็จสิ้น" && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full rounded-lg bg-red-500 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-600"
                        >
                            ยกเลิกออเดอร์
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}