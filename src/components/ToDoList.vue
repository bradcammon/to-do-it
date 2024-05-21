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
  <div>
    <p>This is where the tabs will go!</p>
    <div>
      <button @click="toDo.currentTag = 'all'">All</button>
      <button @click="toDo.currentTag = 'active'">Active</button>
      <button @click="toDo.currentTag = 'completed'">Completed</button>
    </div>
  </div>
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
