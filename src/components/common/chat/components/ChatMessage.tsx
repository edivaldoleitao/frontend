import { cn } from '../../../../utils/utils';

interface ChatMessageProps {
    message: string;
    isUser: boolean;
    timestamp: Date;
    options?: string[];
    onOptionClick?: (option: string) => void;
}

const ChatMessage = ({
    message,
    isUser,
    timestamp,
    options = [],
    onOptionClick,
}: ChatMessageProps) => {
    const containerClass = cn(
        "flex w-full mb-6",
        isUser ? "justify-end" : "justify-start"
    );

    const bubbleClass = cn(
        "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
        isUser ? "bg-blue-600 text-white ml-12" : "bg-gray-100 text-gray-900 mr-12"
    );

    const timestampClass = cn(
        "text-xs mt-2 opacity-70",
        isUser ? "text-blue-100" : "text-gray-500"
    );

    return (
        <div className={containerClass}>
            <div className={bubbleClass}>
                {/* Texto da mensagem */}
                <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                    {message}
                </div>

                {/* Opções (se existirem) */}
                {options.length > 0 && !isUser && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {options.map((opt, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => onOptionClick?.(opt)}
                                className="bg-[#6A4CC3] hover:bg-[#5536A7] text-white px-4 py-1 rounded-full text-sm font-medium transition-all duration-200"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}

                {/* Timestamp */}
                <div className={timestampClass}>
                    {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
