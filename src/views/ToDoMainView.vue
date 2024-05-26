<script setup>
import ToDoHeader from '@/components/ToDoHeader.vue'
import ToDoCreate from '@/components/ToDoCreate.vue'
import ToDoTabs from '@/components/ToDoTabs.vue'
import ToDoList from '@/components/ToDoList.vue'
import ToDoFooter from '@/components/ToDoFooter.vue'
</script>

<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <ToDoHeader />
        <ToDoCreate />
        <ToDoTabs />
        <ToDoList />
        <ToDoFooter />
      </v-col>
    </v-row>
  </v-container>
</template>
