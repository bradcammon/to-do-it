<script setup>
import { ref } from 'vue'
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()

let toDoItem = ref('')

function add() {
  toDo.items.push({
    name: toDoItem.value,
    completed: false,
    id: toDo.generateUUID()
  })

  toDo.sendToDoToServer(toDoItem.value)
  toDoItem.value = ''
}
</script>

<template>
  The Item: {{ toDoItem }}
  <form @submit.prevent="add">
    <div>
      <input type="text" v-model="toDoItem" />
      <button type="submit">Add</button>
    </div>
  </form>
</template>
