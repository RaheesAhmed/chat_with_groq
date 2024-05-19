"use client"
import React, { useState, useRef } from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Define the Message interface
interface Message {
  type: "user" | "ai";
  text: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;

    // Append user message
    const newMessage = { type: "user", text: inputValue };
    setMessages(messages => [...messages, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Send message to API and format response
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(messages => [...messages, { type: "ai", text: data.response }]);
    } catch (error) {
      console.error("Error in sending message:", error);
      setMessages(messages => [...messages, { type: "ai", text: "Failed to get response from AI." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <Sidebar />
      <div className="flex w-full h-full max-w-6xl px-4 items-center justify-center">
        <div className="flex flex-col w-3/4 h-full mr-4">
          <div className="text-white rounded-lg p-6 flex flex-col h-full">
            <div className="font-bold text-3xl text-center mb-4">
              Your AI Powered Assistant
            </div>
            <div className=" flex-1 overflow-x-auto p-4 rounded-lg flex-1  p-4 rounded-lg chat-message-container">
              {messages.length === 0 && (
                <p className="text-gray-300">
                  Start a conversation and explore the power of AI. Your chat history will be displayed here.
                </p>
              )}
              {messages.map((message, index) => (
                <div key={index} className="flex items-start mb-2">
                  <FontAwesomeIcon
                    icon={message.type === "user" ? faUser : faRobot}
                    alt={message.type}
                    className="mr-2"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <div className={`flex flex-col p-2 rounded-lg ${message.type === 'user' ? 'bg-gray-700 items-end' : 'bg-gray-800 items-start'}`}>
                    <ReactMarkdown
                      children={message.text}
                      components={{
                        code({node, inline, className, children, ...props}) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <SyntaxHighlighter style={dark} language={match[1]} PreTag="div" {...props}>
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start mb-2 ">
                  <FontAwesomeIcon icon={faRobot} className="text-xl mr-2 mt-1 " />
                  <span className="typing-indicator">Typing...</span>
                </div>
              )}
            </div>
            <form onSubmit={sendMessage} className="mt-4 flex">
              <div className="relative flex-grow">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(e)}
                  placeholder="Enter a prompt here"
                  className="w-full pl-12 pr-12 p-4 rounded-lg bg-gray-900 border border-white text-white overflow-hidden"
                  style={{ minHeight: "20px", maxHeight: "250px" }}
                />
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="absolute top-1/2 right-5 -translate-y-1/2 text-white cursor-pointer"
                  onClick={sendMessage}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
