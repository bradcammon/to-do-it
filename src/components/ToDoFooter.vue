<script setup>
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()

function deleteCompleted() {
  const completedItems = toDo.completedItemsFilter
  toDo.$patch({ items: toDo.activeItemsFilter })
  // Update the api
  toDo.deleteItems(completedItems)
}
</script>

<template>
  <footer>
    <div>
      <p v-show="false">There are {{ toDo.activeItemsFilter.length }} active items left</p>
    </div>
    <div><button @click="deleteCompleted">Clear Completed</button></div>
  </footer>
</template>
