import OrderCard from "../components/Order/OrderCard";
import SearchBar from "../components/Order/SearchBar";
import Tabs from "../components/Order/Tabs";


export default function Order() {
    return (
        <div className="flex h-full text-gray-800 relative">
            <div className="flex-1 p-6 pb-6 overflow-y-auto">
                {/* Header */}
                <p className="text-3xl font-extrabold mb-5">ออเดอร์</p>

                {/* Content */}
                <SearchBar />
                <Tabs />
                <OrderCard />
            </div>
        </div>

    )
}