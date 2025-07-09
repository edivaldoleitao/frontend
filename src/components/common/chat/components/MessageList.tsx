import ChatMessage from './ChatMessage';
import SpecsFormComponent, { type SpecsForm } from '../../../../features/upgrade/components/SpecsFormComponent';
import type { Message } from '../../../../types/types';
import type { UserSpecification } from '../../../../features/upgrade/types/type';

interface Props {
  messages: Message[];
  showSpecsForm: boolean;
  isTyping: boolean;
  userId?: string;
  isUpgrade: boolean;
  specsForm: SpecsForm;
  onSpecsChange: (field: keyof SpecsForm, value: string | boolean) => void;
  onSpecsSubmit: (data: UserSpecification) => void;
  onOptionClick: (opt: string) => void;
}

const MessageList = ({
  messages,
  showSpecsForm,
  isTyping,
  userId,
  isUpgrade,
  specsForm,
  onSpecsChange,
  onSpecsSubmit,
  onOptionClick,
}: Props) => {
  return (
    <>
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg.text}
          isUser={msg.isUser}
          timestamp={msg.timestamp}
          options={msg.options}
          onOptionClick={onOptionClick}
        />
      ))}

      {showSpecsForm && isUpgrade && userId && (
        <SpecsFormComponent
          specsForm={specsForm}
          onChange={onSpecsChange}
          onSubmit={onSpecsSubmit}
          userId={userId}
        />
      )}

      {isTyping && (
        <div className="flex justify-start mb-6">
          <div className="rounded-2xl px-4 py-3 mr-12">
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              <span className="text-xs text-gray-500 ml-2">Digitando...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageList;
