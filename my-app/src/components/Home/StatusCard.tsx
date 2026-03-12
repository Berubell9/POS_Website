import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Card() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* ยอดขายวันนี้ */}
            <div className="bg-white p-4 min-h-25 shadow-sm rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <MonetizationOnIcon className="text-green-500 text-2xl" />
                    <p className="text-gray-400 text-sm md:text-base">ยอดขายวันนี้</p>
                </div>
                <p className="font-extrabold text-xl md:text-2xl wrap-break-word"><span>฿</span>0</p>
            </div>

            {/* จำนวนออเดอร์วันนี้ */}
            <div className="bg-white p-4 min-h-25 shadow-sm rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <DescriptionIcon className="text-sky-500 text-2xl" />
                    <p className="text-gray-400 text-sm md:text-base">จำนวนออเดอร์วันนี้</p>
                </div>
                <p className="font-extrabold text-xl md:text-2xl wrap-break-word">0</p>
            </div>

            {/* รอดำเนินการ */}
            <div className="bg-white p-4 min-h-25 shadow-sm rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <WatchLaterIcon className="text-yellow-500 text-2xl" />
                    <p className="text-gray-400 text-sm md:text-base">รอดำเนินการ</p>
                </div>
                <p className="font-extrabold text-xl md:text-2xl wrap-break-word">0</p>
            </div>

            {/* เสร็จสิ้น */}
            <div className="bg-white p-4 min-h-25 shadow-sm rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                    <CheckCircleIcon className="text-green-500 text-2xl" />
                    <p className="text-gray-400 text-sm md:text-base">เสร็จสิ้น</p>
                </div>
                <p className="font-extrabold text-xl md:text-2xl wrap-break-word">0</p>
            </div>
        </div>
    )
}