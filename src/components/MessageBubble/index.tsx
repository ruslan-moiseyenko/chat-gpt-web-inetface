import React from "react";
import { Message } from "../../types";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === "user";

  const formatTimestamp = (timestamp: Date | string) => {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div
      className={`flex items-start space-x-3 ${isUser ? "justify-end" : ""}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
          AI
        </div>
      )}
      <div
        className={`group relative p-3 rounded-lg max-w-3xl ${
          isUser ? "bg-blue-600" : "bg-gray-800"
        }`}
      >
        <p>{message.text}</p>
        <div className="text-xs text-gray-400 mt-1 flex items-center space-x-2">
          <span>{formatTimestamp(message.timestamp)}</span>
          {message.status === "sending" && (
            <span className="text-yellow-500">Sending...</span>
          )}
          {message.status === "error" && (
            <span className="text-red-500">Error sending message</span>
          )}
        </div>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
          U
        </div>
      )}
    </div>
  );
};
