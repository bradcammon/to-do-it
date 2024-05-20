<script setup>
import ToDoListItem from './ToDoListItem.vue'
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()

function handleItemEdit(item) {
  console.log('edited item:', item)
  toDo.updateItemName(item)
}
</script>

<template>
  <ul>
    <ToDoListItem
      v-for="item in toDo.items"
      @editItem="handleItemEdit"
      :key="item.id"
      :item="item"
      v-model="item.name"
    />
  </ul>
</template>
