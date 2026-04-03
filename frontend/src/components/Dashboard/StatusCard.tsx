import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";

type Summary = {
    monthlySales: number;
    monthlyOrderCount: number;
    totalSales: number;
    totalOrderCount: number;
};

type StatusCardProps = {
    summary: Summary;
};

const formatMoney = (value: number) =>
    Number(value || 0).toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

export default function StatusCard({ summary }: StatusCardProps) {
    return (
        <div className="mt-4 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {/* ยอดขายเดือนนี้ */}
            <div className="min-h-25 rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100">
                        <LocalAtmOutlinedIcon className="text-green-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-sm text-gray-400 md:text-base">ยอดขายเดือนนี้</p>
                </div>
                <p className="text-xl font-extrabold text-green-900 md:text-2xl warp-break-words">
                    ฿{formatMoney(summary.monthlySales)}
                </p>
            </div>

            {/* จำนวนออเดอร์เดือนนี้ */}
            <div className="min-h-25 rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100">
                        <ShoppingBagOutlinedIcon className="text-sky-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-sm text-gray-400 md:text-base">จำนวนออเดอร์เดือนนี้</p>
                </div>
                <p className="text-xl font-extrabold text-sky-900 md:text-2xl warp-break-words">
                    {summary.monthlyOrderCount}
                </p>
            </div>

            {/* ยอดขายทั้งหมด */}
            <div className="min-h-25 rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                        <SavingsOutlinedIcon className="text-yellow-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-sm text-gray-400 md:text-base">ยอดขายทั้งหมด</p>
                </div>
                <p className="text-xl font-extrabold text-yellow-900 md:text-2xl warp-break-words">
                    ฿{formatMoney(summary.totalSales)}
                </p>
            </div>

            {/* จำนวนออเดอร์ทั้งหมด */}
            <div className="min-h-25 rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                        <ShoppingBasketOutlinedIcon className="text-indigo-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-sm text-gray-400 md:text-base">จำนวนออเดอร์ทั้งหมด</p>
                </div>
                <p className="text-xl font-extrabold text-indigo-900 md:text-2xl warp-break-words">
                    {summary.totalOrderCount}
                </p>
            </div>
        </div>
    );
}