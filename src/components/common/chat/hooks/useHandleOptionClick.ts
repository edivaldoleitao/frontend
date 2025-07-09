import type { Message } from "../../../../types/types";

export const removeOptionsFromLastBotMessage = (messages: Message[]): Message[] => {
  const updated = [...messages];
  const last = updated[updated.length - 1];

  if (last && !last.isUser && last.options) {
    updated[updated.length - 1] = { ...last, options: undefined };
  }

  return updated;
};
