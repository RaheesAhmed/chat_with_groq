import { NextRequest, NextResponse } from 'next/server';
import { OpenAIAssistantRunnable } from 'langchain/experimental/openai_assistant';
import { OpenAIFiles } from 'langchain/experimental/openai_files';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const openAIFiles = new OpenAIFiles({ clientOptions: { apiKey: process.env.OPENAI_API_KEY } });
const responseCache = {}; // Cache for storing responses

async function getOrCreateAssistant() {
  const assistantId = process.env.ASSISTANT_ID;

  if (assistantId) {
    const existingAssistant = new OpenAIAssistantRunnable({ assistantId });
    try {
      await existingAssistant.getAssistant();
      return existingAssistant;
    } catch (error) {
      console.error('Error retrieving existing assistant:', error);
    }
  }

  // const file = await openAIFiles.createFile({
  //   file: fs.createReadStream(path.resolve(__dirname, './test.txt')),
  //   purpose: 'assistants',
  // });

  const newAssistant = await OpenAIAssistantRunnable.createAssistant({
    model: 'gpt-4-1106-preview',
    instructions: "You are an expert at improving and testing different language model prompts to achieve the best results. Your goal is to analyze, refine, and optimize prompts to maximize their effectiveness and accuracy. You should consider factors such as clarity, specificity, and context relevance when evaluating and enhancing prompts. Use your expertise to suggest improvements and variations that will lead to more precise and informative responses from the language model.",
    name: "Prompt Optimization Assistant",
    //fileIds: [file.id],
  });

  console.log('Created new assistant:', newAssistant);
  return newAssistant;
}

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
