<script setup lang="ts">
import ToDoMainView from './views/ToDoMainView.vue'
import { useToDoStore } from '@/stores/ToDoStore'
import { onMounted } from 'vue'

let toDo = useToDoStore()
// toDo.fill()

onMounted(() => {
  toDo.fillFromConvex()
})
</script>

<template>
  <ToDoMainView />
</template>

<style scoped></style>
