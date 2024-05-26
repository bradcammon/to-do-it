<script setup>
import { useToDoStore } from '@/stores/ToDoStore'
import { ref } from 'vue'
import { useConvexMutation } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'

const { mutate: setCompleted } = useConvexMutation(api.todos.setCompleted)
const { mutate: removeTodo, isLoading: isRemoving } = useConvexMutation(api.todos.remove)

let editMode = ref(false)
let toDo = useToDoStore()

defineProps({
  item: Object
})

const inputName = defineModel()
const emit = defineEmits(['editItem']) // this _seems_ to be required...not sure.  Need to research

async function toggleComplete(item) {
  await setCompleted({ completed: !item.completed, id: item._id })
}

async function deleteItem(item) {
  await removeTodo({ id: item._id })
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
