export type AlertMessageType = "warning" | "error" | "success";
interface AlertMessageProps {
  type: AlertMessageType
  message: string;
  onClose?: () => void;
}

export function AlertMessage({ type, message, onClose }: AlertMessageProps) {
  const baseStyle =
    "w-[100%] rounded-full py-2 px-4 flex justify-between items-center font-bold text-white mb-2 shadow";

  const typeStyleMapper: Record<AlertMessageType, string> ={
    warning: "bg-yellow-500",
    error: "bg-red-500 border border-red-700",
    success: "bg-green-500",
  }

  const typeStyle = typeStyleMapper[type]

    
  return (
    <div className={`${baseStyle} ${typeStyle}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-normal hover:opacity-75">
        ✕
      </button>
    </div>
  );
}
