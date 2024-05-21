<script setup>
import { useToDoStore } from '@/stores/ToDoStore'
import { ref } from 'vue'
let editMode = ref(false)

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

function editItem() {
  editMode.value = true
}

function submitEdit(item) {
  editMode.value = false
  emit('editItem', item)
}
</script>

<template>
  <li v-if="!editMode" :class="{ completed: item.completed }">
    <input type="checkbox" @click="toggleComplete(item)" />{{ item.name }}
    <button @click="editItem()" id="edit">Edit</button>
    <button @click="deleteItem(item)" id="delete">Delete</button>
  </li>
  <div v-if="editMode">
    <input v-model="inputName" @keyup.enter="submitEdit(item)" />
    <button @click="submitEdit(item)">Submit</button>
  </div>
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
