<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Task List</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id" class="mb-2">
        <div class="flex justify-between">
          <span>{{ task.title }}</span>
          <div>
            <button @click="editTask(task)" class="text-blue-500">Edit</button>
            <button @click="deleteTask(task.id)" class="text-red-500">Delete</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['tasks'])
  },
  methods: {
    ...mapActions(['deleteTask']),
    editTask(task) {
      this.$emit('edit-task', task)
    }
  }
}
</script>
