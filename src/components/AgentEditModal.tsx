import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: 'normal' | 'moderator' | 'representative';
  background?: string;
  attributes: Record<string, string>;
}

interface AgentEditModalProps {
  agent: Agent;
  onSave: (agent: Agent) => void;
  onClose: () => void;
}

const AgentEditModal: React.FC<AgentEditModalProps> = ({ agent, onSave, onClose }) => {
  const [editedAgent, setEditedAgent] = useState<Agent>({ ...agent });
  const [newAttributeKey, setNewAttributeKey] = useState('');
  const [newAttributeValue, setNewAttributeValue] = useState('');

  const handleSave = () => {
    onSave(editedAgent);
  };

  const handleAddAttribute = () => {
    if (newAttributeKey && newAttributeValue) {
      setEditedAgent({
        ...editedAgent,
        attributes: {
          ...editedAgent.attributes,
          [newAttributeKey]: newAttributeValue
        }
      });
      setNewAttributeKey('');
      setNewAttributeValue('');
    }
  };

  const handleRemoveAttribute = (key: string) => {
    const { [key]: _, ...remainingAttributes } = editedAgent.attributes;
    setEditedAgent({
      ...editedAgent,
      attributes: remainingAttributes
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">编辑智能体</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">名称</label>
            <input
              type="text"
              value={editedAgent.name}
              onChange={(e) => setEditedAgent({ ...editedAgent, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">类型</label>
            <select
              value={editedAgent.type}
              onChange={(e) => setEditedAgent({ ...editedAgent, type: e.target.value as Agent['type'] })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="normal">普通</option>
              <option value="moderator">主持人</option>
              <option value="representative">代表</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">背景</label>
            <textarea
              value={editedAgent.background || ''}
              onChange={(e) => setEditedAgent({ ...editedAgent, background: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">属性</label>
            {Object.entries(editedAgent.attributes).map(([key, value]) => (
              <div key={key} className="flex items-center mt-2">
                <input
                  type="text"
                  value={key}
                  readOnly
                  className="w-1/3 border border-gray-300 rounded-md shadow-sm p-2 mr-2"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setEditedAgent({
                    ...editedAgent,
                    attributes: { ...editedAgent.attributes, [key]: e.target.value }
                  })}
                  className="w-1/3 border border-gray-300 rounded-md shadow-sm p-2 mr-2"
                />
                <button
                  onClick={() => handleRemoveAttribute(key)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  删除
                </button>
              </div>
            ))}
            <div className="flex items-center mt-2">
              <input
                type="text"
                value={newAttributeKey}
                onChange={(e) => setNewAttributeKey(e.target.value)}
                placeholder="新属性名"
                className="w-1/3 border border-gray-300 rounded-md shadow-sm p-2 mr-2"
              />
              <input
                type="text"
                value={newAttributeValue}
                onChange={(e) => setNewAttributeValue(e.target.value)}
                placeholder="新属性值"
                className="w-1/3 border border-gray-300 rounded-md shadow-sm p-2 mr-2"
              />
              <button
                onClick={handleAddAttribute}
                className="bg-green-500 text-white px-2 py-1 rounded-md"
              >
                添加
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentEditModal;