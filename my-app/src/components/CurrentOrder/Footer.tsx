export default function Footer() {
    return (
        <div className="pt-4 mt-5 border-t border-gray-200 shrink-0 space-y-2">
            {/* จำนวนรายการ */}
            <div className="flex items-center justify-between text-sm text-gray-500">
                <p>จำนวนรายการ</p>
                <p>2 <span>รายการ</span></p>
            </div>
            {/* ยอดรวม */}
            <div className="flex items-center justify-between text-sm text-gray-500">
                <p>ยอดรวม</p>
                <p><span>฿</span>110</p>
            </div>
            {/* VAT 7% */}
            <div className="flex items-center justify-between text-sm text-gray-500">
                <p>VAT 7%</p>
                <p><span>฿</span>7.7</p>
            </div>
            {/* รวมทั้งหมด + vat */}
            <div className="flex items-center justify-between text-lg font-extrabold text-gray-800">
                <p>รวมทั้งหมด</p>
                <p><span>฿</span>11</p>
            </div>
            {/* กดชำระเงินเเล้วจะบันทึกออเดอร์ */}
            <button className="w-full mt-2 rounded-md shadow-md bg-pink-400 py-3 text-white font-semibold hover:bg-pink-500 transition">
                ชำระเงิน
            </button>
        </div>
    )
}