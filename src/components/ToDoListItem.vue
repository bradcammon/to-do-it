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

function deleteItem(item) {
  const filteredItemsArray = toDo.items.filter((x) => x.id !== item.id)
  toDo.$patch({ items: filteredItemsArray })
  // Update the api
  toDo.deleteItem(item)
}
</script>

<template>
  <li :class="{ completed: item.completed }">
    <input type="checkbox" @click="toggleComplete(item)" />{{ item.name }}
    <button @click="deleteItem(item)" id="delete">Delete</button>
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
