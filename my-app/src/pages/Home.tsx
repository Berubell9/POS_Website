import Card from "../components/Home/StatusCard"
import OrderCard from "../components/Home/OrderCard"

export default function Home() {
    return (
        <div className="h-full p-6 pb-6 text-gray-800">
            {/* Header */}
            <p className="text-3xl font-extrabold mb-5">หน้าแรก</p>

            {/* Content */}
            <Card/>
            <OrderCard/>
        </div>
    )
}