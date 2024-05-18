<script setup>
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()

// import { ref } from 'vue'
defineProps({
  name: String,
  id: String,
  item: Object
})
//TODO: Move this logic to the Store?
function toggleComplete(item) {
  item.completed = !item.completed
  toDo.patchItem(item)
}
</script>

<template>
  <li :class="{ completed: item.completed }">
    <input type="checkbox" @click="toggleComplete(item)" />{{ item.name }}
  </li>
</template>

<style>
.notCompleted {
  color: red;
}

.completed {
  color: gray;
  text-decoration: line-through;
}
input[type='checkbox'] {
  accent-color: gray;
}
</style>
