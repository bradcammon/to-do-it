<script setup>
import { ref } from 'vue'
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()

let toDoItem = ref('')

function add() {
  toDo.addNewToDo(toDoItem.value)
  toDoItem.value = ''
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
