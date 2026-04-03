import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

type Order = {
    productId: number;
    name: string;
    price: number;
    image: string;
    qty: number;
};

type OrderItemProps = {
    item: Order;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
};

export default function OrderItem({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}: OrderItemProps) {
    {
        return (
            <div className="flex py-2 px-4 bg-gray-100 rounded-md items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* รูปเมนู */}
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-18 w-18 rounded-lg object-cover"
                    />

                    <div className="space-y-1">
                        {/* ชื่อเมนู */}
                        <p className="font-bold">{item.name}</p>
                        {/* จำนวน */}
                        <p className="font-thin text-sm">฿{item.price}</p>
                        <div className="flex items-center gap-3">
                            {/* ปุ่มลบจำนวน */}
                            <button 
                                onClick={onDecrease}
                                className="w-6 h-6 text-sm bg-white text-gray-500 rounded-full border border-gray-300 flex items-center justify-center">
                                    <RemoveIcon sx={{ fontSize: 18 }} />
                            </button>

                            {/* จำนวน */}
                            <p className="text-sm">{item.qty}</p>

                            {/* ปุ่มเพิ่มจำนวน */}
                            <button
                                onClick={onIncrease}
                                className="w-6 h-6 text-sm bg-white text-gray-500 rounded-full border border-gray-300 flex items-center justify-center">
                                    <AddIcon sx={{ fontSize: 18 }} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-8">
                    {/* ปุ่มลบรายการ */}
                    <button 
                        onClick={onRemove}
                        className="h-6 w-6 text-red-500 text-xl">
                            <DeleteIcon sx={{ fontSize: 20 }} />
                    </button>
                    {/* ราคา */}
                    <p className="text-pink-400 font-bold text-lg">฿{item.price * item.qty}</p>
                </div>
            </div>
        );
    }
}