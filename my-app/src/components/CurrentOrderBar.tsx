import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import OrderItem from './CurrentOrderBar/OrderItem'
import Footer from './CurrentOrderBar/Footer'

type CurrentOrderProps = {
    isMobileOpen?: boolean;
    onClose?: () => void;
};

export default function CurrentOrder({
    isMobileOpen = false,
    onClose,
}: CurrentOrderProps) {

    return (
        <>
            {/* Desktop */}
            <div className="hidden p-4 xl:flex w-80 h-full bg-white shadow-md flex-col ">
                {/* Header */}
                <div className="flex mt-2 items-center justify-between pb-4 border-b border-gray-200 shrink-0">
                    <div className="flex items-center">
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
                        <p className="font-extrabold text-xl ml-2">ตะกร้าสินค้า</p>
                    </div>
                    {/* ปุ่มลบรายการทั้งหมด */}
                    <button className="flex items-center text-red-500">
                        <DeleteIcon sx={{ fontSize: 18 }} />
                        <p className="font-bold">ลบทั้งหมด</p>
                    </button>
                </div>

                {/* Content */}
                {/* ใส่เลขโต๊ะ */}
                <label className='mt-4'>หมายเลขโต๊ะ</label>
                <select className="mt-1 text-gray-400 w-full border border-gray-200 rounded-md p-2 h-11 outline-none">
                    <option>เลือกหมายเลขโต๊ะ</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>

                {/* แสดงรายการเมนูทั้งหมด ถ้ารายการมีเยอะเกินกรอบจะมี scroll ขึ้น */}
                <div className="mt-5 flex-1 space-y-2 overflow-y-auto">
                    <OrderItem />
                </div>

                {/* Footer */}
                <Footer />
            </div>

            {/* Mobile */}
            {isMobileOpen && (
                <div className="fixed p-4 inset-0 z-50 bg-white flex flex-col xl:hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200 shrink-0">
                        <div className="flex items-center">
                            <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
                            <p className="font-extrabold text-xl ml-2">ตะกร้าสินค้า</p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* ปุ่มลบรายการทั้งหมด */}
                            <button className="flex items-center text-red-500">
                                <DeleteIcon sx={{ fontSize: 18 }} />
                                <p className="font-bold">ลบทั้งหมด</p>
                            </button>
                            {/* ปุ่มปิดหน้า CurrentOrder */}
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <CloseIcon />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mt-4 flex-1 flex flex-col overflow-hidden">
                        {/* ใส่เลขโต๊ะ */}
                        <label>หมายเลขโต๊ะ</label>
                        <select className="mt-1 text-gray-400 w-full border border-gray-200 rounded-md p-2 h-11 outline-none">
                            <option>เลือกหมายเลขโต๊ะ</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        {/* แสดงรายการเมนูทั้งหมด ถ้ารายการมีเยอะเกินกรอบจะมี scroll ขึ้น */}
                        <div className="mt-5 flex-1 space-y-2 overflow-y-auto">
                            <OrderItem />
                        </div>

                        {/* Footer */}
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
}
