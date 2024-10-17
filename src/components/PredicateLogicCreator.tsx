import React, { useState } from 'react';

interface PredicateLogicCreatorProps {
  onCreateAgents: (agents: any[]) => void;
}

const PredicateLogicCreator: React.FC<PredicateLogicCreatorProps> = ({ onCreateAgents }) => {
  const [predicateInput, setPredicateInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const agents = parsePredicateLogic(predicateInput);
    onCreateAgents(agents);
    setPredicateInput('');
  };

  const parsePredicateLogic = (input: string) => {
    // 这里是一个简单的解析逻辑，您可能需要根据实际需求进行调整
    const agents: any[] = [];

    const lines = input.split('\n');
    lines.forEach(line => {
      if (line.startsWith('Agent(')) {
        const match = line.match(/Agent\((\w+),\s*{(.*)}\)/);
        if (match) {
          const [, id, attributes] = match;
          agents.push({ 
            id, 
            name: id,
            x: Math.random() * 500,
            y: Math.random() * 500,
            type: 'normal',
            attributes: attributes.split(',').map(attr => attr.trim()) 
          });
        }
      }
    });

    return agents;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">谓词逻辑创建器</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={predicateInput}
          onChange={(e) => setPredicateInput(e.target.value)}
          className="w-full h-40 p-2 border rounded-md mb-4"
          placeholder="输入谓词逻辑，例如：
Agent(A, {student, age:20})
Agent(B, {teacher, subject:math})"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          创建智能体
        </button>
      </form>
    </div>
  );
};

export default PredicateLogicCreator;