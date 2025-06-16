interface AlertMessageProps {
  type: "warning" | "error"
  message: string
  onClose: () => void
}

export function AlertMessage({ type, message, onClose }: AlertMessageProps) {
  const baseStyle =
    "w-[90%] rounded-full py-2 px-4 flex justify-between items-center font-bold text-white mb-2 shadow"

  const typeStyle =
    type === "warning"
      ? "bg-yellow-500"
      : "bg-red-500 border border-red-700"

  return (
    <div className={`${baseStyle} ${typeStyle}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-normal hover:opacity-75">
        ✕
      </button>
    </div>
  )
}
