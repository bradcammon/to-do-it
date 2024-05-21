<script setup>
import ToDoHeader from '@/components/ToDoHeader.vue'
import ToDoCreate from '@/components/ToDoCreate.vue'
import ToDoTabs from '@/components/ToDoTabs.vue'
import ToDoList from '@/components/ToDoList.vue'
import ToDoFooter from '@/components/ToDoFooter.vue'
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()
toDo.fill()
</script>

<template>
  <ToDoHeader />
  <ToDoCreate />
  <ToDoTabs />
  <ToDoList />
  <ToDoFooter />
</template>
