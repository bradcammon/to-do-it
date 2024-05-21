<script setup lang="ts">
import ToDoHeader from '@/components/ToDoHeader.vue'
import ToDoCreate from '@/components/ToDoCreate.vue'
import ToDoTabs from '@/components/ToDoTabs.vue'
import ToDoList from '@/components/ToDoList.vue'
import ToDoFooter from '@/components/ToDoFooter.vue'
import { useToDoStore } from '@/stores/ToDoStore'
let toDo = useToDoStore()
toDo.fill()
// toDo.init()
</script>

<template>
  <ToDoHeader />
  <ToDoCreate />
  <!-- <ToDoTabs /> -->
  <ToDoList />
  <ToDoFooter />
</template>

<!-- <style>
header {
  border: 1px solid black;
  margin: 1px;
  padding: 1rem;
  text-align: center;
}

.todo-form {
  border: 1px solid black;
  text-align: center;
  padding: 1rem;
  margin: 1px;
  label {
    flex: 1;
  }
  input {
    border: 1px solid black;
  }
  > button {
    border: 1px solid black;
  }
}

.todo-list {
  border: 1px solid black;
  padding: 1rem;
  li {
    border: 1px solid black;
    margin: 1px;
    padding: 0.5rem;
  }
}

.screen-reader-text {
  text-indent: -9999em;
  width: 0;
  height: 0;
  display: block;
}
</style> -->
