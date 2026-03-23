'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Chatbot() {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    experimental_throttle: 50,
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const currentInput = input;
    setInput(''); 

    await sendMessage({
      text: currentInput,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Improved Auto-scroll logic: 
  // We scroll the container itself rather than an invisible div
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]); // Trigger on message updates AND status changes

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-2xl mx-auto shadow-lg border-t-4 border-t-blue-500 bg-card overflow-hidden">
      {/* REPLACED ScrollArea with a standard div + overflow-y-auto 
          This is often more robust for real-time streaming chat UIs.
      */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500"
      >
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p className="text-sm font-medium">Hello! I'm Henry's AI assistant.</p>
            <p className="text-xs">Ask me about his 4 years of experience at Lloyds or his Electronic Engineering degree.</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <Avatar className="h-8 w-8 flex-shrink-0 border">
                <AvatarFallback className="bg-blue-600 text-white text-[10px]">AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-2xl px-4 py-2 max-w-[85%] break-words text-sm ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-muted text-foreground rounded-tl-none border'
              }`}
            >
              {message.parts.map((part, i) => {
                if (part.type === 'text') {
                  return <span key={i} className="whitespace-pre-wrap">{part.text}</span>;
                }
                return null;
              })}
            </div>
            {message.role === 'user' && (
              <Avatar className="h-8 w-8 flex-shrink-0 border">
                <AvatarFallback className="bg-secondary text-secondary-foreground text-[10px]">YOU</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <Avatar className="h-8 w-8 flex-shrink-0 border">
              <AvatarFallback className="bg-blue-600 text-white text-[10px]">AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted border rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex gap-1">
                <div className="h-1.5 w-1.5 bg-foreground/40 rounded-full animate-bounce"></div>
                <div className="h-1.5 w-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="h-1.5 w-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4 bg-background">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about Henry's projects..."
            disabled={isLoading}
            className="flex-1 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-blue-500"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white transition-all"
          >
            Send
          </Button>
        </form>
      </div>
    </Card>
  );
}