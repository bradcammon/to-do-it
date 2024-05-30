<script setup>
import { useToDoStore } from '@/stores/ToDoStore'
import { useConvexMutation } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'

const { mutate: deleteManyTodos, isLoading: isRemoving } = useConvexMutation(api.todos.deleteMany)

let toDo = useToDoStore()

function deleteCompleted() {
  const completedItems = toDo.completedItemsFilter
  let itemsToDelete = []

  for (const [key, innerObject] of Object.entries(completedItems)) {
    for (const [innerKey, value] of Object.entries(innerObject)) {
      if (innerKey == '_id') {
        itemsToDelete.push(value)
      }
    }
  }

  deleteManyTodos({ ids: itemsToDelete })
}
</script>

<template>
  <footer>
    <v-card class="mx-auto">
      <v-card-text class="d-flex justify-space-between">
        <v-chip
          prepend-icon="mdi-delete-alert"
          @click="deleteCompleted"
          color="#F89236"
          :disabled="toDo.completedItemsFilter.length == 0"
        >
          Clear Completed
        </v-chip>
      </v-card-text>
    </v-card>
  </footer>
</template>
