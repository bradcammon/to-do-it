<script setup>
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()

// import { ref } from 'vue'

defineProps({
  name: String,
  id: String,
  item: Object
})

const emit = defineEmits(['response'])

// emit('response', 'hello from child')

// const itemName = ref(item)

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

//TODO: need to emit an item object to parent.  Parent will filter based on ID and update the subject value.

function textEdited(e) {
  console.log(e)
  // alert('edited')
  const form = new FormData(e.target)
  const name = form.get('editedName')
  // console.log(name)
  emit('response', name)
}

// function foo(){
//   console.log('item:', toDo.item)
// }
</script>

<template>
  <li :class="{ completed: item.completed }">
    <input type="checkbox" @click="toggleComplete(item)" />{{ item.name }}
    <button @click="deleteItem(item)" id="delete">Delete</button>
    <form @submit.prevent="textEdited">
      <input type="text" :value="item.name" name="editedName" @click="$emit('handleEdit', item)" />
    </form>
  </li>
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
