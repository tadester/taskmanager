<!-- src/components/TaskForm.vue -->
<template>
  <div>
    <h2>{{ taskToEdit ? 'Edit Task' : 'Add Task' }}</h2>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="task.title" placeholder="Task Title" required />
      <textarea v-model="task.description" placeholder="Task Description"></textarea>
      <button type="submit">{{ taskToEdit ? 'Update Task' : 'Add Task' }}</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['taskToEdit'],
  data() {
    return {
      task: {
        title: '',
        description: '',
      },
    };
  },
  watch: {
    taskToEdit: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.task = { ...newVal };
        } else {
          this.task = { title: '', description: '' };
        }
      },
    },
  },
  methods: {
    ...mapActions(['addTask', 'editTask']),
    submitForm() {
      if (this.taskToEdit) {
        this.editTask(this.task);
      } else {
        this.addTask(this.task);
      }
      this.$emit('task-submitted');
    },
  },
};
</script>
