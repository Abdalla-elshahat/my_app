import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'أهلاً! كيف أقدر أساعدك اليوم؟ (برمجة،CV)' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const genAI = new GoogleGenerativeAI('AIzaSyBSdK24ks4F6qvDg-mgh5RuHvngBTpN5Fo');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    setIsLoading(true);
    try {
      // Construct the prompt with context from chat history
      const historyContext = chatHistory
        .map((msg) => `${msg.type === 'user' ? 'User' : 'Bot'}: ${msg.message}`)
        .join('\n');

      const fullPrompt = `
        You are a programming and career advisor. Provide detailed, accurate, and practical advice ONLY on:
        - Programming (coding techniques, debugging, language-specific advice, best practices).
        - Roadmaps (learning paths for specific tech roles like web developer, data scientist, etc.).
        - CV and resume optimization (structuring, highlighting skills, tailoring for tech roles).
        - Optimization techniques (code performance, algorithms, system efficiency).
        
        Rules:
        1. Do NOT respond to queries about products, hardware, or unrelated topics. If the query is outside your scope, politely redirect the user to ask about programming, roadmaps, CVs, or optimization.
        2. Use the conversation history to maintain context. For example, if the user previously asked about C++ and now asks for a code example, provide a C++ code example.
        3. Respond in Arabic unless the user explicitly asks for another language.
        4. If the user asks for a code example, provide a clear, working code snippet with explanations.
        
        Conversation History:
        ${historyContext}
        
        User Query: ${userInput}
      `;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;

      setChatHistory([
        ...chatHistory,
        { type: 'user', message: userInput },
        { type: 'bot', message: response.text() }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory([
        ...chatHistory,
        { type: 'bot', message: 'عذرًا، حصل خطأ. حاول مرة ثانية.' }
      ]);
    } finally {
      setUserInput('');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto h-[550px] flex flex-col border shadow-xl rounded-2xl overflow-hidden bg-white fixed right-10 top-0 sm:right-36 sm:top-11 z-50 w-auto">
      {/* Title/Header */}
      <div className="p-4 font-bold text-xl text-center bg-blue-500 text-white flex items-center justify-center gap-2">
        🤖 شات بوت Gemini
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-100">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.type === 'bot' && (
              <img
                src="https://localo.com/assets/img/definitions/what-is-bot.webp"
                alt="Bot Avatar"
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800 border'} overflow-hidden`}>
              <ReactMarkdown>{msg.message}</ReactMarkdown>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-gray-500 text-sm italic">جاري كتابة الرد...</div>
        )}
      </div>

      {/* Input and Send Button */}
      <div className="p-4 border-t flex items-center gap-2 bg-white">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="اكتب رسالتك هنا..."
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
        >
          إرسال
        </button>
      </div>
    </div>
  );
};

export default ChatBot;