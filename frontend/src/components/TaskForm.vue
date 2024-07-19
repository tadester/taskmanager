<template>
  <div class="task-form">
    <h2 class="text-2xl font-bold mb-4">Task Manager</h2>
    <form @submit.prevent="submitTask">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Title</label>
        <input
          v-model="task.title"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Task Title"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>
        <textarea
          v-model="task.description"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Task Description"
        ></textarea>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Add Task
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    taskToEdit: Object,
  },
  data() {
    return {
      task: {
        title: '',
        description: '',
      },
    };
  },
  methods: {
    async submitTask() {
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      try {
        if (this.taskToEdit) {
          await fetch(`${baseUrl}/api/tasks/${this.taskToEdit.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.task),
          });
        } else {
          await fetch(`${baseUrl}/api/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.task),
          });
        }
        this.$emit('task-submitted');
        this.task.title = '';
        this.task.description = '';
      } catch (error) {
        console.error(error);
      }
    },
    editTask(task) {
      this.task = { ...task };
    },
  },
  watch: {
    taskToEdit: {
      immediate: true,
      handler(task) {
        if (task) {
          this.editTask(task);
        } else {
          this.task = {
            title: '',
            description: '',
          };
        }
      },
    },
  },
};
</script>

<style scoped>
.task-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
