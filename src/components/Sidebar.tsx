import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  FileText,
  GitBranch,
  BarChart2,
  BookOpen,
  History,
  Settings,
  HelpCircle,
  Mail,
  Brain,
  Cpu,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import AgentManagement from './AgentManagement';
import ScenarioBuilder from './ScenarioBuilder';
import ExperimentFlow from './ExperimentFlow';
import TemplateLibrary from './TemplateLibrary';
import DataVisualization from './DataVisualization';
import ExperimentRecord from './ExperimentRecord';
import SystemSettings from './SystemSettings';
import Help from './Help';
import ContactUs from './ContactUs';
import ExperimentPlanner from './ExperimentPlanner';

const Sidebar: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => setActiveModal(null);

  const menuItems = [
    { name: '实验规划器', icon: Cpu, modal: 'experimentPlanner' },
    { name: '智能体管理', icon: Users, modal: 'agentManagement' },
    { name: '场景构建', icon: FileText, modal: 'scenarioBuilder' },
    { name: '实验流程', icon: GitBranch, modal: 'experimentFlow' },
    { name: '范式库', icon: BookOpen, modal: 'templateLibrary' },
    { name: '数据分析', icon: BarChart2, modal: 'dataVisualization' },
    { name: '实验记录', icon: History, modal: 'experimentRecord' },
    { name: '设置', icon: Settings, modal: 'systemSettings' },
  ];

  const bottomMenuItems = [
    { name: '帮助', icon: HelpCircle, modal: 'help' },
    { name: '联系我们', icon: Mail, modal: 'contactUs' },
  ];

  const renderModal = () => {
    switch (activeModal) {
      case 'experimentPlanner':
        return <ExperimentPlanner />;
      case 'agentManagement':
        return <AgentManagement />;
      case 'scenarioBuilder':
        return <ScenarioBuilder />;
      case 'experimentFlow':
        return <ExperimentFlow />;
      case 'templateLibrary':
        return <TemplateLibrary />;
      case 'dataVisualization':
        return <DataVisualization />;
      case 'experimentRecord':
        return <ExperimentRecord />;
      case 'systemSettings':
        return <SystemSettings />;
      case 'help':
        return <Help />;
      case 'contactUs':
        return <ContactUs />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <aside
        className={`bg-gray-900 text-white ${
          isOpen ? 'w-64' : 'w-0'
        } flex flex-col transition-all duration-300`}
      >
        {isOpen && (
          <>
            <div className="p-4">
              <Link
                to="/"
                className="flex items-center text-2xl font-bold mb-6"
              >
                <Brain className="h-8 w-8 mr-2" />
                群智-SiLab
              </Link>
            </div>
            <nav className="flex-grow overflow-y-auto">
              <ul className="space-y-2 px-4">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <button
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 w-full text-left"
                      onClick={() => setActiveModal(item.modal)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="p-4">
              <ul className="space-y-2">
                {bottomMenuItems.map((item) => (
                  <li key={item.name}>
                    <button
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 w-full text-left"
                      onClick={() => setActiveModal(item.modal)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </aside>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-1/2 ${
          isOpen ? 'left-64' : 'left-0'
        } transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-md hover:bg-gray-700 transition-all duration-300 z-20`}
      >
        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      <main className="flex-grow overflow-hidden">
        {activeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-3/4 h-3/4 overflow-auto">
              {renderModal()}
              <button
                onClick={closeModal}
                className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                关闭
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Sidebar;
