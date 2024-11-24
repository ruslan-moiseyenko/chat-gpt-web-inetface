import React, { useState } from "react";
import { Settings, Trash2, AlertCircle } from "lucide-react";
import { MessageBubble } from "./components/MessageBubble";
import { ChatInput } from "./components/ChatInput";
import { SettingsPanel } from "./components/SettingsPanel";
import { useChatStore } from "./store/chat";
import { APIKeyInput } from "./components/APIKeyInput";

const App: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { messages, error, actions } = useChatStore();
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem("openai_api_key")
  );

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem("openai_api_key", key);
    setApiKey(key);
  };

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="w-full max-w-md">
          <APIKeyInput onSubmit={handleApiKeySubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-xl font-semibold text-gray-100">
          My ChatGPT Web Interface
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
          <button
            onClick={actions.clearMessages}
            className="p-2 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showSettings && <SettingsPanel />}
        {error && (
          <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <div className="border-t border-gray-700 p-4">
        <ChatInput />
      </div>
    </div>
  );
};

export default App;
