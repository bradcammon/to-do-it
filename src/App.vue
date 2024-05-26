<script setup lang="ts">
import ToDoMainView from './views/ToDoMainView.vue'
import { useToDoStore } from '@/stores/ToDoStore'
import { onMounted } from 'vue'

let toDo = useToDoStore()

onMounted(() => {
  toDo.fillFromConvex()
})
</script>

<template>
  <v-app>
    <v-main>
      <ToDoMainView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
