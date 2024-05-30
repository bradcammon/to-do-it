<script setup>
import { ref } from 'vue'
import { useToDoStore } from '@/stores/ToDoStore'
import { useConvexMutation } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'

let toDo = useToDoStore()

let toDoItem = ref('')

const { mutate: addTodo } = useConvexMutation(api.todos.add, {
  onSuccess() {
    toDoItem.value = ''
  }
})

function add() {
  addTodo({ name: toDoItem.value })
}
</script>

<template>
  <form @submit.prevent="add">
    <div>
      <v-text-field label="Enter ToDo Item" v-model="toDoItem" variant="solo"></v-text-field>
      <!-- <v-btn type="submit" variant="outlined"> Add </v-btn> -->
    </div>
  </form>
</template>
