import DeleteIcon from '@mui/icons-material/Delete';
export default function OrderItem() {
    return (
        <div className="flex p-2 bg-gray-100 rounded-md items-center justify-between">
            {/* ซ้าย */}
            <div className="flex items-center gap-3">
                <img src="test.jpg" className="w-16 h-16 object-cover rounded-md" />
                <div className="space-y-2">
                    {/* ชื่อเมนู */}
                    <p className="font-bold">ชื่อเมนู</p>
                    {/* หมวดหมู่เมนู */}
                    <p className="font-thin text-xs">หมวดหมู่เมนู</p>
                    <div className="flex items-center gap-3">
                        {/* ปุ่มลบจำนวน */}
                        <button className="w-6 h-6 text-sm bg-white text-gray-500 rounded-full border border-gray-300 flex items-center justify-center">-</button>
                        {/* จำนวน */}
                        <p className="text-sm">1</p>
                        {/* ปุ่มเพิ่มจำนวน */}
                        <button className="w-6 h-6 text-sm bg-white text-gray-500 rounded-full border border-gray-300 flex items-center justify-center">+</button>
                    </div>
                </div>
            </div>

            {/* ขวา */}
            <div className="flex flex-col items-end gap-8">
                {/* ปุ่มลบรายการ */}
                <button className="h-6 w-6 text-red-500 text-xl"><DeleteIcon sx={{ fontSize: 20 }}/></button>
                {/* ราคา */}
                <p className="text-pink-400 font-bold"><span>฿</span>55</p>
            </div>
        </div>
    );
}