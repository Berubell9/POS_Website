import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Card() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {/* การ์ดเมนู */}
            <div className="bg-white w-full rounded-xl shadow-sm">
                {/* รูป */}
                <img src="test.jpg" className='w-full h-50 rounded-t-xl object-cover'/>
                {/* ชื่อเมนู */}
                <p className='ml-4 mt-4 font-bold'>ชื่อเมนู</p>
                {/* ประเภท */}
                <p className='ml-4 font-thin text-gray-500 text-sm'>ประเภท</p>
                <div className='mt-2 ml-4 mb-4 flex items-end justify-between'>
                    {/* ราคา */}
                    <p className='font-extrabold text-2xl text-pink-400'><span>฿</span>0</p>
                    {/* ปุ่มเพิ่มออเดอร์เข้า Current Order */}
                    <button type="button" className="mr-4 text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 shadow-sm font-medium rounded-4xl text-sm px-2 py-2 focus:outline-none">
                        <AddCircleIcon sx={{ fontSize: 20 }}/>
                    </button>
                </div>
            </div>

            {/* ตัวอย่าง */}
            <div className="bg-white w-full rounded-xl shadow-sm">
                {/* รูป */}
                <img src="test.jpg" className='w-full h-50 rounded-t-xl object-cover'/>
                {/* ชื่อเมนู */}
                <p className='ml-4 mt-4 font-bold'>ชื่อเมนู</p>
                {/* ประเภท */}
                <p className='ml-4 font-thin text-gray-500 text-sm'>ประเภท</p>
                <div className='mt-2 ml-4 mb-4 flex items-end justify-between'>
                    {/* ราคา */}
                    <p className='font-extrabold text-2xl text-pink-400'><span>฿</span>0</p>
                    {/* ปุ่มเพิ่มออเดอร์เข้า Current Order */}
                    <button type="button" className="mr-4 text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 shadow-sm font-medium rounded-4xl text-sm px-2 py-2 focus:outline-none">
                        <AddCircleIcon sx={{ fontSize: 20 }}/>
                    </button>
                </div>
            </div>
            <div className="bg-white w-full rounded-xl shadow-sm">
                {/* รูป */}
                <img src="test.jpg" className='w-full h-50 rounded-t-xl object-cover'/>
                {/* ชื่อเมนู */}
                <p className='ml-4 mt-4 font-bold'>ชื่อเมนู</p>
                {/* ประเภท */}
                <p className='ml-4 font-thin text-gray-500 text-sm'>ประเภท</p>
                <div className='mt-2 ml-4 mb-4 flex items-end justify-between'>
                    {/* ราคา */}
                    <p className='font-extrabold text-2xl text-pink-400'><span>฿</span>0</p>
                    {/* ปุ่มเพิ่มออเดอร์เข้า Current Order */}
                    <button type="button" className="mr-4 text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 shadow-sm font-medium rounded-4xl text-sm px-2 py-2 focus:outline-none">
                        <AddCircleIcon sx={{ fontSize: 20 }}/>
                    </button>
                </div>
            </div>
            <div className="bg-white w-full rounded-xl shadow-sm">
                {/* รูป */}
                <img src="test.jpg" className='w-full h-50 rounded-t-xl object-cover'/>
                {/* ชื่อเมนู */}
                <p className='ml-4 mt-4 font-bold'>ชื่อเมนู</p>
                {/* ประเภท */}
                <p className='ml-4 font-thin text-gray-500 text-sm'>ประเภท</p>
                <div className='mt-2 ml-4 mb-4 flex items-end justify-between'>
                    {/* ราคา */}
                    <p className='font-extrabold text-2xl text-pink-400'><span>฿</span>0</p>
                    {/* ปุ่มเพิ่มออเดอร์เข้า Current Order */}
                    <button type="button" className="mr-4 text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 shadow-sm font-medium rounded-4xl text-sm px-2 py-2 focus:outline-none">
                        <AddCircleIcon sx={{ fontSize: 20 }}/>
                    </button>
                </div>
            </div>
            <div className="bg-white w-full rounded-xl shadow-sm">
                {/* รูป */}
                <img src="test.jpg" className='w-full h-50 rounded-t-xl object-cover'/>
                {/* ชื่อเมนู */}
                <p className='ml-4 mt-4 font-bold'>ชื่อเมนู</p>
                {/* ประเภท */}
                <p className='ml-4 font-thin text-gray-500 text-sm'>ประเภท</p>
                <div className='mt-2 ml-4 mb-4 flex items-end justify-between'>
                    {/* ราคา */}
                    <p className='font-extrabold text-2xl text-pink-400'><span>฿</span>0</p>
                    {/* ปุ่มเพิ่มออเดอร์เข้า Current Order */}
                    <button type="button" className="mr-4 text-white bg-pink-400 hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 shadow-sm font-medium rounded-4xl text-sm px-2 py-2 focus:outline-none">
                        <AddCircleIcon sx={{ fontSize: 20 }}/>
                    </button>
                </div>
            </div>
            
        </div>
    );
}
