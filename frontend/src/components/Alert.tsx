import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";

type AlertProps = {
    message: string;
    type?: "success" | "error" | "info" | "warning";
    onClose?: () => void;
};

const config = {
    success: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: <CheckCircleIcon className="text-green-500" />,
    },
    error: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: <ErrorIcon className="text-red-500" />,
    },
    info: {
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: <InfoIcon className="text-blue-500" />,
    },
    warning: {
        bg: "bg-yellow-50",
        text: "text-yellow-800",
        border: "border-yellow-200",
        icon: <WarningIcon className="text-yellow-500" />,
    },
};

export default function Alert({
    message,
    type = "info",
    onClose,
}: AlertProps) {
    const style = config[type];

    return (
        <div
            className={`fixed top-4 right-4 z-50 flex items-center gap-3 rounded-xl border px-4 py-3 shadow-md transition-all
            ${style.bg} ${style.text} ${style.border}`}
        >
            {/* icon */}
            <div className="shrink-0">{style.icon}</div>

            {/* message */}
            <p className="text-sm font-medium">{message}</p>

            {/* close */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                >
                    <CloseIcon fontSize="small" />
                </button>
            )}
        </div>
    );
}