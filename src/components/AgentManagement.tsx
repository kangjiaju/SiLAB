import React, { useState, useEffect } from 'react';
import { Plus, X, Edit, Copy, Search, Tag, Link, Code, Download, Upload, Play } from 'lucide-react';
import ForceGraph2D from 'react-force-graph-2d';
import agentTemplatesData from '../data/agentTemplates.json';

interface Attribute {
  key: string;
  value: string;
}

interface Relation {
  fromAgentId: string;
  toAgentId: string;
  type: string;
}

interface BehaviorRule {
  id: string;
  condition: string;
  action: string;
}

interface Agent {
  id: string;
  name: string;
  background: string;
  attributes: Attribute[];
  tags: string[];
  behaviorRules: BehaviorRule[];
}

const AgentManagement: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [relations, setRelations] = useState<Relation[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAddingRelation, setIsAddingRelation] = useState(false);
  const [newRelation, setNewRelation] = useState<Relation>({ fromAgentId: '', toAgentId: '', type: '' });
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [isBatchEditing, setIsBatchEditing] = useState(false);
  const [batchEditField, setBatchEditField] = useState<string>('');
  const [batchEditValue, setBatchEditValue] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Agent | null>(null);

  useEffect(() => {
    // 从JSON文件加载模板
    const templates = agentTemplatesData.templates;
    setAgents(templates.map(template => ({
      ...template,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    })));
  }, []);

  const handleAddAgent = (template: Agent) => {
    const newAgent: Agent = {
      ...template,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setAgents([...agents, newAgent]);
  };

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsEditing(true);
  };

  const handleSaveAgent = (updatedAgent: Agent) => {
    setAgents(agents.map(a => a.id === updatedAgent.id ? updatedAgent : a));
    setSelectedAgent(null);
    setIsEditing(false);
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter(a => a.id !== id));
    setRelations(relations.filter(r => r.fromAgentId !== id && r.toAgentId !== id));
  };

  const handleDuplicateAgent = (agent: Agent) => {
    const newAgent = { ...agent, id: Date.now().toString(), name: `${agent.name} (副本)` };
    setAgents([...agents, newAgent]);
  };

  const handleAddRelation = () => {
    if (newRelation.fromAgentId && newRelation.toAgentId && newRelation.type) {
      setRelations([...relations, newRelation]);
      setNewRelation({ fromAgentId: '', toAgentId: '', type: '' });
      setIsAddingRelation(false);
    }
  };

  const handleDeleteRelation = (index: number) => {
    setRelations(relations.filter((_, i) => i !== index));
  };

  const filteredAgents = agents.filter(agent => 
    (agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.background.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.attributes.some(attr => 
      attr.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attr.value.toLowerCase().includes(searchTerm.toLowerCase())
    )) &&
    (selectedTags.length === 0 || selectedTags.every(tag => agent.tags.includes(tag)))
  );

  const allTags = Array.from(new Set(agents.flatMap(agent => agent.tags)));

  const handleBatchEdit = () => {
    if (batchEditField && batchEditValue) {
      setAgents(agents.map(agent => {
        if (selectedAgents.includes(agent.id)) {
          if (batchEditField === 'tag') {
            return { ...agent, tags: [...agent.tags, batchEditValue] };
          } else {
            return {
              ...agent,
              attributes: [
                ...agent.attributes,
                { key: batchEditField, value: batchEditValue }
              ]
            };
          }
        }
        return agent;
      }));
      setSelectedAgents([]);
      setIsBatchEditing(false);
      setBatchEditField('');
      setBatchEditValue('');
    }
  };

  const handleExport = () => {
    const data = JSON.stringify({ agents, relations }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'agent_configuration.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const importedData = JSON.parse(content);
          setAgents(importedData.agents || []);
          setRelations(importedData.relations || []);
        } catch (error) {
          console.error('导入文件解析错误:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    // 在这里实现实际的模拟逻辑
    setTimeout(() => {
      setIsSimulating(false);
      alert('模拟完成！');
    }, 3000);
  };

  const graphData = {
    nodes: agents.map(agent => ({ id: agent.id, name: agent.name })),
    links: relations.map(relation => ({
      source: relation.fromAgentId,
      target: relation.toAgentId,
      type: relation.type
    }))
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">智能体管理</h2>
      
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="搜索智能体..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <select
          multiple
          value={selectedTags}
          onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, option => option.value))}
          className="p-2 border rounded"
        >
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => setIsBatchEditing(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          批量编辑
        </button>
        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
        >
          <Download className="mr-2" size={16} />
          导出配置
        </button>
        <label className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center cursor-pointer">
          <Upload className="mr-2" size={16} />
          导入配置
          <input type="file" onChange={handleImport} className="hidden" accept=".json" />
        </label>
        <button
          onClick={handleSimulate}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center"
          disabled={isSimulating}
        >
          <Play className="mr-2" size={16} />
          {isSimulating ? '模拟中...' : '开始模拟'}
        </button>
      </div>

      {isBatchEditing && (
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-bold mb-2">批量编辑</h3>
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="字段名称"
              value={batchEditField}
              onChange={(e) => setBatchEditField(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="字段值"
              value={batchEditValue}
              onChange={(e) => setBatchEditValue(e.target.value)}
              className="p-2 border rounded"
            />
            <button
              onClick={handleBatchEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              应用
            </button>
          </div>
          <div>
            已选择的智能体: {selectedAgents.length}
          </div>
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-bold mb-2">智能体模板</h3>
        <select
          onChange={(e) => setSelectedTemplate(agentTemplatesData.templates.find(t => t.id === e.target.value) || null)}
          className="p-2 border rounded w-full"
        >
          <option value="">选择模板</option>
          {agentTemplatesData.templates.map((template) => (
            <option key={template.id} value={template.id}>{template.name}</option>
          ))}
        </select>
        {selectedTemplate && (
          <div className="mt-2 border p-4 rounded shadow">
            <h3 className="font-bold">{selectedTemplate.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{selectedTemplate.background}</p>
            <div className="mb-2">
              {selectedTemplate.tags.map(tag => (
                <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleAddAgent(selectedTemplate)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <Plus className="inline-block mr-2" size={16} />
              添加此模板
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {filteredAgents.map(agent => (
          <div key={agent.id} className="border p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{agent.name}</h3>
              <div className="space-x-2">
                <input
                  type="checkbox"
                  checked={selectedAgents.includes(agent.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAgents([...selectedAgents, agent.id]);
                    } else {
                      setSelectedAgents(selectedAgents.filter(id => id !== agent.id));
                    }
                  }}
                  className="mr-2"
                />
                <button onClick={() => handleEditAgent(agent)} className="text-blue-500 hover:text-blue-700">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDuplicateAgent(agent)} className="text-green-500 hover:text-green-700">
                  <Copy size={16} />
                </button>
                <button onClick={() => handleDeleteAgent(agent.id)} className="text-red-500 hover:text-red-700">
                  <X size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{agent.background}</p>
            <div className="mb-2">
              {agent.tags.map(tag => (
                <span key={tag} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {tag}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {agent.attributes.map((attr, index) => (
                <div key={index} className="text-sm">
                  <span className="font-semibold">{attr.key}:</span> {attr.value}
                </div>
              ))}
            </div>
            <div className="mb-2">
              <h4 className="font-semibold">行为规则:</h4>
              {agent.behaviorRules.map((rule, index) => (
                <div key={index} className="text-sm">
                  <span className="font-semibold">如果 {rule.condition}，那么 {rule.action}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">智能体关系</h3>
        {relations.map((relation, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <span>{agents.find(a => a.id === relation.fromAgentId)?.name}</span>
            <span>-</span>
            <span>{relation.type}</span>
            <span>-&gt;</span>
            <span>{agents.find(a => a.id === relation.toAgentId)?.name}</span>
            <button onClick={() => handleDeleteRelation(index)} className="text-red-500 hover:text-red-700">
              <X size={16} />
            </button>
          </div>
        ))}
        {isAddingRelation ? (
          <div className="flex items-center space-x-2 mb-2">
            <select
              value={newRelation.fromAgentId}
              onChange={(e) => setNewRelation({...newRelation, fromAgentId: e.target.value})}
              className="p-2 border rounded"
            >
              <option value="">选择智能体</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="关系类型"
              value={newRelation.type}
              onChange={(e) => setNewRelation({...newRelation, type: e.target.value})}
              className="p-2 border rounded"
            />
            <select
              value={newRelation.toAgentId}
              onChange={(e) => setNewRelation({...newRelation, toAgentId: e.target.value})}
              className="p-2 border rounded"
            >
              <option value="">选择智能体</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
            </select>
            <button onClick={handleAddRelation} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              添加
            </button>
            <button onClick={() => setIsAddingRelation(false)} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
              取消
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingRelation(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <Plus className="inline-block mr-2" size={16} />
            添加关系
          </button>
        )}
      </div>

      <div className="mt-8 border p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">智能体关系图</h3>
        <div style={{ width: '100%', height: '400px' }}>
          <ForceGraph2D
            graphData={graphData}
            nodeLabel="name"
            linkLabel="type"
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.name;
              const fontSize = 12/globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = 'black';
              ctx.fillText(label, node.x, node.y);
            }}
          />
        </div>
      </div>

      {isEditing && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-3/4 max-h-3/4 overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">编辑智能体</h3>
            <input
              type="text"
              value={selectedAgent.name}
              onChange={(e) => setSelectedAgent({ ...selectedAgent, name: e.target.value })}
              className="w-full p-2 border rounded mb-2"
              placeholder="智能体名称"
            />
            <textarea
              value={selectedAgent.background}
              onChange={(e) => setSelectedAgent({ ...selectedAgent, background: e.target.value })}
              className="w-full p-2 border rounded mb-2"
              placeholder="背景信息"
              rows={3}
            />
            <div className="mb-2">
              <h4 className="font-semibold mb-1">标签</h4>
              <input
                type="text"
                value={selectedAgent.tags.join(', ')}
                onChange={(e) => setSelectedAgent({ ...selectedAgent, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                className="w-full p-2 border rounded"
                placeholder="用逗号分隔标签"
              />
            </div>
            <h4 className="font-semibold mb-1">属性</h4>
            {selectedAgent.attributes.map((attr, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={attr.key}
                  onChange={(e) => {
                    const newAttributes = [...selectedAgent.attributes];
                    newAttributes[index].key = e.target.value;
                    setSelectedAgent({ ...selectedAgent, attributes: newAttributes });
                  }}
                  className="w-1/2 p-2 border rounded-l"
                  placeholder="属性名"
                />
                <input
                  type="text"
                  value={attr.value}
                  onChange={(e) => {
                    const newAttributes = [...selectedAgent.attributes];
                    newAttributes[index].value = e.target.value;
                    setSelectedAgent({ ...selectedAgent, attributes: newAttributes });
                  }}
                  className="w-1/2 p-2 border rounded-r"
                  placeholder="属性值"
                />
              </div>
            ))}
            <button
              onClick={() => setSelectedAgent({
                ...selectedAgent,
                attributes: [...selectedAgent.attributes, { key: '', value: '' }]
              })}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-2"
            >
              添加属性
            </button>
            <h4 className="font-semibold mb-1">行为规则</h4>
            {selectedAgent.behaviorRules.map((rule, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={rule.condition}
                  onChange={(e) => {
                    const newRules = [...selectedAgent.behaviorRules];
                    newRules[index].condition = e.target.value;
                    setSelectedAgent({ ...selectedAgent, behaviorRules: newRules });
                  }}
                  className="w-1/3 p-2 border rounded-l"
                  placeholder="条件"
                />
                <select
                  value={rule.condition.split(' ')[0]}
                  onChange={(e) => {
                    const newRules = [...selectedAgent.behaviorRules];
                    newRules[index].condition = `${e.target.value} ${rule.condition.split(' ').slice(1).join(' ')}`;
                    setSelectedAgent({ ...selectedAgent, behaviorRules: newRules });
                  }}
                  className="w-1/3 p-2 border"
                >
                  <option value="如果">如果</option>
                  <option value="并且">并且</option>
                  <option value="或者">或者</option>
                </select>
                <input
                  type="text"
                  value={rule.action}
                  onChange={(e) => {
                    const newRules = [...selectedAgent.behaviorRules];
                    newRules[index].action = e.target.value;
                    setSelectedAgent({ ...selectedAgent, behaviorRules: newRules });
                  }}
                  className="w-1/3 p-2 border rounded-r"
                  placeholder="行动"
                />
              </div>
            ))}
            <button
              onClick={() => setSelectedAgent({
                ...selectedAgent,
                behaviorRules: [...selectedAgent.behaviorRules, { id: Date.now().toString(), condition: '如果 ', action: '' }]
              })}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-2"
            >
              添加行为规则
            </button>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setSelectedAgent(null);
                  setIsEditing(false);
                }}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                取消
              </button>
              <button
                onClick={() => handleSaveAgent(selectedAgent)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentManagement;