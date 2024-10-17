import React, { useState } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
}

const initialTemplates: Template[] = [
  {
    id: '1',
    name: '囚徒困境',
    description: '经典的博弈论实验模板',
    content: '两个嫌疑犯被分开审讯，每个人都面临背叛或合作的选择...'
  },
  {
    id: '2',
    name: '公共物品博弈',
    description: '研究群体合作行为的实验模板',
    content: '参与者需要决定是否为公共物品做出贡献...'
  },
  {
    id: '3',
    name: '独裁者博弈',
    description: '研究利他行为和公平偏好的实验模板',
    content: '一个参与者（独裁者）决定如何分配一笔钱...'
  }
];

const TemplateLibrary: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState<Template>({ id: '', name: '', description: '', content: '' });

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleAddTemplate = () => {
    if (newTemplate.name && newTemplate.description && newTemplate.content) {
      setTemplates([...templates, { ...newTemplate, id: Date.now().toString() }]);
      setNewTemplate({ id: '', name: '', description: '', content: '' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">范式库</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2">模板列表</h3>
          <ul>
            {templates.map((template) => (
              <li
                key={template.id}
                className="cursor-pointer p-2 hover:bg-gray-100"
                onClick={() => handleSelectTemplate(template)}
              >
                {template.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">模板详情</h3>
          {selectedTemplate ? (
            <div>
              <h4 className="font-bold">{selectedTemplate.name}</h4>
              <p className="text-gray-600 mb-2">{selectedTemplate.description}</p>
              <pre className="bg-gray-100 p-2 rounded">{selectedTemplate.content}</pre>
            </div>
          ) : (
            <p>请选择一个模板查看详情</p>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">添加新模板</h3>
        <input
          type="text"
          placeholder="模板名称"
          value={newTemplate.name}
          onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="模板描述"
          value={newTemplate.description}
          onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="模板内容"
          value={newTemplate.content}
          onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
          className="border p-2 mb-2 w-full h-32"
        />
        <button
          onClick={handleAddTemplate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          添加模板
        </button>
      </div>
    </div>
  );
};

export default TemplateLibrary;