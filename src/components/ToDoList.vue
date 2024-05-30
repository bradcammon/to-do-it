<script setup>
import ToDoListItem from './ToDoListItem.vue'
import { useToDoStore } from '@/stores/ToDoStore'
import { useConvexMutation } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'

const { mutate: editItemText } = useConvexMutation(api.todos.editText)

let toDo = useToDoStore()

function handleItemEdit(item) {
  editItemText({ id: item._id, name: item.name })
}
</script>

<template>
  <v-list>
    <ul v-if="!toDo.isLoading">
      <ToDoListItem
        v-for="item in toDo.filteredItems"
        @editItem="handleItemEdit"
        :key="item._id"
        :item="item"
        v-model="item.name"
      />
    </ul>
    <p v-else>Loading...</p>
  </v-list>
</template>
