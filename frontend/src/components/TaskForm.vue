<template>
  <form @submit.prevent="submitTask" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <input type="text" v-model="task.title" id="title" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500">
    </div>
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea v-model="task.description" id="description" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
    </div>
    <div class="flex justify-end">
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">
        {{ taskToEdit ? 'Update Task' : 'Add Task' }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    taskToEdit: Object,
  },
  data() {
    return {
      task: this.taskToEdit ? { ...this.taskToEdit } : { title: '', description: '' },
    };
  },
  methods: {
    submitTask() {
      this.$emit('task-submitted', this.task);
      this.task = { title: '', description: '' };
    },
  },
};
</script>
