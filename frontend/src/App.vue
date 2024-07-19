<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-10">
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-4 text-center">Task Manager</h1>
      <TaskForm :task-to-edit="taskToEdit" @task-submitted="handleTaskSubmitted" />
      <TaskList @edit-task="handleEditTask" />
    </div>
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';

export default {
  components: {
    TaskForm,
    TaskList,
  },
  data() {
    return {
      taskToEdit: null,
    };
  },
  methods: {
    handleTaskSubmitted(task) {
      this.taskToEdit = null;
      // Add your logic to update the task list
    },
    handleEditTask(task) {
      this.taskToEdit = task;
    },
  },
};
</script>

<style>
/* Add any additional styles here */
</style>
