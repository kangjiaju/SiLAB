import React, { useState } from 'react';
import { Timeline, TimelineEvent } from './Timeline';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

interface ExperimentNode {
  id: string;
  type: 'agent' | 'scenario' | 'flow';
  title: string;
  description: string;
  timestamp: string;
  details: any;
}

const ExperimentRecord: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  // 模拟实验记录数据
  const experimentNodes: ExperimentNode[] = [
    {
      id: '1',
      type: 'agent',
      title: '智能体创建',
      description: '创建了学生和教师智能体',
      timestamp: '2024-10-08 09:00:00',
      details: {
        agents: [
          { id: 'A1', name: '学生1', attributes: { age: 20, major: '计算机科学' } },
          { id: 'T1', name: '教师1', attributes: { age: 35, subject: '人工智能' } },
        ],
      },
    },
    {
      id: '2',
      type: 'scenario',
      title: '场景设置',
      description: '设置了课堂教学场景',
      timestamp: '2024-10-08 09:15:00',
      details: {
        environment: '虚拟课堂',
        participants: 30,
        duration: '45分钟',
      },
    },
    {
      id: '3',
      type: 'flow',
      title: '实验流程定义',
      description: '定义了教学互动流程',
      timestamp: '2024-10-08 09:30:00',
      details: {
        steps: [
          { name: '课程介绍', duration: '5分钟' },
          { name: '知识讲解', duration: '20分钟' },
          { name: '学生提问', duration: '10分钟' },
          { name: '总结反馈', duration: '10分钟' },
        ],
      },
    },
    // ... 可以添加更多节点
  ];

  const toggleNodeExpansion = (nodeId: string) => {
    setExpandedNodes(prev =>
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const renderNodeDetails = (node: ExperimentNode) => {
    switch (node.type) {
      case 'agent':
        return (
          <div>
            <h4 className="font-semibold">智能体列表：</h4>
            <ul>
              {node.details.agents.map((agent: any) => (
                <li key={agent.id}>
                  {agent.name} - 年龄: {agent.attributes.age}, 
                  {agent.attributes.major ? `专业: ${agent.attributes.major}` : `科目: ${agent.attributes.subject}`}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'scenario':
        return (
          <div>
            <p><strong>环境：</strong> {node.details.environment}</p>
            <p><strong>参与者数量：</strong> {node.details.participants}</p>
            <p><strong>持续时间：</strong> {node.details.duration}</p>
          </div>
        );
      case 'flow':
        return (
          <div>
            <h4 className="font-semibold">实验步骤：</h4>
            <ul>
              {node.details.steps.map((step: any, index: number) => (
                <li key={index}>{step.name} - {step.duration}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">实验记录</h2>
      <Timeline>
        {experimentNodes.map((node) => (
          <TimelineEvent
            key={node.id}
            title={node.title}
            description={node.description}
            timestamp={node.timestamp}
          >
            <div className="mt-2">
              <button
                onClick={() => toggleNodeExpansion(node.id)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                {expandedNodes.includes(node.id) ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    收起详情
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    查看详情
                  </>
                )}
              </button>
              {expandedNodes.includes(node.id) && (
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  {renderNodeDetails(node)}
                </div>
              )}
            </div>
          </TimelineEvent>
        ))}
      </Timeline>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center">
        <Download className="h-5 w-5 mr-2" />
        导出实验记录
      </button>
    </div>
  );
};

export default ExperimentRecord;