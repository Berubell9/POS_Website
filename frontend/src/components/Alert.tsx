import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

type AlertProps = {
    message: string;
    type?: "success" | "error" | "info" | "warning";
    onClose?: () => void;
};

const config = {
    success: {
        text: "text-green-500",
        icon: <CheckCircleIcon className="text-green-500" sx={{ fontSize: 80 }}/>,
    },
    error: {
        text: "text-gray-400",
        icon: <ErrorIcon className="text-red-500" sx={{ fontSize: 80 }} />,
    },
    info: {
        text: "text-blue-700",
        icon: <InfoIcon className="text-blue-500" sx={{ fontSize: 80 }}/>,
    },
    warning: {
        text: "text-yellow-800",
        icon: <WarningIcon className="text-yellow-500" sx={{ fontSize: 80 }}/>,
    },
};

export default function Alert({
    message,
    type = "info",
    onClose,
}: AlertProps) {
    const style = config[type];

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/20 px-4">
            <div
                className={`relative flex w-full max-w-sm flex-col items-center rounded-2xl p-6 bg-white text-center shadow-xl 
                    ${style.text}`}
            >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full">{style.icon}</div>

                <p className="text-xl font-extrabold">{message}</p>

                {onClose && (
                    <button
                        onClick={onClose}
                        className="mt-5 rounded-md border border-red-500 bg-red-50 px-5 py-2 font-semibold text-red-500 transition hover:bg-red-100"
                    >
                        ปิด
                    </button>
                )}
            </div>
        </div>
    );
}