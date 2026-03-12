import AddIcon from '@mui/icons-material/Add';

export default function ProductCard() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5'>
            <div className="bg-white w-full rounded-xl shadow-sm">
                {/* รูป */}
                <img src="test.jpg" className='w-full h-50 rounded-t-xl object-cover' />
                {/* ชื่อเมนู */}
                <p className='ml-4 mt-4 font-bold wrap-break-word'>ชื่อเมนู</p>
                {/* ประเภท */}
                <p className='mt-1 ml-4 font-thin text-gray-500 text-sm wrap-break-word'>ประเภท</p>
                <div className='mt-2 ml-4 mb-4 flex items-end justify-between'>
                    {/* ราคา */}
                    <p className='font-extrabold text-2xl text-pink-400 wrap-break-word'><span>฿</span>0</p>
                    {/* ปุ่มเพิ่มออเดอร์เข้า Current Order */}
                    <button type="button" className="flex mr-4 text-center justify-center text-white bg-green-500 hover:bg-green-600 shadow-md rounded-full text-sm p-2">
                        <AddIcon sx={{ fontSize: 20 }} />
                    </button>
                </div>
            </div>
        </div>
    );
}
