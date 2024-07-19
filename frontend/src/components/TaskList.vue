<!-- src/components/TaskList.vue -->
<template>
  <div>
    <h2>Task List</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <button @click="editTask(task)">Edit</button>
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['tasks']),
  },
  methods: {
    ...mapActions(['deleteTask', 'setTaskToEdit']),
    editTask(task) {
      this.setTaskToEdit(task);
      this.$emit('edit-task', task);
    },
  },
  mounted() {
    this.$store.dispatch('fetchTasks');
  },
};
</script>
