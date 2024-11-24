import React, { useState } from "react";

interface APIKeyInputProps {
  onSubmit: (apiKey: string) => void;
}

export const APIKeyInput: React.FC<APIKeyInputProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Enter OpenAI API Key</h2>
      <div className="space-y-4">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg 
                  text-gray-100 placeholder-gray-400"
        />
        <button
          onClick={() => apiKey && onSubmit(apiKey)}
          disabled={!apiKey}
          className="w-full p-3 bg-blue-600 text-white rounded-lg 
                  hover:bg-blue-700 disabled:opacity-50"
        >
          Connect to ChatGPT
        </button>
      </div>
      <p className="mt-2 text-sm text-gray-400">
        Your API key will be stored locally and used only for API requests.
      </p>
    </div>
  );
};
