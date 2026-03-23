import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

export default function StatusCard() {
    return (
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* ยอดขายวันนี้ */}
            <div className="bg-white p-4 min-h-25 shadow-sm rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100">
                        <LocalAtmOutlinedIcon className="text-green-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-gray-400 text-sm md:text-base">ยอดขายวันนี้</p>
                </div>
                <p className="text-green-900 font-extrabold text-xl md:text-2xl wrap-break-word">฿0000000</p>
            </div>

            {/* จำนวนออเดอร์วันนี้ */}
            <div className="bg-white p-4 min-h-25 shadow-sm rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100">
                        <ShoppingBagOutlinedIcon className="text-sky-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-gray-400 text-sm md:text-base">จำนวนออเดอร์วันนี้</p>
                </div>
                <p className="text-sky-900 font-extrabold text-xl md:text-2xl wrap-break-word">000</p>
            </div>

            {/* รอดำเนินการ */}
            <div className="bg-white p-4 min-h-25 shadow-sm rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                        <AccessTimeOutlinedIcon className="text-yellow-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-gray-400 text-sm md:text-base">รอดำเนินการ</p>
                </div>
                <p className="text-yellow-900 font-extrabold text-xl md:text-2xl wrap-break-word">0</p>
            </div>

            {/* ออเดอร์เสร็จสิ้น */}
            <div className="bg-white p-4 min-h-25 shadow-sm rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                        <CheckCircleOutlineOutlinedIcon className="text-indigo-600" sx={{ fontSize: 20 }} />
                    </div>
                    <p className="text-gray-400 text-sm md:text-base">ออเดอร์เสร็จสิ้น</p>
                </div>
                <p className="text-indigo-900 font-extrabold text-xl md:text-2xl wrap-break-word">0</p>
            </div>
        </div>
    )
}