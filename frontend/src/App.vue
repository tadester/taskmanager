<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-10">
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-4 text-center">Task Manager</h1>
      <TaskForm :task-to-edit="taskToEdit" @task-submitted="fetchTasks" ref="taskForm" />
      <TaskList @edit-task="handleEditTask" ref="taskList" />
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
    fetchTasks() {
      this.$refs.taskList.fetchTasks();
    },
    handleEditTask(task) {
      this.taskToEdit = task;
      this.$refs.taskForm.editTask(task);
    },
  },
};
</script>

<style>
.min-h-screen {
  min-height: 100vh;
}
.bg-gradient-to-r {
  background: linear-gradient(to right, #4299e1, #805ad5);
}
</style>
