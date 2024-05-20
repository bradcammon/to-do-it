<script setup>
import ToDoListItem from './ToDoListItem.vue'
import { useToDoStore } from '@/stores/ToDoStore'

// import { ref } from 'vue'
// let childMsg = ref('No child msg yet')

let toDo = useToDoStore()

//TODO: need to know what item this is...
function handleItemEdit(item) {
  console.log('edited item:', item)
}
</script>

<template>
  <ul>
    <ToDoListItem
      v-for="item in toDo.items"
      @handleEdit="handleItemEdit"
      :key="item.id"
      :name="item.name"
      :id="item.id"
      :item="item"
    />
  </ul>
</template>
