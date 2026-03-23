type OrderItem = {
    id: number;
    product_id: number;
    product_name: string;
    product_image: string;
    unit_price: number;
    quantity: number;
    total: number;
};

type OrderCardProps = {
    queueNumber: string;
    tableNumber: string;
    items: OrderItem[];
    actionLabel: string;
    actionVariant?: "pink" | "sky" | "green";
    onAction?: () => void;
};

const actionClassMap: Record<NonNullable<OrderCardProps["actionVariant"]>, string> = {
    pink: "border-pink-300 bg-pink-50 text-pink-400 hover:bg-pink-100",
    sky: "border-sky-300 bg-sky-50 text-sky-400 hover:bg-sky-100",
    green: "border-green-300 bg-green-50 text-green-500 hover:bg-green-100",
};

export default function OrderCard({
    queueNumber,
    tableNumber,
    items,
    actionLabel,
    actionVariant = "pink",
    onAction,
}: OrderCardProps) {
    return (
        <div className="flex min-h-30 flex-col rounded-xl bg-white p-4 shadow-sm">
            <p className="warp-break-words text-xl font-extrabold text-gray-800">
                คิวที่ {queueNumber}
            </p>

            <p className="mt-1 text-sm font-light text-gray-400">
                <span>โต๊ะ : </span>
                {tableNumber}
            </p>

            <div className="mt-2 space-y-2">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex w-full items-center rounded-md bg-gray-100 p-2"
                    >
                        <img
                            src={item.product_image || "/no-image.png"}
                            alt={item.product_name}
                            className="h-10 w-10 rounded-md object-cover"
                            onError={(e) => {
                                e.currentTarget.src = "/no-image.png";
                            }}
                        />

                        <p className="ml-2 min-w-0 flex-1 truncate text-sm text-gray-800">
                            {item.product_name}
                        </p>

                        <p className="ml-2 rounded-2xl bg-pink-200 px-2 py-1 text-sm text-pink-800">
                            x{item.quantity}
                        </p>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={onAction}
                className={`mt-3 rounded-lg border px-4 py-2.5 text-sm font-medium shadow-sm transition ${actionClassMap[actionVariant]}`}
            >
                {actionLabel}
            </button>
        </div>
    );
}