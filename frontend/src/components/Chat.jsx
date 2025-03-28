import React, { useState, useRef, useEffect } from 'react';
import api from '../services/api';

const Chat = ({ analysisContext }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    
    try {
      const response = await api.sendChatMessage(inputValue, analysisContext);
      
      const aiMessage = {
        text: response.message,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        error: true,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-lg mb-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            <p>Ask me anything about your financial data</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : message.error
                      ? 'bg-red-100 text-red-700'
                      : 'bg-white border border-gray-200 text-gray-700'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading || !analysisContext}
          placeholder={analysisContext ? "Type your question..." : "Upload a document first to enable chat"}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !inputValue.trim() || !analysisContext}
          className={`px-4 py-2 rounded-md ${
            loading || !inputValue.trim() || !analysisContext
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
          }`}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            'Send'
          )}
        </button>
      </form>
    </div>
  );
};

export default Chat; 