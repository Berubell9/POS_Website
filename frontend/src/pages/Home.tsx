import StatusCard from "../components/Home/StatusCard"
import OrderCard from "../components/Home/OrderCard"
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

export default function Home() {
    return (
        <div className="flex h-full text-gray-800 relative">
            <div className="flex-1 p-4 pb-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="mr-4 p-2 items-center bg-pink-400 rounded-md text-white shadow-sm">
                        <StorefrontOutlinedIcon sx={{ fontSize: 30 }} />
                    </div>
                    <p className="text-3xl font-extrabold">หน้าแรก</p>
                </div>
                
                {/* Content */}
                <StatusCard />
                <OrderCard />
            </div>
        </div >
    )
}