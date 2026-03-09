import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
            <div className="hidden xl:flex w-80 h-full bg-white p-4 shadow-md flex-col ">
                {/* Header */}
                <div className="flex mt-2 items-center justify-between">
                    <div className="flex items-center">
                        <ShoppingCartIcon sx={{ fontSize: 20 }} />
                        <p className="font-extrabold text-xl ml-2">ตะกร้าสินค้า</p>
                    </div>
                    {/* ปุ่มลบรายการทั้งหมด */}
                    <button className="flex items-center text-red-500">
                        <DeleteIcon sx={{ fontSize: 16 }} />
                        <p className="text-sm">ลบทั้งหมด</p>
                    </button>
                </div>

                {/* Content */}
                {/* ใส่เลขโต๊ะ */}
                <input
                    type="text"
                    placeholder="หมายเลขโต๊ะ"
                    className="p-2 mt-5 text-md w-full rounded-md border border-gray-200 outline-none focus:outline-none focus:ring-0"
                />

                {/* แสดงรายการเมนูทั้งหมด ถ้ารายการมีเยอะเกินกรอบจะมี scroll ขึ้น */}
                <div className="mt-5 flex-1 space-y-4 overflow-y-auto pr-2">
                    <OrderItem />
                    <OrderItem />
                    <OrderItem />
                    <OrderItem />
                </div>

                {/* Footer */}
                <Footer />
            </div>

            {/* Mobile */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col xl:hidden">
                    {/* Header */}
                    <div className="flex mt-2 items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <ShoppingCartIcon sx={{ fontSize: 20 }} />
                            <p className="font-extrabold text-xl ml-2">ตะกร้าสินค้า</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {/* ปุ่มลบรายการทั้งหมด */}
                            <button className="flex items-center text-red-500">
                                <DeleteIcon sx={{ fontSize: 16 }} />
                                <p className="text-sm">ลบทั้งหมด</p>
                            </button>
                            {/* ปุ่มปิดหน้า CurrentOrder */}
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <CloseIcon />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col overflow-hidden">
                        {/* ใส่เลขโต๊ะ */}
                        <input
                            type="text"
                            placeholder="หมายเลขโต๊ะ"
                            className="p-2 text-md w-full rounded-md border border-gray-200 outline-none focus:outline-none focus:ring-0"
                        />
                        {/* แสดงรายการเมนูทั้งหมด ถ้ารายการมีเยอะเกินกรอบจะมี scroll ขึ้น */}
                        <div className="mt-5 flex-1 space-y-4 overflow-y-auto pr-2">
                            <OrderItem />
                            <OrderItem />
                            <OrderItem />
                            <OrderItem />
                            <OrderItem />
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
