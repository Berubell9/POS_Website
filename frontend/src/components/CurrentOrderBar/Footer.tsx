type FooterProps = {
    itemCount: number;
    subtotal: number;
    vat: number;
    total: number;
    submittingOrder?: boolean;
    onConfirmOrder: () => void;
};

const formatMoney = (value: number) => {
    return value.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export default function Footer({
    itemCount,
    subtotal,
    vat,
    total,
    submittingOrder = false,
    onConfirmOrder,
}: FooterProps) {
    return (
        <div className="pt-4 mt-4 border-t border-gray-200 shrink-0 space-y-2">
            {/* จำนวนรายการ */}
            <div className="flex items-center justify-between text-gray-500">
                <p>จำนวนรายการ</p>
                <p>{itemCount} <span>รายการ</span></p>
            </div>

            {/* ยอดรวม */}
            <div className="flex items-center justify-between text-gray-500">
                <p>ยอดรวม</p>
                <p>฿{formatMoney(subtotal)}</p>
            </div>

            {/* VAT 7% */}
            <div className="flex items-center justify-between text-gray-500">
                <p>VAT 7%</p>
                <p>฿{formatMoney(vat)}</p>
            </div>

            {/* รวมทั้งหมด + vat */}
            <div className="flex items-center justify-between text-lg font-extrabold text-gray-800">
                <p>รวมทั้งหมด</p>
                <p>฿{formatMoney(total)}</p>
            </div>

            {/* ปุ่มบันทึกออเดอร์ */}
            <button
                onClick={onConfirmOrder}
                disabled={submittingOrder}
                className="mt-2 w-full rounded-md bg-pink-400 py-3 font-semibold text-white shadow-md transition hover:bg-pink-500 disabled:opacity-60"
            >
                {submittingOrder ? "กำลังบันทึก..." : "ยืนยันออเดอร์"}
            </button>
        </div>
    )
}