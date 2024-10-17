import React, { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  type: 'normal' | 'moderator' | 'representative';
}

interface AgentInteractionModalProps {
  agents: Agent[];
  interactionType: 'dialogue' | 'discussion' | 'congress';
  onClose: () => void;
  onComplete: (result: string) => void;
}

const AgentInteractionModal: React.FC<AgentInteractionModalProps> = ({ agents, interactionType, onClose, onComplete }) => {
  const [currentSpeaker, setCurrentSpeaker] = useState<Agent | null>(null);
  const [discussion, setDiscussion] = useState<string[]>([]);
  const [votes, setVotes] = useState<Record<string, 'agree' | 'disagree'>>({});
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    // 选择一个主持人或第一个发言者
    const moderator = agents.find(agent => agent.type === 'moderator') || agents[0];
    setCurrentSpeaker(moderator);
  }, [agents]);

  const handleSpeak = (content: string) => {
    setDiscussion([...discussion, `${currentSpeaker?.name}: ${content}`]);
    // 选择下一个发言者
    const currentIndex = agents.findIndex(agent => agent.id === currentSpeaker?.id);
    const nextIndex = (currentIndex + 1) % agents.length;
    setCurrentSpeaker(agents[nextIndex]);
  };

  const handleVote = (agentId: string, vote: 'agree' | 'disagree') => {
    setVotes({ ...votes, [agentId]: vote });
  };

  const finishDiscussion = () => {
    const agreeVotes = Object.values(votes).filter(v => v === 'agree').length;
    const totalVotes = Object.values(votes).length;
    if (agreeVotes / totalVotes >= 2/3) {
      setResult('讨论结果已达成共识');
      onComplete('讨论结果已达成共识');
    } else {
      setResult('未达成共识，需要重新讨论');
      // 重置投票和讨论
      setVotes({});
      setDiscussion([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-3/4 max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">智能体交互 - {interactionType}</h2>
        <div className="mb-4 h-64 overflow-y-auto border p-2">
          {discussion.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
        <div className="mb-4">
          <p>当前发言者: {currentSpeaker?.name}</p>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="输入发言内容"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSpeak((e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>
        <div className="mb-4">
          <h3 className="font-bold">投票:</h3>
          {agents.map(agent => (
            <div key={agent.id} className="flex items-center space-x-2">
              <span>{agent.name}</span>
              <button
                onClick={() => handleVote(agent.id, 'agree')}
                className={`px-2 py-1 rounded ${votes[agent.id] === 'agree' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                同意
              </button>
              <button
                onClick={() => handleVote(agent.id, 'disagree')}
                className={`px-2 py-1 rounded ${votes[agent.id] === 'disagree' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
              >
                反对
              </button>
            </div>
          ))}
        </div>
        {result && <p className="mb-4 font-bold">{result}</p>}
        <div className="flex justify-end space-x-2">
          <button onClick={finishDiscussion} className="bg-blue-500 text-white px-4 py-2 rounded">
            结束讨论
          </button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentInteractionModal;