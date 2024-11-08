import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader } from 'lucide-react';
import { generateAIResponse, searchImages, type ImageResult } from '@/lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  images?: ImageResult[];
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou seu assistente virtual da Soba Construções. Como posso ajudar com seu projeto hoje?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await generateAIResponse(input);
      
      // Search for relevant images if the message contains visual references
      let images: ImageResult[] | undefined;
      if (input.toLowerCase().includes('exemplo') || 
          input.toLowerCase().includes('mostrar') || 
          input.toLowerCase().includes('referência')) {
        images = await searchImages(input);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        images,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full pt-4">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col w-max max-w-[80%] ${
                message.role === 'assistant'
                  ? 'bg-muted'
                  : 'bg-primary text-primary-foreground ml-auto'
              } rounded-lg px-4 py-2`}
            >
              <p className="text-sm">{message.content}</p>
              {message.images && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {message.images.map((image) => (
                    <img
                      key={image.id}
                      src={image.url}
                      alt={image.alt}
                      className="rounded-md w-full h-32 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="bg-muted w-max rounded-lg px-4 py-2">
              <Loader className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="flex items-end gap-2 pt-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="min-h-[80px]"
        />
        <Button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="mb-[3px]"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}