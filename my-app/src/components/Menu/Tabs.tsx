export default function Tabs() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mt-5">

            <div className="py-2 text-center rounded-md shadow-md bg-pink-400 text-white">
                ทั้งหมด
            </div>

            <div className="py-2 text-center text-pink-400 rounded-md shadow-md border border-pink-400 bg-white">
                แป้งเครป
            </div>

            <div className="py-2 text-center text-pink-400 rounded-md shadow-md border border-pink-400 bg-white">
                ท็อปปิ้ง
            </div>

            <div className="py-2 text-center text-pink-400 rounded-md shadow-md border border-pink-400 bg-white">
                ซอส
            </div>

        </div>
    )
}