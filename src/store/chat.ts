import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Message, Settings } from "../types";
import { CONFIG } from "../config";

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  settings: Settings;
  actions: {
    addMessage: (message: Message) => void;
    updateMessage: (id: number, updates: Partial<Message>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    updateSettings: (settings: Partial<Settings>) => void;
    clearMessages: () => void;
  };
}

export const useChatStore = create<ChatState>()(
  persist(
    immer((set) => ({
      messages: [],
      isLoading: false,
      error: null,
      settings: CONFIG.DEFAULT_SETTINGS,
      actions: {
        addMessage: (message) =>
          set((state) => {
            state.messages.push(message);
          }),
        updateMessage: (id, updates) =>
          set((state) => {
            const message = state.messages.find((m: Message) => m.id === id);
            if (message) {
              Object.assign(message, updates);
            }
          }),
        setLoading: (loading) =>
          set((state) => {
            state.isLoading = loading;
          }),
        setError: (error) =>
          set((state) => {
            state.error = error;
          }),
        updateSettings: (newSettings) =>
          set((state) => {
            state.settings = { ...state.settings, ...newSettings };
          }),
        clearMessages: () =>
          set((state) => {
            state.messages = [];
          })
      }
    })),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        messages: state.messages,
        settings: state.settings
      })
    }
  )
);
