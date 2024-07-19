<template>
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold mb-6 text-center">Task Manager</h1>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-2xl font-semibold mb-4">Add a New Task</h2>
      <form @submit.prevent="addTask" class="mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Title</label>
          <input v-model="newTask.title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Task Title" required>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>
          <textarea v-model="newTask.description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Task Description"></textarea>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 class="text-2xl font-semibold mb-4">Tasks</h2>
      <transition-group name="fade" tag="ul">
        <li v-for="task in tasks" :key="task.id" class="mb-4">
          <div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow">
            <div>
              <h3 class="text-xl font-bold">{{ task.title }}</h3>
              <p class="text-gray-700">{{ task.description }}</p>
            </div>
            <div>
              <button @click="editTask(task)" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</button>
              <button @click="deleteTask(task.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">Delete</button>
            </div>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: {
        title: '',
        description: ''
      },
      tasks: [],
      taskToEdit: null
    };
  },
  methods: {
    async fetchTasks() {
      const response = await fetch('/api/tasks');
      this.tasks = await response.json();
    },
    async addTask() {
      if (this.taskToEdit) {
        await fetch(`/api/tasks/${this.taskToEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newTask)
        });
        this.taskToEdit = null;
      } else {
        await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newTask)
        });
      }
      this.newTask.title = '';
      this.newTask.description = '';
      this.fetchTasks();
    },
    async deleteTask(id) {
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
      });
      this.fetchTasks();
    },
    editTask(task) {
      this.taskToEdit = task;
      this.newTask.title = task.title;
      this.newTask.description = task.description;
    }
  },
  mounted() {
    this.fetchTasks();
  }
};
</script>

<style scoped>
.container {
  background: url('https://source.unsplash.com/random/1600x900');
  background-size: cover;
  color: white;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
