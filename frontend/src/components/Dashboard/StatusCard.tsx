import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

export default function StatusCard() {
    return (
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* ยอดขายเดือนนี้ */}
            <div className="bg-white p-4 min-h-25 shadow-sm rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100">
                        <LocalAtmOutlinedIcon className="text-green-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-gray-400 text-sm md:text-base">ยอดขายเดือนนี้</p>
                </div>
                <p className="text-green-900 font-extrabold text-xl md:text-2xl wrap-break-word">฿0000000</p>
            </div>

            {/* จำนวนออเดอร์เดือนนี้ */}
            <div className="bg-white p-4 min-h-25 shadow-sm rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100">
                        <ShoppingBagOutlinedIcon className="text-sky-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-gray-400 text-sm md:text-base">จำนวนออเดอร์เดือนนี้</p>
                </div>
                <p className="text-sky-900 font-extrabold text-xl md:text-2xl wrap-break-word">000</p>
            </div>

            {/* ยอดขายทั้งหมด */}
            <div className="bg-white p-4 min-h-25 shadow-sm rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                        <SavingsOutlinedIcon className="text-yellow-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-gray-400 text-sm md:text-base">ยอดขายทั้งหมด</p>
                </div>
                <p className="text-yellow-900 font-extrabold text-xl md:text-2xl wrap-break-word">฿0</p>
            </div>

            {/* จำนวนออเดอร์ทั้งหมด */}
            <div className="bg-white p-4 min-h-25 shadow-sm rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                        <ShoppingBasketOutlinedIcon className="text-indigo-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-gray-400 text-sm md:text-base">จำนวนออเดอร์ทั้งหมด</p>
                </div>
                <p className="text-indigo-900 font-extrabold text-xl md:text-2xl wrap-break-word">0</p>
            </div>
        </div>
    )
}