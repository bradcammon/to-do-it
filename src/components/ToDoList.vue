<script setup>
import ToDoListItem from './ToDoListItem.vue'
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()
</script>

<template>
  <ul>
    <ToDoListItem
      v-for="item in toDo.items"
      :key="item.id"
      :name="item.name"
      :id="item.id"
      :item="item"
    />
  </ul>
</template>
