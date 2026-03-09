import CircleIcon from '@mui/icons-material/Circle';
import NoMealsIcon from '@mui/icons-material/NoMeals';

export default function OrderCard() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 text-gray-800 pb-6">
            {/* ออเดอร์ที่รอดำเนินการ */}
            <div className="w-full">
                <div className="flex items-center">
                    <CircleIcon sx={{ fontSize: 12 }} className="text-yellow-500" />
                    <p className="ml-2 font-extrabold">รอดำเนินการ</p>
                    {/* จำนวนออเดอร์ */}
                    <p className="text-sm text-yellow-800 ml-2 px-2 py-1 bg-yellow-200 rounded-2xl">
                        1
                    </p>
                </div>

                {/* Order Card */}
                <div className='mt-2 space-y-2'>
                    <div className="min-h-30 p-4 bg-white rounded-xl shadow-sm flex flex-col">
                        <p className='font-extrabold text-xl'>เลขออเดอร์</p>
                        <p className='text-gray-400 mt-1 text-sm text-thin'><span>โต๊ะ : </span>หมายเลขโต๊ะ</p>
                        {/* แสดงรายการทั้งหมด */}
                        <div className='space-y-2'>
                            {/* box เเต่ละรายการ */}
                            <div className='flex mt-2 items-center bg-gray-100 rounded-md p-2'>
                                <img src='test.jpg' className='h-10 object-contain rounded-md'></img>
                                <p className='ml-2'>ชื่อเมนู</p>
                                <p className='ml-2 text-sm text-gray-800 px-2 py-1 bg-pink-200 rounded-2xl'>x2</p>
                            </div>
                            {/* ตัวอย่าง box เเต่ละรายการ */}
                            <div className='flex mt-2 items-center bg-gray-100 rounded-md p-2'>
                                <img src='test.jpg' className='h-10 object-contain rounded-md'></img>
                                <p className='ml-2'>ชื่อเมนู</p>
                                <p className='ml-2 text-sm text-gray-800 px-2 py-1 bg-pink-200 rounded-2xl'>x2</p>
                            </div>
                        </div>
                        {/* ปุ่มไปขั้นตอนถัดไป */}
                        <button type="button" className="text-white bg-pink-400 mt-2 hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 shadow-sm font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none">
                            ขั้นตอนถัดไป
                        </button>
                    </div>

                    {/* ตัวอย่างถ้ามี 2 ออเดอร์ */}
                    <div className="min-h-30 p-4 bg-white rounded-xl shadow-sm flex flex-col">
                        <p className='font-extrabold text-xl'>เลขออเดอร์</p>
                        <p className='text-gray-400 mt-1 text-sm text-thin'><span>โต๊ะ : </span>หมายเลขโต๊ะ</p>
                        {/* แสดงรายการทั้งหมด */}
                        <div className='space-y-2'>
                            {/* box รายการ */}
                            <div className='flex mt-2 items-center bg-gray-100 rounded-md p-2'>
                                <img src='test.jpg' className='h-10 object-contain rounded-md'></img>
                                <p className='ml-2'>ชื่อเมนู</p>
                                <p className='ml-2 text-sm text-gray-800 px-2 py-1 bg-pink-200 rounded-2xl'>x2</p>
                            </div>
                            {/* ตัวอย่าง box รายการ */}
                            <div className='flex mt-2 items-center bg-gray-100 rounded-md p-2'>
                                <img src='test.jpg' className='h-10 object-contain rounded-md'></img>
                                <p className='ml-2'>ชื่อเมนู</p>
                                <p className='ml-2 text-sm text-gray-800 px-2 py-1 bg-pink-200 rounded-2xl'>x2</p>
                            </div>
                        </div>
                        {/* ปุ่มไปขั้นตอนถัดไป */}
                        <button type="button" className="text-white bg-pink-400 mt-2 hover:bg-pink-500 focus:ring-4 focus:ring-pink-300 shadow-sm font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none">
                            ขั้นตอนถัดไป
                        </button>
                    </div>
                </div>
            </div>

            {/* ออเดอร์ที่กำลังทำ */}
            <div className="w-full">
                <div className="flex items-center">
                    <CircleIcon sx={{ fontSize: 12 }} className="text-sky-500" />
                    <p className="ml-2 font-extrabold">กำลังทำ</p>
                    {/* จำนวนออเดอร์ */}
                    <p className="text-sm text-sky-800 ml-2 px-2 py-1 bg-sky-200 rounded-2xl">
                        0
                    </p>
                </div>

                {/* Order Card */}
                <div className="min-h-30 p-4 mt-2 bg-white text-center text-gray-400 rounded-xl shadow-sm flex flex-col items-center justify-center">
                    <NoMealsIcon sx={{ fontSize: 40 }} />
                    <p className="mt-2">ไม่มีออเดอร์</p>
                </div>
            </div>

            {/* ออเดอร์ที่เสร็จพร้อมเสิร์ฟ */}
            <div className="w-full">
                <div className="flex items-center">
                    <CircleIcon sx={{ fontSize: 12 }} className="text-green-500" />
                    <p className="ml-2 font-extrabold">พร้อมเสิร์ฟ</p>
                    {/* จำนวนออเดอร์ */}
                    <p className="text-sm text-green-800 ml-2 px-2 py-1 bg-green-200 rounded-2xl">
                        0
                    </p>
                </div>

                {/* Order Card */}
                <div className="min-h-30 p-4 mt-2 bg-white text-center text-gray-400 rounded-xl shadow-sm flex flex-col items-center justify-center">
                    <NoMealsIcon sx={{ fontSize: 40 }} />
                    <p className="mt-2">ไม่มีออเดอร์</p>
                </div>
            </div>
        </div>
    )
}