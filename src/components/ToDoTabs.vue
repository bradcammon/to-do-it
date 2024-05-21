<script setup>
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()
</script>

<template>
  <div id="tabs">
    <button @click="toDo.currentTag = 'all'">All ({{ toDo.allItemsFilter.length }})</button>

    <button @click="toDo.currentTag = 'active'">
      Active ({{ toDo.activeItemsFilter.length }})
    </button>

    <button @click="toDo.currentTag = 'completed'">
      Completed ({{ toDo.completedItemsFilter.length }})
    </button>
  </div>
</template>
