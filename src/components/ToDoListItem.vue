<script setup>
// import { useToDoStore } from '@/stores/ToDoStore'

// let toDo = useToDoStore()

// import { ref } from 'vue'
defineProps({
  name: String,
  id: String,
  item: Object
})
//TODO: Move this logic to the Store?
function toggleComplete(item) {
  item.completed = !item.completed
  // alert(item.name + item.id + 'Complete: ' + item.completed)
}
</script>

<template>
  <li v-if="!item.completed">
    {{ item.name }}<button @click="toggleComplete(item)">Mark Complete</button>
  </li>
</template>

<style>
.notCompleted {
  color: red;
}

.completed {
  color: green;
}
</style>
