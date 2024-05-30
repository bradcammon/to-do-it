<script setup>
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()
</script>

<template>
  <v-card>
    <v-tabs bg-color="#0096B3" fixed-tabs>
      <v-tab @click="toDo.currentTag = 'all'">All ({{ toDo.allItemsFilter.length }})</v-tab>

      <v-tab @click="toDo.currentTag = 'active'"
        >Active ({{ toDo.activeItemsFilter.length }})</v-tab
      >
      <v-tab @click="toDo.currentTag = 'completed'"
        >Completed ({{ toDo.completedItemsFilter.length }})</v-tab
      >
    </v-tabs>
  </v-card>
</template>
