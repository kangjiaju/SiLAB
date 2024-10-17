import React, { useState } from 'react';

interface ScenarioField {
  name: string;
  type: 'text' | 'number' | 'select';
  options?: string[];
}

const defaultFields: ScenarioField[] = [
  { name: '场景名称', type: 'text' },
  { name: '参与者数量', type: 'number' },
  { name: '实验持续时间', type: 'text' },
  { name: '环境类型', type: 'select', options: ['室内', '室外', '虚拟'] },
];

const ScenarioBuilder: React.FC = () => {
  const [fields, setFields] = useState<ScenarioField[]>(defaultFields);
  const [scenarioData, setScenarioData] = useState<Record<string, string>>({});
  const [newField, setNewField] = useState<ScenarioField>({ name: '', type: 'text' });

  const handleInputChange = (fieldName: string, value: string) => {
    setScenarioData({ ...scenarioData, [fieldName]: value });
  };

  const handleAddField = () => {
    if (newField.name) {
      setFields([...fields, newField]);
      setNewField({ name: '', type: 'text' });
    }
  };

  const handleSaveScenario = () => {
    console.log('保存场景:', scenarioData);
    // 这里可以添加保存场景到后端的逻辑
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">场景构建</h2>
      <div className="mb-4">
        {fields.map((field) => (
          <div key={field.name} className="mb-2">
            <label className="block text-sm font-medium text-gray-700">{field.name}</label>
            {field.type === 'select' ? (
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={scenarioData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              >
                <option value="">请选择</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={scenarioData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">添加自定义字段</h3>
        <input
          type="text"
          placeholder="字段名称"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={newField.name}
          onChange={(e) => setNewField({ ...newField, name: e.target.value })}
        />
        <select
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={newField.type}
          onChange={(e) => setNewField({ ...newField, type: e.target.value as 'text' | 'number' | 'select' })}
        >
          <option value="text">文本</option>
          <option value="number">数字</option>
          <option value="select">选择</option>
        </select>
        <button
          className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleAddField}
        >
          添加字段
        </button>
      </div>
      <button
        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        onClick={handleSaveScenario}
      >
        保存场景
      </button>
    </div>
  );
};

export default ScenarioBuilder;