import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: []
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    addTask(state, task) {
      state.tasks.push(task)
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask)
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId)
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      const response = await fetch('http://localhost:8000/api/tasks')
      const data = await response.json()
      commit('setTasks', data)
    },
    async addTask({ commit }, task) {
      const response = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      const data = await response.json()
      commit('addTask', data)
    },
    async updateTask({ commit }, task) {
      const response = await fetch(`http://localhost:8000/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      const data = await response.json()
      commit('updateTask', data)
    },
    async deleteTask({ commit }, taskId) {
      await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: 'DELETE'
      })
      commit('deleteTask', taskId)
    }
  }
})
