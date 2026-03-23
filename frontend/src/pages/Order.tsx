import OrderCard from "../components/Order/OrderCard";
import SearchBar from "../components/Order/SearchBar";
import Tabs from "../components/Order/Tabs";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

export default function Order() {
    return (
        <div className="flex h-full text-gray-800 relative">
            <div className="flex-1 p-6 pb-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="mr-4 p-2 items-center bg-pink-400 rounded-md text-white shadow-sm">
                        <DescriptionOutlinedIcon sx={{ fontSize: 30 }} />
                    </div>
                    <p className="text-3xl font-extrabold">ออเดอร์</p>
                </div>
                {/* Content */}
                <Tabs />

                <div className="mt-4 flex items-center">
                    <FormatListBulletedOutlinedIcon className="text-pink-400 mr-2" />
                    <p className="text-xl font-extrabold">รายการออเดอร์</p>
                </div>

                <SearchBar />

                <OrderCard />
            </div>
        </div>

    )
}