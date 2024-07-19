<template>
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
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    async fetchTasks() {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${baseUrl}/api/tasks`);
      this.tasks = await response.json();
    },
    async deleteTask(id) {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      await fetch(`${baseUrl}/api/tasks/${id}`, {
        method: 'DELETE'
      });
      this.fetchTasks();
    },
    editTask(task) {
      this.$emit('edit-task', task);
    }
  },
  mounted() {
    this.fetchTasks();
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
