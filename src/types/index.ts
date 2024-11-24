export interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
  timestamp: Date;
  status: "sending" | "sent" | "error";
}

export interface Settings {
  theme: "dark" | "light";
  apiDelay: number;
  errorRate: number;
  language: "en" | "ru";
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: Array<{
    message: ChatMessage;
    finish_reason: string;
    index: number;
  }>;
}
