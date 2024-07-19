<template>
  <div id="app">
    <TaskForm :task-to-edit="taskToEdit" @task-submitted="handleTaskSubmitted" />
    <TaskList @edit-task="handleEditTask" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';

export default {
  components: {
    TaskForm,
    TaskList,
  },
  computed: {
    ...mapGetters(['taskToEdit']),
  },
  methods: {
    ...mapActions(['fetchTasks', 'setTaskToEdit']),
    handleTaskSubmitted() {
      this.setTaskToEdit(null);
      this.fetchTasks();
    },
    handleEditTask(task) {
      this.setTaskToEdit(task);
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>
