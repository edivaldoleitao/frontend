interface AlertMessageProps {
  type: "warning" | "error" | "success";
  message: string;
  onClose?: () => void;
}

const typeStyles: Record<AlertMessageProps["type"], string> = {
  warning: "bg-yellow-500",
  error: "bg-red-500 border border-red-700",
  success: "bg-green-400 border border-green-700",
};

export function AlertMessage({ type, message, onClose }: AlertMessageProps) {
  const baseStyle =
    "w-full rounded-full py-2 px-4 flex justify-between items-center font-bold text-white mb-2 shadow";

  return (
    <div className={`${baseStyle} ${typeStyles[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-normal hover:opacity-75">
        ✕
      </button>
    </div>
  );
}
