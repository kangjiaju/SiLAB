import React, { useState } from 'react';

interface SystemSettingsProps {}

const SystemSettings: React.FC<SystemSettingsProps> = () => {
  const [settings, setSettings] = useState({
    apiKey: '',
    modelName: 'gpt-3.5-turbo',
    maxTokens: 2048,
    temperature: 0.7,
    agentApiLimit: 1000,
    experimentTimeout: 3600,
    dataRetentionDays: 30,
    loggingLevel: 'info',
    enableDebugMode: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里可以添加保存设置的逻辑
    console.log('Settings saved:', settings);
    // 可以调用API或更新全局状态
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">系统设置</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">API Key</label>
            <input
              type="password"
              name="apiKey"
              value={settings.apiKey}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">模型名称</label>
            <select
              name="modelName"
              value={settings.modelName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="gpt-3.5-turbo">GPT-3.5-Turbo</option>
              <option value="gpt-4">GPT-4</option>
              <option value="claude-v1">Claude v1</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">最大Token数</label>
            <input
              type="number"
              name="maxTokens"
              value={settings.maxTokens}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">温度</label>
            <input
              type="number"
              name="temperature"
              value={settings.temperature}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="1"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">每个智能体API调用限制</label>
            <input
              type="number"
              name="agentApiLimit"
              value={settings.agentApiLimit}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">实验超时时间（秒）</label>
            <input
              type="number"
              name="experimentTimeout"
              value={settings.experimentTimeout}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">数据保留天数</label>
            <input
              type="number"
              name="dataRetentionDays"
              value={settings.dataRetentionDays}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">日志级别</label>
            <select
              name="loggingLevel"
              value={settings.loggingLevel}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="error">Error</option>
              <option value="warn">Warn</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="enableDebugMode"
              checked={settings.enableDebugMode}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              启用调试模式
            </label>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            保存设置
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettings;