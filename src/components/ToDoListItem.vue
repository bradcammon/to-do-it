<script setup>
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()

defineProps({
  item: Object
})

const inputName = defineModel()

const emit = defineEmits(['editItem']) // this _seems_ to be required...not sure.  Need to research

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
  <input v-model="inputName" @keyup.enter="$emit('editItem', item)" />
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
