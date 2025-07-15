import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  message: string;
  onClose: () => void;
  duration?: number;
}

const toastVariants = {
  info: {
    icon: Info,
    className: "bg-blue-50 border-blue-200 text-blue-800",
    iconClassName: "text-blue-500",
  },
  success: {
    icon: CheckCircle,
    className: "bg-green-50 border-green-200 text-green-800",
    iconClassName: "text-green-500",
  },
  warning: {
    icon: AlertTriangle,
    className: "bg-yellow-50 border-yellow-200 text-yellow-800",
    iconClassName: "text-yellow-500",
  },
  error: {
    icon: AlertCircle,
    className: "bg-red-50 border-red-200 text-red-800",
    iconClassName: "text-red-500",
  },
};

export const Toast = ({
  variant = "info",
  title,
  message,
  onClose,
  duration = 4000,
}: ToastProps) => {
  const config = toastVariants[variant];
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2">
      <div className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-md min-w-72 ${config.className}`}>
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconClassName}`} />
        <div className="flex-1 min-w-0">
          {title && <div className="font-medium text-sm mb-1">{title}</div>}
          <div className="text-sm">{message}</div>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
