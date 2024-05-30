<script setup>
import { ref } from 'vue'
import { useConvexMutation } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'

let toDoItem = ref('')

const { mutate: addTodo } = useConvexMutation(api.todos.add, {
  onSuccess() {
    toDoItem.value = ''
  }
})

function add() {
  if (toDoItem.value.length > 0) {
    addTodo({ name: toDoItem.value })
  }
}
</script>

<template>
  <form @submit.prevent="add">
    <div>
      <v-text-field label="Enter ToDo Item" v-model="toDoItem" variant="solo"></v-text-field>
    </div>
  </form>
</template>
