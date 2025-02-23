import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './Auth';

const baseUrl = '/api/tasks';

interface Task {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchTasks = async () => {
      try {
        const response = await axios.get(baseUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [token]);

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(baseUrl, newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async (id: number, updatedData: Partial<Task>) => {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  if (!token) {
    return <div>Please log in to view tasks.</div>;
  }

  return (
    <div>
      <h2>Tasks</h2>
      <button onClick={() => logout()}>Logout</button>
      <div>
        <h3>Create Task</h3>
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task title"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Task description"
        />
        <button onClick={handleCreateTask}>Create</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <button onClick={() => handleUpdateTask(task.id, { isComplete: !task.isComplete })}>
              {task.isComplete ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
