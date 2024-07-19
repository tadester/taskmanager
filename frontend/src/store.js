import { createStore } from 'vuex';
import { fetchTasks, addTask, updateTask, deleteTask } from './api';

const store = createStore({
  state() {
    return {
      tasks: [],
      taskToEdit: null,
    };
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    EDIT_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    SET_TASK_TO_EDIT(state, task) {
      state.taskToEdit = task;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      const { data } = await fetchTasks();
      commit('SET_TASKS', data);
    },
    async addTask({ commit }, task) {
      const { data } = await addTask(task);
      commit('ADD_TASK', data);
    },
    async editTask({ commit }, { taskId, task }) {
      const { data } = await updateTask(taskId, task);
      commit('EDIT_TASK', data);
    },
    async deleteTask({ commit }, taskId) {
      await deleteTask(taskId);
      commit('DELETE_TASK', taskId);
    },
    setTaskToEdit({ commit }, task) {
      commit('SET_TASK_TO_EDIT', task);
    },
  },
  getters: {
    tasks: state => state.tasks,
    taskToEdit: state => state.taskToEdit,
  },
});

export default store;
