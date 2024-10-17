import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

const data = [
  { name: 'A', value: 400 },
  { name: 'B', value: 300 },
  { name: 'C', value: 300 },
  { name: 'D', value: 200 },
];

const lineData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const scatterData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const DataVisualization: React.FC = () => {
  const [activeChart, setActiveChart] = useState<string>('bar');

  const renderChart = () => {
    switch (activeChart) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie dataKey="value" data={data} fill="#8884d8" label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="stature" unit="cm" />
              <YAxis type="number" dataKey="y" name="weight" unit="kg" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="A school" data={scatterData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const handleDownload = () => {
    // 这里添加下载图表的逻辑
    console.log('Downloading chart...');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">数据可视化</h2>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeChart === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveChart('bar')}
        >
          柱状图
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${activeChart === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveChart('line')}
        >
          折线图
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${activeChart === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveChart('pie')}
        >
          饼图
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${activeChart === 'scatter' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveChart('scatter')}
        >
          散点图
        </button>
      </div>
      <div className="border p-4 rounded">
        {renderChart()}
      </div>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded flex items-center"
        onClick={handleDownload}
      >
        <Download className="mr-2" size={16} />
        下载图表
      </button>
    </div>
  );
};

export default DataVisualization;