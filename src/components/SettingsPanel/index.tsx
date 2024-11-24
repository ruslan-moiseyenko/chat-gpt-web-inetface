import React from "react";
import { useChatStore } from "../../store/chat";

export const SettingsPanel: React.FC = () => {
  const { settings, actions } = useChatStore();

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-2">Theme</label>
          <select
            value={settings.theme}
            onChange={(e) =>
              actions.updateSettings({
                theme: e.target.value as "dark" | "light"
              })
            }
            className="w-full bg-gray-700 rounded p-2"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-2">Language</label>
          <select
            value={settings.language}
            onChange={(e) =>
              actions.updateSettings({
                language: e.target.value as "en" | "ru"
              })
            }
            className="w-full bg-gray-700 rounded p-2"
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-2">API Delay (ms)</label>
          <input
            type="number"
            value={settings.apiDelay}
            onChange={(e) =>
              actions.updateSettings({ apiDelay: Number(e.target.value) })
            }
            className="w-full bg-gray-700 rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">Error Rate (%)</label>
          <input
            type="number"
            value={settings.errorRate * 100}
            onChange={(e) =>
              actions.updateSettings({
                errorRate: Number(e.target.value) / 100
              })
            }
            className="w-full bg-gray-700 rounded p-2"
          />
        </div>
      </div>
    </div>
  );
};
