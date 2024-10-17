import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  ZoomIn,
  ZoomOut,
  Move,
  Code,
  Users,
  MessageCircle,
  UserPlus,
} from 'lucide-react';
import PredicateLogicCreator from './PredicateLogicCreator';
import AgentEditModal from './AgentEditModal';
import AgentChatModal from './AgentChatModal';
import AgentInteractionModal from './AgentInteractionModal';
import RightSidebar from './RightSidebar';

interface Agent {
  id: string;
  x: number;
  y: number;
  name: string;
  type: 'normal' | 'moderator' | 'representative';
}

const DraggablePanel: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showPredicateLogicModal, setShowPredicateLogicModal] = useState(false);
  const [showAgentEditModal, setShowAgentEditModal] = useState(false);
  const [showAgentChatModal, setShowAgentChatModal] = useState(false);
  const [showAgentInteractionModal, setShowAgentInteractionModal] =
    useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [interactionType, setInteractionType] = useState<
    'dialogue' | 'discussion' | 'congress' | null
  >(null);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const panelRef = useRef<HTMLDivElement>(null);

  const addAgent = () => {
    const newAgent: Agent = {
      id: `agent-${agents.length + 1}`,
      x: Math.random() * 500,
      y: Math.random() * 500,
      name: `Agent ${agents.length + 1}`,
      type: 'normal',
    };
    setAgents([...agents, newAgent]);
  };

  const zoomIn = () => setScale((scale) => Math.min(scale + 0.1, 2));
  const zoomOut = () => setScale((scale) => Math.max(scale - 0.1, 0.5));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && panelRef.current) {
      const dx = e.clientX - panelRef.current.offsetLeft;
      const dy = e.clientY - panelRef.current.offsetTop;
      setOffset({ x: offset.x + dx, y: offset.y + dy });
    }
  };

  const handleCreateAgents = (newAgents: Agent[]) => {
    setAgents([...agents, ...newAgents]);
  };

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowAgentEditModal(true);
  };

  const handleAgentEdit = (editedAgent: Agent) => {
    setAgents(agents.map((a) => (a.id === editedAgent.id ? editedAgent : a)));
    setShowAgentEditModal(false);
  };

  const handleAgentChat = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowAgentChatModal(true);
  };

  const handleInteraction = (type: 'dialogue' | 'discussion' | 'congress') => {
    setInteractionType(type);
    setShowAgentInteractionModal(true);
  };

  return (
    <div
      className="flex-1 bg-gray-900 overflow-hidden relative h-full"
      ref={panelRef}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <button
          onClick={addAgent}
          className="bg-indigo-600 text-white p-1 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          title="添加智能体"
        >
          <Plus size={24} />
        </button>
        <button
          onClick={zoomIn}
          className="bg-indigo-600 text-white p-1 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          title="放大"
        >
          <ZoomIn size={24} />
        </button>
        <button
          onClick={zoomOut}
          className="bg-indigo-600 text-white p-1 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          title="缩小"
        >
          <ZoomOut size={24} />
        </button>
        <button
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="bg-indigo-600 text-white p-1 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          title="移动"
        >
          <Move size={24} />
        </button>
        <button
          onClick={() => setShowPredicateLogicModal(true)}
          className="bg-indigo-600 text-white p-1 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          title="谓词逻辑创建器"
        >
          <Code size={24} />
        </button>
        <button
          onClick={() => handleInteraction('dialogue')}
          className="bg-indigo-600 text-white p-1 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          title="对谈"
        >
          <MessageCircle size={24} />
        </button>
        <button
          onClick={() => handleInteraction('discussion')}
          className="bg-indigo-600 text-white p-1 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          title="讨论组"
        >
          <Users size={24} />
        </button>
        <button
          onClick={() => handleInteraction('congress')}
          className="bg-indigo-600 text-white p-1 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
          title="代表大会"
        >
          <UserPlus size={24} />
        </button>
      </div>

      <motion.div
        className="w-full h-full"
        style={{
          backgroundImage:
            'linear-gradient(#4a5568 1px, transparent 1px), linear-gradient(90deg, #4a5568 1px, transparent 1px)',
          backgroundSize: `${20 * scale}px ${20 * scale}px`,
          transform: `scale(${scale}) translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            className="absolute bg-gray-800 text-white p-1.5 rounded shadow cursor-pointer"
            style={{ x: agent.x, y: agent.y }}
            drag
            dragMomentum={false}
            onDoubleClick={() => handleAgentClick(agent)}
          >
            <div>{agent.name}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAgentChat(agent);
              }}
              className="mt-1 text-xs bg-indigo-600 text-white p-1.5 py-1 rounded hover:bg-indigo-700"
            >
              聊天
            </button>
          </motion.div>
        ))}
      </motion.div>

      {showPredicateLogicModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white rounded-lg p-6 w-3/4 max-w-2xl">
            <PredicateLogicCreator onCreateAgents={handleCreateAgents} />
            <button
              onClick={() => setShowPredicateLogicModal(false)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              关闭
            </button>
          </div>
        </div>
      )}

      {showAgentEditModal && selectedAgent && (
        <AgentEditModal
          agent={selectedAgent}
          onSave={handleAgentEdit}
          onClose={() => setShowAgentEditModal(false)}
        />
      )}

      {showAgentChatModal && selectedAgent && (
        <AgentChatModal
          agent={selectedAgent}
          onClose={() => setShowAgentChatModal(false)}
        />
      )}

      {showAgentInteractionModal && (
        <AgentInteractionModal
          agents={agents}
          interactionType={interactionType!}
          onClose={() => setShowAgentInteractionModal(false)}
          onComplete={(result) => {
            console.log('Interaction result:', result);
            setShowAgentInteractionModal(false);
          }}
        />
      )}

      <RightSidebar
        isOpen={isRightSidebarOpen}
        onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
      />
    </div>
  );
};

export default DraggablePanel;
