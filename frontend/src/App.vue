<template>
  <div class="p-4">
    <TaskForm :task-to-edit="taskToEdit" @task-submitted="handleTaskSubmitted" />
    <TaskList @edit-task="handleEditTask" />
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import { mapActions } from 'vuex';

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
    ...mapActions(['fetchTasks']),
    handleTaskSubmitted() {
      this.taskToEdit = null;
      this.fetchTasks();
    },
    handleEditTask(task) {
      this.taskToEdit = task;
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>
