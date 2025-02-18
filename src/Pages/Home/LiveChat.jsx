/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { User, MessageSquare, Calendar, CheckCircle } from 'lucide-react';

const LiveChat = () => {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hello! How can I assist you today with your real estate queries?', timestamp: new Date(), options: [] },
  ]);
  const [input, setInput] = useState('');
  const [isAgentOnline, setIsAgentOnline] = useState(true); // Simulate agent status
  const [selectedOption, setSelectedOption] = useState(null);

  // Simulate agent status change
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAgentOnline((prev) => !prev);
    }, 30000); // Change status every 30 seconds for demo purposes
    return () => clearInterval(interval);
  }, []);

  const handleMessageSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'User', text: input, timestamp: new Date(), options: [] };
    setMessages((prev) => [...prev, newMessage]);

    const aiResponse = getAIResponse(input.toLowerCase());
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        aiResponse,
      ]);
    }, 1000); // Simulate AI thinking time

    setInput('');
    setSelectedOption(null);
  };

  const getAIResponse = (userInput) => {
    if (userInput.includes('financing')) {
      return {
        sender: 'AI',
        text: 'I can help you with financing options.',
        options: [
          'Learn about mortgage types',
          'Calculate monthly payments',
          'Schedule a financing consultation'
        ],
        timestamp: new Date()
      };
    } else if (userInput.includes('availability')) {
      return {
        sender: 'AI',
        text: 'Let me check the availability for you.',
        options: [
          'View available properties',
          'Check specific property availability',
          'Set up alerts for new listings'
        ],
        timestamp: new Date()
      };
    } else if (userInput.includes('appointment')) {
      return {
        sender: 'AI',
        text: 'Please choose a convenient time for your appointment:',
        options: [
          'Today at 3 PM',
          'Tomorrow at 10 AM',
          'Next week Monday at 2 PM'
        ],
        timestamp: new Date()
      };
    } else {
      return {
        sender: 'AI',
        text: 'I can assist you further. What would you like to know?',
        options: [
          'Ask about properties',
          'Discuss financing',
          'Schedule an appointment'
        ],
        timestamp: new Date()
      };
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const newMessage = {
      sender: 'User',
      text: option,
      timestamp: new Date(),
      options: []
    };
    setMessages((prev) => [...prev, newMessage]);
    const aiResponse = getAIResponse(option.toLowerCase());
    setTimeout(() => {
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="w-full max-w-lg mx-auto m-10 p-4 sm:p-6 bg-white  rounded-lg border dark:bg-gray-800 dark:border-gray-700 relative">
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Live Chat</h2>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {isAgentOnline ? 'Chatting with a real estate agent' : 'AI Assistant is available'}
        </div>
      </div>
      <hr className="my-2 border-t border-gray-200 dark:border-gray-700"/>
    </div>

    <div className="space-y-4 h-72 sm:h-96 overflow-y-auto mb-4 p-2">
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
          {msg.sender === 'AI' && 
            <div className="h-10 w-10 rounded-full bg-blue-300 dark:bg-gray-600 flex-shrink-0"> <img className='h-10 w-10 rounded-full' src="https://avatars.githubusercontent.com/u/99024262?v=4" alt="" /></div>}
          <div className={`p-3 rounded-lg ${msg.sender === 'User' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800'} max-w-xs sm:max-w-sm`}>
            <p>{msg.text}</p>
            {msg.options && msg.options.length > 0 && (
              <div className="mt-2 space-y-1">
                {msg.options.map((option, index) => (
                  <button 
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className="block w-full text-left p-2 border border-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 dark:border-gray-700 text-sm"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

    <div className="flex items-center gap-2 p-2  dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-white dark:border-gray-700"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        onClick={handleMessageSend}
        disabled={!input.trim()}
      >
        Send
      </button>
    </div>
  </div>
  );
};

export default LiveChat;