import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';
import { SYSTEM_PROMPT } from '@/lib/cv-data';

// Groq works best on the edge, but nodejs is fine for compatibility
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Convert UI messages to Model messages (Async for SDK 6.0)
    const modelMessages = await convertToModelMessages(messages);

    // 2. Initialize the stream using Groq
    const result = streamText({
      model: groq('llama-3.3-70b-versatile'), // High performance, high intelligence model
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      temperature: 0.7, // Adds a touch of personality to the responses
    });

    // 3. Return the specialized UI stream for your Chatbot.tsx sendMessage hook
    return result.toUIMessageStreamResponse();
    
  } catch (error: any) {
    console.error("Groq API Error:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to connect to Groq", 
        details: error.message 
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}