import SelectTable from "./SelectTable";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import OrderItem from "./OrderItem";
import Footer from "./Footer";

type Order = {
    productId: number;
    name: string;
    price: number;
    image: string;
    qty: number;
};

type CurrentOrderProps = {
    items: Order[];
    selectedTableId: string;
    onSelectTable: (value: string) => void;
    itemCount: number;
    subtotal: number;
    vat: number;
    total: number;
    submittingOrder: boolean;
    onIncreaseQty: (productId: number) => void;
    onDecreaseQty: (productId: number) => void;
    onRemoveItem: (productId: number) => void;
    onClearAll: () => void;
    onConfirmOrder: () => void;
    isMobileOpen?: boolean;
    onClose?: () => void;
};

export default function CurrentOrder({
    items,
    selectedTableId,
    onSelectTable,
    itemCount,
    subtotal,
    vat,
    total,
    submittingOrder,
    onIncreaseQty,
    onDecreaseQty,
    onRemoveItem,
    onClearAll,
    onConfirmOrder,
    isMobileOpen = false,
    onClose,
}: CurrentOrderProps) {
    const header = (
        <div className="flex items-center">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-100">
                <ShoppingCartOutlinedIcon className="text-pink-600" sx={{ fontSize: 20 }} />
            </div>
            <p className="ml-2 text-xl font-extrabold">ตะกร้าสินค้า</p>
        </div>
    );

    const clearButton = (
        <button onClick={onClearAll} className="flex items-center text-red-500">
            <DeleteIcon sx={{ fontSize: 18 }} />
            <p className="font-bold">ลบทั้งหมด</p>
        </button>
    );

    const orderList = (
        <div className="mt-5 flex-1 space-y-2 overflow-y-auto">
            {items.length === 0 ? (
                <div className="py-10 text-center text-gray-400">
                    ยังไม่มีรายการสินค้า
                </div>
            ) : (
                items.map((item) => (
                    <OrderItem
                        key={item.productId}
                        item={item}
                        onIncrease={() => onIncreaseQty(item.productId)}
                        onDecrease={() => onDecreaseQty(item.productId)}
                        onRemove={() => onRemoveItem(item.productId)}
                    />
                ))
            )}
        </div>
    );

    const content = (
        <>
            <SelectTable
                value={selectedTableId}
                onChange={onSelectTable}
            />

            {orderList}

            <Footer
                itemCount={itemCount}
                subtotal={subtotal}
                vat={vat}
                total={total}
                submittingOrder={submittingOrder}
                onConfirmOrder={onConfirmOrder}
            />
        </>
    );

    return (
        <>
            {/* Desktop */}
            <aside className="hidden h-full w-100 flex-col bg-white p-4 shadow-md xl:flex">
                <div className="mt-2 flex shrink-0 items-center justify-between border-b border-gray-200 pb-4">
                    {header}
                    {clearButton}
                </div>

                <div className="mt-4 flex flex-1 flex-col">
                    {content}
                </div>
            </aside>

            {/* Mobile */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-50 flex flex-col bg-white p-4 xl:hidden">
                    <div className="flex shrink-0 items-center justify-between border-b border-gray-200 pb-4">
                        {header}

                        <div className="flex items-center gap-3">
                            {clearButton}

                            <button
                                onClick={onClose}
                                className="text-gray-500 transition hover:text-gray-700"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-1 flex-col overflow-hidden">
                        {content}
                    </div>
                </div>
            )}
        </>
    );
}