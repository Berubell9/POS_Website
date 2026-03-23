import CircleIcon from "@mui/icons-material/Circle";
import NoMealsIcon from "@mui/icons-material/NoMeals";
import OrderCard from "./OrderCard";

type OrderItem = {
    id: number;
    product_id: number;
    product_name: string;
    product_image: string;
    unit_price: number;
    quantity: number;
    total: number;
};

type OrderCardData = {
    id: number;
    queueNumber: string;
    tableNumber: string;
    items: OrderItem[];
};

type OrderColumnProps = {
    title: string;
    color: "yellow" | "sky" | "green";
    orders: OrderCardData[];
    actionLabel: string;
    actionVariant?: "pink" | "sky" | "green";
    onAction?: (orderId: number) => void;
};

const colorClassMap = {
    yellow: {
        dot: "text-yellow-500",
        badge: "bg-yellow-200 text-yellow-800",
    },
    sky: {
        dot: "text-sky-500",
        badge: "bg-sky-200 text-sky-800",
    },
    green: {
        dot: "text-green-500",
        badge: "bg-green-200 text-green-800",
    },
};

export default function OrderColumn({
    title,
    color,
    orders,
    actionLabel,
    actionVariant = "pink",
    onAction,
}: OrderColumnProps) {
    const styles = colorClassMap[color];

    return (
        <div className="w-full">
            <div className="flex items-center">
                <CircleIcon sx={{ fontSize: 12 }} className={styles.dot} />
                <p className="ml-2 text-lg font-extrabold">{title}</p>

                <p className={`ml-2 rounded-2xl px-2 py-1 text-sm ${styles.badge}`}>
                    {orders.length}
                </p>
            </div>

            {orders.length === 0 ? (
                <div className="mt-2 flex min-h-30 flex-col items-center justify-center rounded-xl bg-white p-4 text-center text-gray-400 shadow-sm">
                    <NoMealsIcon sx={{ fontSize: 40 }} />
                    <p className="mt-2">ไม่พบรายการออเดอร์</p>
                </div>
            ) : (
                <div className="mt-2 space-y-2">
                    {orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            queueNumber={order.queueNumber}
                            tableNumber={order.tableNumber}
                            items={order.items}
                            actionLabel={actionLabel}
                            actionVariant={actionVariant}
                            onAction={() => onAction?.(order.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}