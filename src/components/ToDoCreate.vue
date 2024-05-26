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

async function add() {
  await addTodo({ name: toDoItem.value })
}
</script>

<template>
  <form @submit.prevent="add">
    <div>
      <input type="text" v-model="toDoItem" />
      <button type="submit">Add</button>
    </div>
  </form>
</template>
