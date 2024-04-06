import { NextRequest, NextResponse } from 'next/server';
import { OpenAIAssistantRunnable } from 'langchain/experimental/openai_assistant';
import { OpenAIFiles } from 'langchain/experimental/openai_files';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const openAIFiles = new OpenAIFiles({ clientOptions: { apiKey: process.env.OPENAI_API_KEY } });


async function chatWithAssistant(assistant, message) {
  const response = await assistant.invoke({ content: message });

  // Extract the content value from the response
  const contentValue = response.content;

  return contentValue;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    console.log('Message Received:', message);

    const assistant = await getOrCreateAssistant();
    const contentValue = await chatWithAssistant(assistant, message);
    console.log('Content Value:', contentValue);

    return new NextResponse(JSON.stringify({ response: contentValue }));
  } catch (error) {
    console.error('Error handling request:', error);
    return new NextResponse(JSON.stringify({ error: 'An error occurred while processing the request.' }));
  }
}

