import React, { useState, useCallback } from "react";
import { Send } from "lucide-react";
import { messageSchema } from "../../schemas/message";
import { useChatStore } from "../../store/chat";
import { z } from "zod";
import { useChatGPT } from "../../hooks/useGptChat";

export const ChatInput: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const { isLoading, actions } = useChatStore();
  const apiKey = localStorage.getItem("openai_api_key"); // Храним ключ в localStorage
  const { sendMessage } = useChatGPT(apiKey || "");

  const handleSubmit = useCallback(async () => {
    try {
      const validatedData = messageSchema.parse({ text: inputText });
      await sendMessage(validatedData.text);
      setInputText("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        actions.setError(err.errors[0].message);
      } else {
        actions.setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
    }
  }, [inputText, sendMessage, actions]);

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        placeholder="Введите сообщение..."
        disabled={isLoading}
        className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg 
                text-gray-100 placeholder-gray-400
                focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                transition-colors disabled:opacity-50"
      />
      <button
        onClick={handleSubmit}
        disabled={!inputText.trim() || isLoading}
        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-6 h-6" />
      </button>
    </div>
  );
};
