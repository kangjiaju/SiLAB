import React from 'react';

const Help: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">帮助中心</h2>
      <div className="space-y-4">
        <section>
          <h3 className="text-xl font-semibold mb-2">快速入门</h3>
          <p>欢迎使用群智-SiLab多智能体虚拟实验室。以下是一些快速入门的步骤：</p>
          <ol className="list-decimal list-inside ml-4 mt-2">
            <li>创建智能体：使用智能体管理功能创建和配置您的智能体。</li>
            <li>构建场景：在场景构建中设置您的实验环境。</li>
            <li>设计实验流程：使用实验流程功能规划您的实验步骤。</li>
            <li>运行实验：启动实验并观察结果。</li>
            <li>分析数据：使用数据分析工具深入了解实验结果。</li>
          </ol>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">常见问题</h3>
          <ul className="list-disc list-inside ml-4">
            <li>如何重置实验？</li>
            <li>如何导出实验数据？</li>
            <li>如何自定义智能体行为？</li>
            <li>系统支持哪些类型的实验？</li>
          </ul>
        </section>
        <section>
          <h3 className="text-xl font-semibold mb-2">更多资源</h3>
          <p>查看我们的<a href="#" className="text-blue-600 hover:underline">在线文档</a>以获取更详细的信息和教程。</p>
        </section>
      </div>
    </div>
  );
};

export default Help;