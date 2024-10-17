import React, { useState, useRef } from 'react';
import { Send, Upload, Edit2, Save, Play, Plus, Trash2, ArrowDown, ArrowUp, RotateCcw } from 'lucide-react';

interface ExperimentStep {
  id: string;
  name: string;
  description: string;
  duration: string;
  type: 'sequential' | 'parallel' | 'loop';
  children?: ExperimentStep[];
}

interface ExperimentPlan {
  agents: Array<{
    id: string;
    name: string;
    background: string;
    attributes: Record<string, string>;
  }>;
  scenario: {
    name: string;
    description: string;
    environment: string;
  };
  experimentFlow: ExperimentStep[];
}

const ExperimentPlanner: React.FC = () => {
  const [experimentDescription, setExperimentDescription] = useState('');
  const [experimentPlan, setExperimentPlan] = useState<ExperimentPlan | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateExperimentPlan = () => {
    // 这里应该是调用后端API或大语言模型来生成实验计划
    // 现在我们用一个模拟的计划来演示
    const mockPlan: ExperimentPlan = {
      agents: [
        {
          id: "1",
          name: "学生A",
          background: "大学二年级学生，主修计算机科学",
          attributes: { "知识水平": "中等", "学习动机": "高" }
        },
        {
          id: "2",
          name: "教师B",
          background: "有10年教学经验的计算机科学教授",
          attributes: { "教学经验": "丰富", "专业知识": "精通" }
        }
      ],
      scenario: {
        name: "在线编程课堂",
        description: "模拟一个在线编程教学环境，探索不同教学方法的效果",
        environment: "虚拟在线教室"
      },
      experimentFlow: [
        {
          id: "1",
          name: "课程介绍",
          description: "教师介绍课程内容和目标",
          duration: "10分钟",
          type: "sequential"
        },
        {
          id: "2",
          name: "知识讲解",
          description: "教师讲解关键概念和编程技巧",
          duration: "30分钟",
          type: "sequential"
        },
        {
          id: "3",
          name: "实践练习",
          description: "学生进行编程练习，教师提供指导",
          duration: "40分钟",
          type: "parallel",
          children: [
            {
              id: "3.1",
              name: "个人练习",
              description: "学生独立完成编程任务",
              duration: "20分钟",
              type: "sequential"
            },
            {
              id: "3.2",
              name: "小组讨论",
              description: "学生分组讨论解决方案",
              duration: "20分钟",
              type: "sequential"
            }
          ]
        },
        {
          id: "4",
          name: "总结反馈",
          description: "讨论练习结果，教师提供反馈",
          duration: "20分钟",
          type: "sequential"
        }
      ]
    };

    setExperimentPlan(mockPlan);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 这里应该处理文件上传逻辑
      console.log('File uploaded:', file.name);
      // 模拟文件上传后生成实验计划
      generateExperimentPlan();
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // 这里应该保存修改后的实验计划
    console.log('Saving updated experiment plan:', experimentPlan);
  };

  const handleDeploy = () => {
    // 这里应该实现自动部署逻辑
    console.log('Deploying experiment plan:', experimentPlan);
  };

  const renderEditableField = (value: string, onChange: (value: string) => void) => {
    return isEditing ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-1 border rounded"
      />
    ) : (
      <span>{value}</span>
    );
  };

  const addAgent = () => {
    if (experimentPlan) {
      const newAgent = {
        id: Date.now().toString(),
        name: "新智能体",
        background: "请输入背景信息",
        attributes: {}
      };
      setExperimentPlan({
        ...experimentPlan,
        agents: [...experimentPlan.agents, newAgent]
      });
    }
  };

  const removeAgent = (id: string) => {
    if (experimentPlan) {
      setExperimentPlan({
        ...experimentPlan,
        agents: experimentPlan.agents.filter(agent => agent.id !== id)
      });
    }
  };

  const addExperimentStep = (parentId: string | null = null) => {
    if (experimentPlan) {
      const newStep: ExperimentStep = {
        id: Date.now().toString(),
        name: "新步骤",
        description: "请输入步骤描述",
        duration: "0分钟",
        type: "sequential"
      };

      const addStepToFlow = (steps: ExperimentStep[]): ExperimentStep[] => {
        return steps.map(step => {
          if (step.id === parentId) {
            return {
              ...step,
              children: [...(step.children || []), newStep]
            };
          } else if (step.children) {
            return {
              ...step,
              children: addStepToFlow(step.children)
            };
          }
          return step;
        });
      };

      if (parentId) {
        setExperimentPlan({
          ...experimentPlan,
          experimentFlow: addStepToFlow(experimentPlan.experimentFlow)
        });
      } else {
        setExperimentPlan({
          ...experimentPlan,
          experimentFlow: [...experimentPlan.experimentFlow, newStep]
        });
      }
    }
  };

  const removeExperimentStep = (id: string) => {
    if (experimentPlan) {
      const removeStepFromFlow = (steps: ExperimentStep[]): ExperimentStep[] => {
        return steps.filter(step => {
          if (step.id === id) {
            return false;
          }
          if (step.children) {
            step.children = removeStepFromFlow(step.children);
          }
          return true;
        });
      };

      setExperimentPlan({
        ...experimentPlan,
        experimentFlow: removeStepFromFlow(experimentPlan.experimentFlow)
      });
    }
  };

  const renderExperimentStep = (step: ExperimentStep, depth: number = 0) => {
    return (
      <div key={step.id} className={`mb-2 p-2 border rounded ${depth > 0 ? 'ml-4' : ''}`}>
        <div className="flex justify-between items-center mb-2">
          <strong>{renderEditableField(step.name, (value) => {
            const updateStepInFlow = (steps: ExperimentStep[]): ExperimentStep[] => {
              return steps.map(s => {
                if (s.id === step.id) {
                  return { ...s, name: value };
                }
                if (s.children) {
                  return { ...s, children: updateStepInFlow(s.children) };
                }
                return s;
              });
            };
            setExperimentPlan(prev => prev ? {
              ...prev,
              experimentFlow: updateStepInFlow(prev.experimentFlow)
            } : null);
          })}</strong>
          <div className="flex items-center space-x-2">
            <select
                value={step.type}
                onChange={(e) => {
                  const updateStepInFlow = (steps: ExperimentStep[]): ExperimentStep[] => {
                    return steps.map(s => {
                      if (s.id === step.id) {
                        return { ...s, type: e.target.value as 'sequential' | 'parallel' | 'loop' };
                      }
                      if (s.children) {
                        return { ...s, children: updateStepInFlow(s.children) };
                      }
                      return s;
                    });
                  };
                  setExperimentPlan(prev => prev ? {
                    ...prev,
                    experimentFlow: updateStepInFlow(prev.experimentFlow)
                  } : null);
                }}
                className="appearance-none bg-white border rounded p-1 pr-8 cursor-pointer"
              >
                <option value="sequential">顺序</option>
                <option value="parallel">并行</option>
                <option value="loop">循环</option>
              </select>
            <button onClick={() => addExperimentStep(step.id)} className="text-green-500">
              <Plus size={16} />
            </button>
            <button onClick={() => removeExperimentStep(step.id)} className="text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        <div>{renderEditableField(step.description, (value) => {
          const updateStepInFlow = (steps: ExperimentStep[]): ExperimentStep[] => {
            return steps.map(s => {
              if (s.id === step.id) {
                return { ...s, description: value };
              }
              if (s.children) {
                return { ...s, children: updateStepInFlow(s.children) };
              }
              return s;
            });
          };
          setExperimentPlan(prev => prev ? {
            ...prev,
            experimentFlow: updateStepInFlow(prev.experimentFlow)
          } : null);
        })}</div>
        <div>持续时间: {renderEditableField(step.duration, (value) => {
          const updateStepInFlow = (steps: ExperimentStep[]): ExperimentStep[] => {
            return steps.map(s => {
              if (s.id === step.id) {
                return { ...s, duration: value };
              }
              if (s.children) {
                return { ...s, children: updateStepInFlow(s.children) };
              }
              return s;
            });
          };
          setExperimentPlan(prev => prev ? {
            ...prev,
            experimentFlow: updateStepInFlow(prev.experimentFlow)
          } : null);
        })}</div>
        {step.children && step.children.map(childStep => renderExperimentStep(childStep, depth + 1))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">实验规划器</h2>
      <div className="mb-4">
        <textarea
          className="w-full h-40 p-2 border rounded-md"
          placeholder="请输入实验的整体描述..."
          value={experimentDescription}
          onChange={(e) => setExperimentDescription(e.target.value)}
        />
      </div>
      <div className="flex space-x-2 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
          onClick={generateExperimentPlan}
        >
          <Send className="mr-2" size={16} />
          生成实验计划
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center"
          onClick={triggerFileUpload}
        >
          <Upload className="mr-2" size={16} />
          上传文件
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf,.txt,.doc,.docx"
          className="hidden"
        />
      </div>
      {experimentPlan && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">生成的实验计划</h3>
            <div className="flex space-x-2">
              {isEditing ? (
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center"
                  onClick={handleSave}
                >
                  <Save className="mr-1" size={16} />
                  保存
                </button>
              ) : (
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 flex items-center"
                  onClick={handleEdit}
                >
                  <Edit2 className="mr-1" size={16} />
                  编辑
                </button>
              )}
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center"
                onClick={handleDeploy}
              >
                <Play className="mr-1" size={16} />
                部署
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-3 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-lg">智能体：</h4>
                <button
                  onClick={addAgent}
                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  添加智能体
                </button>
              </div>
              {experimentPlan.agents.map((agent, index) => (
                <div key={agent.id} className="mb-2 p-2 border rounded">
                  <div className="flex justify-between items-center mb-2">
                    <strong>{renderEditableField(agent.name, (value) => {
                      const newAgents = [...experimentPlan.agents];
                      newAgents[index].name = value;
                      setExperimentPlan({...experimentPlan, agents: newAgents});
                    })}</strong>
                    <button
                      onClick={() => removeAgent(agent.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div>{renderEditableField(agent.background, (value) => {
                    const newAgents = [...experimentPlan.agents];
                    newAgents[index].background = value;
                    setExperimentPlan({...experimentPlan, agents: newAgents});
                  })}</div>
                  <div>
                    属性: {Object.entries(agent.attributes).map(([key, value], attrIndex) => (
                      <span key={attrIndex}>
                        {renderEditableField(key, (newKey) => {
                          const newAgents = [...experimentPlan.agents];
                          const newAttributes = {...newAgents[index].attributes};
                          delete newAttributes[key];
                          newAttributes[newKey] = value;
                          newAgents[index].attributes = newAttributes;
                          setExperimentPlan({...experimentPlan, agents: newAgents});
                        })}: {renderEditableField(value, (newValue) => {
                          const newAgents = [...experimentPlan.agents];
                          newAgents[index].attributes[key] = newValue;
                          setExperimentPlan({...experimentPlan, agents: newAgents});
                        })}{attrIndex < Object.entries(agent.attributes).length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h4 className="font-bold text-lg mb-2">实验场景：</h4>
              <p><strong>{renderEditableField(experimentPlan.scenario.name, (value) => {
                setExperimentPlan({...experimentPlan, scenario: {...experimentPlan.scenario, name: value}});
              })}</strong> - {renderEditableField(experimentPlan.scenario.description, (value) => {
                setExperimentPlan({...experimentPlan, scenario: {...experimentPlan.scenario, description: value}});
              })}</p>
              <p>环境: {renderEditableField(experimentPlan.scenario.environment, (value) => {
                setExperimentPlan({...experimentPlan, scenario: {...experimentPlan.scenario, environment: value}});
              })}</p>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-lg">实验流程：</h4>
                <button
                  onClick={() => addExperimentStep()}
                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  添加步骤
                </button>
              </div>
              {experimentPlan.experimentFlow.map(step => renderExperimentStep(step))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperimentPlanner;