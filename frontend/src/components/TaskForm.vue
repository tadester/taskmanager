<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">{{ isEditing ? 'Edit Task' : 'Add Task' }}</h1>
      <form @submit.prevent="handleSubmit">
        <input v-model="task.title" placeholder="Title" class="border p-2 mb-2 w-full" />
        <textarea v-model="task.description" placeholder="Description" class="border p-2 mb-2 w-full"></textarea>
        <button type="submit" class="bg-blue-500 text-white p-2">{{ isEditing ? 'Update' : 'Add' }} Task</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    props: {
      taskToEdit: Object
    },
    data() {
      return {
        task: this.taskToEdit ? { ...this.taskToEdit } : { title: '', description: '' }
      }
    },
    computed: {
      isEditing() {
        return !!this.taskToEdit
      }
    },
    methods: {
      ...mapActions(['addTask', 'updateTask']),
      handleSubmit() {
        if (this.isEditing) {
          this.updateTask(this.task)
        } else {
          this.addTask(this.task)
        }
        this.$emit('task-submitted')
      }
    },
    watch: {
      taskToEdit(newTask) {
        this.task = newTask ? { ...newTask } : { title: '', description: '' }
      }
    }
  }
  </script>
  