// src/store.js
import { createStore } from 'vuex';

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
    fetchTasks({ commit }) {
      const tasks = [
        { id: 1, title: 'Task 1', description: 'Description 1' },
        { id: 2, title: 'Task 2', description: 'Description 2' },
      ];
      commit('SET_TASKS', tasks);
    },
    addTask({ commit }, task) {
      commit('ADD_TASK', { ...task, id: Date.now() });
    },
    editTask({ commit }, updatedTask) {
      commit('EDIT_TASK', updatedTask);
    },
    deleteTask({ commit }, taskId) {
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
