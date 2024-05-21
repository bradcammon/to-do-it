<script setup>
import ToDoListItem from './ToDoListItem.vue'
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()

function handleItemEdit(item) {
  const data = { name: item.name }
  toDo.patchItem(item, data)
}
</script>

<template>
  <ul>
    <ToDoListItem
      v-for="item in toDo.filteredItems"
      @editItem="handleItemEdit"
      :key="item.id"
      :item="item"
      v-model="item.name"
    />
  </ul>
</template>
