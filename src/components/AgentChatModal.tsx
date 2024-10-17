import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
}

interface AgentChatModalProps {
  agent: Agent;
  onClose: () => void;
}

const AgentChatModal: React.FC<AgentChatModalProps> = ({ agent, onClose }) => {
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [rememberChat, setRememberChat] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { sender: 'User', content: inputMessage }]);
      // 这里可以添加与大模型交互的逻辑
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: agent.name, content: `这是来自 ${agent.name} 的回复` }]);
      }, 1000);
      setInputMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-2xl h-3/4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">与 {agent.name} 聊天</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto mb-4 border border-gray-200 rounded-md p-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.sender === 'User' ? 'text-right' : 'text-left'}`}>
              <span className="font-bold">{message.sender}: </span>
              <span>{message.content}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-grow border border-gray-300 rounded-md shadow-sm p-2 mr-2"
            placeholder="输入消息..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            发送
          </button>
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="rememberChat"
            checked={rememberChat}
            onChange={(e) => setRememberChat(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="rememberChat">记住此次对话</label>
        </div>
      </div>
    </div>
  );
};

export default AgentChatModal;