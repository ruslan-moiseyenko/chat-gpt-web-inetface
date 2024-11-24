import { CONFIG } from "../config";
import { ChatMessage, Message, OpenAIResponse } from "../types";

export class ChatGPTService {
  private apiKey: string;
  private baseUrl: string;
  private model: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = CONFIG.API.OPENAI_URL;
    this.model = CONFIG.API.MODEL;
  }

  async sendMessage(
    text: string,
    conversationHistory: Message[] = []
  ): Promise<Message> {
    try {
      // Преобразуем историю сообщений в формат OpenAI
      const messages: ChatMessage[] = [
        {
          role: "system",
          content: "You are a helpful assistant. Respond concisely and clearly."
        },
        ...conversationHistory.map(
          (msg) =>
            ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text
            } as ChatMessage)
        ),
        { role: "user", content: text }
      ];

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          // max_tokens: CONFIG.API.MAX_TOKENS,
          temperature: CONFIG.API.TEMPERATURE
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error?.message || "Failed to get response from OpenAI"
        );
      }

      const data: OpenAIResponse = await response.json();
      const assistantMessage = data.choices[0]?.message;

      if (!assistantMessage) {
        throw new Error("No response from assistant");
      }

      return {
        id: Date.now(),
        text: assistantMessage.content,
        sender: "ai",
        timestamp: new Date(),
        status: "sent"
      };
    } catch (error) {
      console.error("ChatGPT API Error:", error);
      throw error;
    }
  }
}
