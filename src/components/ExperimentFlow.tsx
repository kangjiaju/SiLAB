import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Task {
  id: string;
  content: string;
  description: string;
  agents: string[];
  dependencies: string[];
}

const initialTasks: Task[] = [
  { id: 'task1', content: '任务1', description: '这是任务1的描述', agents: ['Agent1'], dependencies: [] },
  { id: 'task2', content: '任务2', description: '这是任务2的描述', agents: ['Agent2'], dependencies: ['task1'] },
  { id: 'task3', content: '任务3', description: '这是任务3的描述', agents: ['Agent1', 'Agent2'], dependencies: ['task2'] },
];

const SortableItem = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 mb-2 rounded shadow"
    >
      <h3 className="font-bold">{task.content}</h3>
      <p>{task.description}</p>
      <p>参与智能体: {task.agents.join(', ')}</p>
      <p>依赖任务: {task.dependencies.join(', ')}</p>
    </li>
  );
};

const ExperimentFlow: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState<Task>({ id: '', content: '', description: '', agents: [], dependencies: [] });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddTask = () => {
    if (newTask.content) {
      setTasks([...tasks, { ...newTask, id: Date.now().toString() }]);
      setNewTask({ id: '', content: '', description: '', agents: [], dependencies: [] });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">实验流程</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="任务名称"
          value={newTask.content}
          onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="任务描述"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="参与智能体 (用逗号分隔)"
          value={newTask.agents.join(',')}
          onChange={(e) => setNewTask({ ...newTask, agents: e.target.value.split(',') })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="依赖任务 (用逗号分隔)"
          value={newTask.dependencies.join(',')}
          onChange={(e) => setNewTask({ ...newTask, dependencies: e.target.value.split(',') })}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          添加任务
        </button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <ul>
            {tasks.map((task) => (
              <SortableItem key={task.id} task={task} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ExperimentFlow;