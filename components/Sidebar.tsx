'use client';
import React, { useState } from "react";

const Sidebar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [assistantId, setAssistantId] = useState('');
  const [assistantName, setAssistantName] = useState('');
  const [assistantInstructions, setAssistantInstructions] = useState('');
  const [assistantTools, setAssistantTools] = useState([]);
  const [showCreateAssistantForm, setShowCreateAssistantForm] = useState(false);


  // Handler for toggling tools
const toggleTool = (tool) => {
  setAssistantTools(assistantTools.includes(tool)
    ? assistantTools.filter(t => t !== tool)
    : [...assistantTools, tool]);
};

  const handleSaveSettings = () => {
    // Save settings to local storage or a server
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('assistantId', assistantId);
    localStorage.setItem('assistantName', assistantName);
    setShowSettings(false);
  };

  return (
    <>
      <div className="w-1/4 h-full bg-black p-4 flex flex-col">
        <div>
          <button className="text-white border border-white rounded px-4 py-2 mb-4 hover:bg-white hover:text-gray-900 transition-colors">
            New Chat
          </button>
          <hr className="my-4" />
          <div>
            <p className="text-white py-2">Chat 1</p>
            <p className="text-white py-2">Chat 2</p>
            <p className="text-white py-2">Chat 3</p>
            <p className="text-white py-2">Chat 4</p>
          </div>
        </div>
        <div className="mt-4 absolute bottom-10 ">
          <button
            className="text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-gray-900 transition-colors"
            onClick={() => setShowSettings(true)}
          >
            Settings
          </button>
        </div>
      </div>
      {showSettings && (
        <div className="absolute bottom-0 px-4 py-2 mb-4 w-full h-full bg-black bg-opacity-50 flex ">
          <div className="bg-gray-900  text-white p-4 rounded">
            <h2 className="text-lg font-bold mb-4">Settings</h2>
            <div className="mb-4">
              <label htmlFor="apiKey" className="block mb-2">API Key</label>
              <input
                id="apiKey"
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="assistantId" className="block mb-2">Assistant ID</label>
              <input
                id="assistantId"
                type="text"
                value={assistantId}
                onChange={(e) => setAssistantId(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mr-2"
          onClick={handleSaveSettings}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          onClick={() => setShowCreateAssistantForm(true)}
        >
          Create Assistant
        </button>
      </div>
    </div>
  </div>
)}

{showCreateAssistantForm && (
  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-900 text-white p-4 rounded max-w-md w-full">
      <h2 className="text-lg font-bold mb-4">Create Assistant</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">Name</label>
        <input
          id="name"
          type="text"
          value={assistantName}
          onChange={(e) => setAssistantName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="instructions" className="block mb-2">Instructions</label>
        <textarea
          id="instructions"
          value={assistantInstructions}
          onChange={(e) => setAssistantInstructions(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Tools</label>
        <div className="flex flex-wrap gap-2">
          {['Retrieval', 'Code Interpreter', 'Functions'].map(tool => (
            <button
              key={tool}
              className={`px-3 py-1 ${assistantTools.includes(tool) ? 'bg-blue-600' : 'bg-blue-500'} rounded hover:bg-blue-700 transition-colors`}
              onClick={() => toggleTool(tool)}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors w-full"
        // Implement the createAssistant logic here
      >
        Submit
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors w-full mt-2"
        onClick={() => setShowCreateAssistantForm(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}
    </>
  );
};

export default Sidebar;
