export const CONFIG = {
  API: {
    OPENAI_URL: "https://api.openai.com/v1",
    MODEL: "gpt-3.5-turbo",
    TEMPERATURE: 0.7
  },
  STORAGE_KEYS: {
    MESSAGES: "chat_messages",
    SETTINGS: "chat_settings"
  },
  DEFAULT_SETTINGS: {
    theme: "dark",
    apiDelay: 1000,
    errorRate: 0.1,
    language: "en"
  },
  MAX_MESSAGE_LENGTH: 500
} as const;
