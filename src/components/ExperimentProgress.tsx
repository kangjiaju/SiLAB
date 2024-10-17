import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '步骤1', 智能体1: 4000, 智能体2: 2400, 智能体3: 2400 },
  { name: '步骤2', 智能体1: 3000, 智能体2: 1398, 智能体3: 2210 },
  { name: '步骤3', 智能体1: 2000, 智能体2: 9800, 智能体3: 2290 },
  { name: '步骤4', 智能体1: 2780, 智能体2: 3908, 智能体3: 2000 },
  { name: '步骤5', 智能体1: 1890, 智能体2: 4800, 智能体3: 2181 },
];

const ExperimentProgress: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-80 bg-black bg-opacity-50 text-white absolute right-0 top-0 bottom-0 overflow-y-auto p-4"
        >
          <h3 className="text-xl font-bold mb-4">实验进度</h3>
          <div>
            <h4 className="font-semibold mb-2">智能体交互图表</h4>
            <div className="h-64 bg-white rounded-lg p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="智能体1" stroke="#8884d8" />
                  <Line type="monotone" dataKey="智能体2" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="智能体3" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Add more experiment progress information here */}
        </motion.div>
      )}
      {!isOpen && (
        <motion.button
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={() => setIsOpen(true)}
          className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-50 text-white"
        >
          <ChevronLeft size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ExperimentProgress;