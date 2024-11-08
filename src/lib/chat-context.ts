import { createContext, useContext } from 'react';

export interface ChatContext {
  userPreferences: {
    style?: string;
    budget?: string;
    timeline?: string;
    propertyType?: string;
    area?: string;
  };
  chatHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
}

export const ChatContext = createContext<ChatContext>({
  userPreferences: {},
  chatHistory: [],
});

export const useChat = () => useContext(ChatContext);