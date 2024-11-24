import { useCallback, useState } from "react";
import { ChatGPTService } from "../serivces/api";
import { useChatStore } from "../store/chat";
import { Message } from "../types";

export const useChatGPT = (apiKey: string) => {
  const [service] = useState(() => new ChatGPTService(apiKey));
  const { messages, actions } = useChatStore();

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        id: Date.now(),
        text,
        sender: "user",
        timestamp: new Date(),
        status: "sending"
      };

      try {
        actions.setLoading(true);
        actions.setError(null);
        actions.addMessage(userMessage);

        // Отправляем сообщение вместе с историей контекста
        const response = await service.sendMessage(text, messages);
        actions.addMessage(response);
      } catch (error) {
        actions.setError(
          error instanceof Error ? error.message : "Failed to get response"
        );
        actions.updateMessage(userMessage.id, { status: "error" });
      } finally {
        actions.setLoading(false);
      }
    },
    [service, messages, actions]
  );

  return { sendMessage };
};
