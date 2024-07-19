import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const fetchTasks = () => API.get('/tasks');
export const addTask = (task) => API.post('/tasks', task);
export const updateTask = (taskId, task) => API.put(`/tasks/${taskId}`, task);
export const deleteTask = (taskId) => API.delete(`/tasks/${taskId}`);
