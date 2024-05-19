import { NextRequest, NextResponse } from 'next/server';
import Groq from "groq-sdk";
const groq = new Groq({
  apiKey: "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",
});
import dotenv from 'dotenv';

dotenv.config();

async function main(query) {
  const chatCompletion = await getGroqChatCompletion(query);
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0].message.content);
  return chatCompletion.choices[0].message.content;
}
async function getGroqChatCompletion(query) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
    model: "llama3-8b-8192",
  });
}


export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    console.log('Message Received:', message);

    
    const content = await main(message);
    console.log('Content Value:', {content});

    return new NextResponse(JSON.stringify({ response: content }));
  } catch (error) {
    console.error('Error handling request:', error);
    return new NextResponse(JSON.stringify({ error: 'An error occurred while processing the request.' }));
  }
}


